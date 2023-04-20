import express from 'express';
import { GetObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../public/libs/s3Client.js";
import { createWriteStream, readdir, unlink } from "fs";
import { promisify } from "util";

const router = express.Router();

// Promisify readdir and unlink for async/await usage... 
// because this route also removes images from ./public/images
const readdirAsync = promisify(readdir);
const unlinkAsync = promisify(unlink);

// Route handler for downloading all images from the specified bucket
router.get("/:bucketName", async (req, res) => {
  const bucketName = req.params.bucketName;
  
  // Fetch all object keys from the specified bucket
  const objectKeys = await listAllObjects(bucketName);
  
  // Create params array for each object key in the bucket
  const params = objectKeys.map((key) => ({ Key: key, Bucket: bucketName }));
  
  // Download all images using the params array
  await updateImages(params);
  
  res.json({ filenames: objectKeys });
});

// Function to download an image using the provided params and index
export const run = async (params, i) => {
  try {
    const data = await s3Client.send(new GetObjectCommand(params[i]));
    console.log(data);
    
    // Save the downloaded image to the local file system
    data.Body.pipe(createWriteStream("./public/images/" + params[i].Key));
    
    return await data.Body.transformToString();
  } catch (err) {
    console.log("Error", err);
  }
};

// Function to download all images using the provided params array
async function updateImages(params) {
  // Remove all files from the ./public/images directory
  try {
    const files = await readdirAsync("./public/images");
    await Promise.all(files.map(file => unlinkAsync(`./public/images/${file}`)));
  } catch (err) {
    console.log("Error removing files:", err);
  }

  // Download and save the new images
  for (let i = 0; i < params.length; i++) {
    await run(params, i);
  }
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