// var express = require('express');
import express from 'express';
var router = express.Router();

export const getImage = router.get("/",function(req,res,next){
  updateImages(); 
  res.send("API is totally working properly, definitely got some data.");
});
// module.exports = router;

// Set the parameters
import { PutObjectCommand, CreateBucketCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../public/libs/s3Client.js";
import {createWriteStream} from "fs";

export const params = [
  {
    Bucket: "winterdemo", // The name of the bucket. For example, 'sample-bucket-101'.
    Key: "plant1.avif", // The name of the object. For example, 'sample_upload.txt'.
  },
  {
    Bucket: "winterdemo", 
    Key: "plant2.avif", 
  },
  {
    Bucket: "winterdemo", 
    Key: "plant3.avif", 
  },
  {
    Bucket: "winterdemo", 
    Key: "plant4.avif", 
  },
  {
    Bucket: "winterdemo", 
    Key: "plant5.avif", 
  },
  {
    Bucket: "winterdemo", 
    Key: "plant6.avif", 
  },
  {
    Bucket: "winterdemo", 
    Key: "plant7.avif", 
  },
  {
    Bucket: "winterdemo", 
    Key: "plant8.avif", 
  }
];

export const run = async () => {
  try {
    // Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Client.send(new GetObjectCommand(params[i]));
    console.log(data);
    // Convert the ReadableStream to a string.
    data.Body.pipe(createWriteStream("./public/images/" + params[i].Key));
    return await data.Body.transformToString();
  } 
  catch (err) {
    console.log("Error", err);
  }
};

async function updateImages() {
  global.i=0;
  for (let j = i; j < params.length; j++) {
    await run();
    i++;
  }
}