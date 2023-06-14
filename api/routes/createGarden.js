import express from 'express';
import { s3Client } from "../public/libs/s3Client.js";
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';
import { PutItemCommand, UpdateItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { CreateBucketCommand } from '@aws-sdk/client-s3';
import { PutBucketNotificationConfigurationCommand, PutBucketCorsCommand } from '@aws-sdk/client-s3';
import { LambdaClient, AddPermissionCommand } from '@aws-sdk/client-lambda'

const router = express.Router();

router.post("/:userId/:bucketName", async (req, res) => {
  let bucketName = req.params.bucketName;
  const userId = req.params.userId;

  // Function to add or update the DynamoDB table
  async function updateDynamoDb() {
    const getParams = {
      TableName: 'Bucket',
      Key: {
        'userId': { S: userId }
      }
    };

    const userData = await dynamoDbClient.send(new GetItemCommand(getParams));

    if (!userData.Item) {
      bucketName = `${userId}-bc-garden`;

      const putParams = {
        TableName: 'Bucket',
        Item: {
          'userId': { S: userId },
          'buckets': { SS: [bucketName] }
        }
      };

      await dynamoDbClient.send(new PutItemCommand(putParams));
    } else {
      const updateParams = {
        TableName: 'Bucket',
        Key: {
          'userId': { S: userId }
        },
        UpdateExpression: 'ADD buckets :b',
        ExpressionAttributeValues: {
          ':b': { SS: [bucketName] }
        },
        ReturnValues: "ALL_NEW"
      };

      await dynamoDbClient.send(new UpdateItemCommand(updateParams));
    }
  }

  try {
    // Try to create the bucket first
    await s3Client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
        ACL: 'private'
      })
    );

    // if dynamodb of the same name doesnt exist, create the table
    // attach tedo's lambda

    // If bucket creation is successful, update DynamoDB
    await updateDynamoDb();

    // Add permission for the new bucket to invoke Lambda
    const lambdaClient = new LambdaClient({ region: "us-west-2" });
    const lambdaFunctionArn = "arn:aws:lambda:us-west-2:286336465435:function:s3trigger_startstopec2";
    const addPermissionParams = {
      FunctionName: lambdaFunctionArn,
      StatementId: `${bucketName}-s3invoke`,
      Action: 'lambda:InvokeFunction',
      Principal: 's3.amazonaws.com',
      SourceArn: `arn:aws:s3:::${bucketName}`
    };
    await lambdaClient.send(new AddPermissionCommand(addPermissionParams));

    // Configure bucket to use the s3trigger_startstopec2 lambda function on s3:ObjectCreated events
    const notificationParams = {
      Bucket: bucketName,
      NotificationConfiguration: {
          LambdaFunctionConfigurations: [
              {
                  LambdaFunctionArn: lambdaFunctionArn,
                  Events: ["s3:ObjectCreated:*"],
                  Filter: { 
                      Key: {
                          FilterRules: [{ 
                              Name: "suffix", 
                              Value: ".txt" 
                          }]
                      }
                  }
              },
          ],
      },
    };
    
    try {
        // Add the notification params to the new s3 bucket
        await s3Client.send(new PutBucketNotificationConfigurationCommand(notificationParams));
        console.log(`Notification configuration set for new bucket: ${bucketName}`);
    }
    catch (error) {
        console.log(`Error setting notification configuration for new bucket: ${bucketName}: Error: ${error}`);
        throw error;
    }

    // add the appropriate CORS configuration to each new bucket
    // allows web-app clients to upload new images
    const corsParams = {
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ["*"],
            AllowedMethods: ["PUT"],
            AllowedOrigins: ["http://localhost:3000"],
            MaxAgeSeconds: 3000,
          },
        ],
      },
    };

    try {
      // Add the notification params to the new s3 bucket
      await s3Client.send(new PutBucketCorsCommand(corsParams));
      console.log(`CORS configuration set for new bucket: ${bucketName}`);
    }
    catch (error) {
      console.log(`Error setting CORS configuration for new bucket: ${bucketName}: Error: ${error}`);
      throw error;
    }

    res.status(200).send(`Bucket "${bucketName}" created successfully.`);
  } catch (error) {
    console.error('Error creating bucket:', error);
    res.status(500).json({error: error.message});
  }
});

export { router as createGarden };
