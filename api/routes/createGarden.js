import express from 'express';
import { s3Client } from "../public/libs/s3Client.js";
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';
import { PutItemCommand, UpdateItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { CreateBucketCommand } from '@aws-sdk/client-s3';

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

    // If bucket creation is successful, update DynamoDB
    await updateDynamoDb();

    res.status(200).send(`Bucket "${bucketName}" created successfully.`);
  } catch (error) {
    console.error('Error creating bucket:', error);
    res.status(500).json({error: error.message});
  }
});

export { router as createGarden };
