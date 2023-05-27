import express from 'express';
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';
import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { CreateBucketCommand } from '@aws-sdk/client-s3';
import { s3Client } from "../public/libs/s3Client.js";

const router = express.Router();

router.get("/:userId", async (req,res,next) => { 
  const userId = req.params.userId;

  try {
    const getParams = {
        TableName: 'Bucket',
        Key: {
            'userId': { S: userId }
        }
    };

    const userData = await dynamoDbClient.send(new GetItemCommand(getParams));

    if (!userData.Item) {
        // user does not exist, add to Bucket table
        // create new item and bucket... userId: userId_BC_Garden
        const bucketName = `${userId}-bc-garden`;

        const putParams = {
            TableName: 'Bucket',
            Item: {
                'userId': { S: userId },
                'buckets': { SS: [bucketName] } 
            }
        };

        await dynamoDbClient.send(new PutItemCommand(putParams));

        // create a new bucket
        await s3Client.send(
          new CreateBucketCommand({
              Bucket: bucketName,
              ACL: 'private'
          })
        );
        res.status(200).send(`Bucket "${bucketName}" created successfully.`);
    } 
    else {
        // user exists, return bucket names
        res.send(userData.Item.buckets.SS);
    }
  } 
  catch (error) {
    console.error('Error getting bucket names:', error);
    res.status(500).json({error: error.message});
  }
});

export { router as getGardenNames };
