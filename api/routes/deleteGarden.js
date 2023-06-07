import express from 'express';
import { s3Client } from "../public/libs/s3Client.js";
import { dynamoDbClient } from '../public/libs/dynamoDbClient.js';
import { GetItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { DeleteBucketCommand } from '@aws-sdk/client-s3';

const router = express.Router();

/*
This route only remove the garden name from the user's bucket names in the Bucket table.
It does not and should never delete S3 resources.

The UpdateItemCommand does not support the DELETE action in the UpdateExpression to remove an item from a string set.
We have to use REMOVE action. However, you cannot directly remove an item from a string set (SS).
Instead, you have to:

1.    Read the item
2.    Remove the element from the set in our code
3.    Write the item back

 */

router.delete("/:userId/:bucketName", async (req, res) => {
  const bucketName = req.params.bucketName;
  const userId = req.params.userId;

  try {
      const getParams = {
          TableName: 'Bucket',
          Key: {
              'userId': {S: userId}
          }
      };

      const userData = await dynamoDbClient.send(new GetItemCommand(getParams));

      if (userData.Item) {
          // user exists, update existing item in Bucket table
          const bucketIndex = userData.Item.buckets.SS.indexOf(bucketName);
          if (bucketIndex !== -1) {
              // remove bucketName from user's buckets at the index it was found in 'buckets'
              // In DynamoDB, 'SS' is a data type for an attribute that is an array of unique strings.
              // When retrieved in JavaScript, this data type is automatically converted into an array
              // of strings for manipulation within this code...

              //Therefore, in the context of our JavaScript code, 'buckets' can be treated as an
              // array of strings, which allows for the use of array methods such as splice().
              userData.Item.buckets.SS.splice(bucketIndex, 1);
              const updateParams = {
                  TableName: 'Bucket',
                  Key: {
                      'userId': {S: userId}
                  },
                  UpdateExpression: 'SET buckets = :b',
                  ExpressionAttributeValues: {
                      ':b': {SS: userData.Item.buckets.SS}
                  },
                  ReturnValues: "ALL_NEW"
              };

              await dynamoDbClient.send(new UpdateItemCommand(updateParams));

              // check if user has no more buckets, delete userId item from Bucket table
              if (!userData.Item.buckets.SS.length) {
                  await dynamoDbClient.send(new DeleteItemCommand({
                      TableName: 'Bucket',
                      Key: {
                          'userId': {S: userId}
                      }
                  }));
              }

              res.status(200).send(`Bucket "${bucketName}" deleted successfully.`);
          } else {
              // bucket does not exist, cannot delete bucket
              res.status(400).send(`No bucket named "${bucketName}" found for user "${userId}"`);
          }
      }
  }
  catch (error) {
    console.error('Error deleting bucket:', error);
    res.status(500).json({error: error.message});
  }
});

export { router as deleteGarden };
