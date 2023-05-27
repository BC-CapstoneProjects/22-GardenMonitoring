import express from 'express';
import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../public/libs/s3Client.js";

const router = express.Router();

// Route handler for getting all images from the specified bucket
router.get("/:bucketName", async (req, res) => {
  const bucketName = req.params.bucketName;

  // Fetch all object keys from the specified bucket
  const objectKeys = await listAllObjects(bucketName);

  // Create pre-signed URLs for each object key in the bucket
  const presignedUrls = await Promise.all(
    objectKeys.map(key => getPresignedUrl(bucketName, key))
  );

  res.json({ presignedUrls });
});

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

export { router as getImage };
