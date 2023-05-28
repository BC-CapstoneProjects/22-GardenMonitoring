import express from 'express';
import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../public/libs/s3Client.js";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';

const router = express.Router();

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

// Function to create a pre-signed URL for the provided bucket and key
async function getPresignedUrl(bucketName, key) {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });

  // Create and return the pre-signed URL
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
}

// Function to list all objects in the specified bucket
async function listAllObjects(bucketName) {
  try {
    const data = await s3Client.send(new ListObjectsCommand({ Bucket: bucketName }));

    // Map the object keys from the response data
    return data.Contents.map((object) => object.Key);
  } catch (err) {
    console.log("Error", err);
    return [];
  }
}

// Route handler for getting all images from the specified bucket
router.get("/:userId/:bucketName", async (req, res) => {
  const { userId, bucketName } = req.params;

  try {
    await verifyBucketOwnership(userId, bucketName);

    // Fetch all object keys from the specified bucket
  const objectKeys = await listAllObjects(bucketName);

  // Create pre-signed URLs for each object key in the bucket
  const presignedUrls = await Promise.all(
    objectKeys.map(key => getPresignedUrl(bucketName, key))
  );

  res.json({ presignedUrls });
  }
  catch (error) {
    console.error('Error fetching image data:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router as getImage };
