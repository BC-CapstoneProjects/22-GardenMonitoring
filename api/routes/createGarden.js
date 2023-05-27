import express from 'express';
import { s3Client } from "../public/libs/s3Client.js";
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';
import { PutItemCommand, UpdateItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { CreateBucketCommand } from '@aws-sdk/client-s3';

const router = express.Router();

router.post("/:userId/:bucketName", async (req, res) => {
  let bucketName = req.params.bucketName;
  const userId = req.params.userId

  try {
    const getParams = {
        TableName: 'Bucket',
        Key: {
            'userId': { S: userId }
        }
    };

    const userData = await dynamoDbClient.send(new GetItemCommand(getParams));

    // this should be a redundant check, but lets leave it in for now... 
    if (!userData.Item) {
        // user does not exist, add to Bucket table
        // create new item and bucket... userId: userId_BC_Garden
        bucketName = `${userId}-bc-garden`;

        const putParams = {
            TableName: 'Bucket',
            Item: {
                'userId': { S: userId },
                'buckets': { SS: [bucketName] } 
            }
        };

        await dynamoDbClient.send(new PutItemCommand(putParams));
    }
    else {
        // user already exists, update existing item in Bucket table
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

    // create a new bucket
    await s3Client.send(
        new CreateBucketCommand({
            Bucket: bucketName,
            ACL: 'private'
        })
    );

    res.status(200).send(`Bucket "${bucketName}" created successfully.`);
  } 
  catch (error) {
    console.error('Error creating bucket:', error);
    res.status(500).json({error: error.message});
  }
});

export { router as createGarden };