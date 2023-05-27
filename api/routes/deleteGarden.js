import express from 'express';
import { s3Client } from "../public/libs/s3Client.js";
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';
import { GetItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { DeleteBucketCommand } from '@aws-sdk/client-s3';

const router = express.Router();

router.delete("/:userId/:bucketName", async (req, res) => {
  const bucketName = req.params.bucketName;
  const userId = req.params.userId;

  try {
    const getParams = {
        TableName: 'Bucket',
        Key: {
            'userId': { S: userId }
        }
    };

    const userData = await dynamoDbClient.send(new GetItemCommand(getParams));

    if (userData.Item) {
        // user exists, update existing item in Bucket table
        const updateParams = {
            TableName: 'Bucket',
            Key: {
                'userId': { S: userId }
            },
            UpdateExpression: 'DELETE buckets :b',
            ExpressionAttributeValues: {
                ':b': { SS: [bucketName] }
            },
            ReturnValues: "ALL_NEW"
        };

        const updatedUserData = await dynamoDbClient.send(new UpdateItemCommand)

        // check if user has no more buckets, delete userId item from Bucket table
        if (!updatedUserData.Attributes.buckets.length) {
            await dynamoDbClient.send(new DeleteItemCommand({
                TableName: 'Bucket',
                Key: {
                    'userId': { S: userId }
                }
            }));
        }
        
        // delete the bucket
        await s3Client.send(
        new DeleteBucketCommand({
          Bucket: bucketName
        })
      );

      res.status(200).send(`Bucket "${bucketName}" deleted successfully.`);
    }
    else {
        // user does not exist, cannot delete bucket
        res.status(400).send(`No buckets found for user ${userId}`);
    }
  } 
  catch (error) {
    console.error('Error deleting bucket:', error);
    res.status(500).send(error);
  }
});

export { router as deleteGarden };
