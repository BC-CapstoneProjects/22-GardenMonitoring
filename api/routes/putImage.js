import express from 'express';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../public/libs/s3Client.js";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';

const router = express.Router();

/*
    This route uploads a single image per request to the specified bucket
    Requires that the userId has ownership of the bucketName 
*/

// helper function to verify userId has ownership of s3 bucket
const verifyBucketOwnership = async (userId, bucketName) => {
  const params = {
    TableName: 'Bucket',
    Key: {
      'userId': { S: userId }
    }
  };

  try {
    const data = await dynamoDbClient.send(new GetItemCommand(params));
    
    if (!data.Item) {
      console.error(`User with id ${userId} not found.`);
      throw new Error(`User with id ${userId} not found.`);
    }

    if (!data.Item.buckets.SS.includes(bucketName)) {
      console.error(`User ${userId} does not own the bucket ${bucketName}.`);
      throw new Error(`User ${userId} does not own the bucket ${bucketName}.`);
    }
    
    console.log(`Verified bucket ${bucketName} ownership for user ${userId}.`);
  }
  catch (error) {
    console.error('Error verifying bucket ownership: ', error);
    throw error;
  }
};

// Route handler for getting a presigned URL to upload an image to the specified bucket
async function getPresignedUrl(bucketName, key) {
  const command = new PutObjectCommand({ Bucket: bucketName, Key: key });

  // Create and return the pre-signed URL
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
}

// Route handler for getting all images from the specified bucket
router.put("/:userId/:bucketName/:objectKey", async (req, res) => {
  const { userId, bucketName, objectKey } = req.params;

  try {
    await verifyBucketOwnership(userId, bucketName);


    // Create pre-signed URLs for each object key in the bucket
    const presignedUrls = await getPresignedUrl(bucketName, objectKey);

    res.json({ presignedUrls });
  }
  catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router as putImage };
