// var express = require('express');
import express from 'express';
import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../public/libs/s3Client.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const router = express.Router();

const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

const createFolder = (folderPath) => {
  // only create the folder if it does not already exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

const listGardenFolders = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const gardensFolderPath = path.join(__dirname, '..', '/public/gardens');
  const folderNames = fs.readdirSync(gardensFolderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  return folderNames;
}

router.get("/", async (req,res,next) => { 
  // execute 'run' function, wait for return of mapped bucket data
  console.log("Creating garden folders...");
  
  const bucketNames = await run();
  console.log("Bucket names: ", bucketNames); // Check if bucket names are fetched
  bucketNames.forEach(bucketName => {
    // create path for bucket name in the 'gardens' folder in 'public'
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const folderPath = path.join(__dirname, '..', '/public/gardens', bucketName)
    console.log("Creating folder: ", folderPath); // Check if folder path is correct
    // use the bucket name to create a new folder
  try {
    createFolder(folderPath);
  } 
  catch (error) {
    console.error("Error creating folder:", error);
  }
  });
  res.send("API for getting garden names is totally working properly, definitely got some data.");
});

router.get("/folders", nocache, async (req, res) => {
  const folderNames = listGardenFolders();
  res.send(folderNames);
});

export const run = async () => {
  try {
    // store all bucket names listed for the configured account
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("S3 Buckets:", data.Buckets);
    return data.Buckets.map(bucket => bucket.Name);
  } 
  catch (err) {
    console.log("Error fetching bucket names:", err);
  }
};

export { router as getGardenNames };