import express from "express";
import { dynamoDbClient } from "../public/libs/dynamoDbClient.js";
import { ScanCommand, DescribeTableCommand, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const router = express.Router();

// helper function that first verifies userId parameter is tied to the bucketName param
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
      throw new Error
    }

    if (!data.Item.buckets.SS.includes(bucketName)) {
      console.error(`User ${userId} does not own the bucket ${bucketName}.`);
      throw new Error(`User ${userId} does not own the bucket ${bucketName}.`);
    }

    console.log(`Verified bucket ${bucketName} ownership for user ${userId}.`);
  } 
  catch (error) {
    console.error('Error verifying bucket ownership:', error);
    throw error;
  }
};

const getPlantData = async (userId, bucketName, plantId) => {
  // first verify the user has ownership of the bucketName param
  await verifyBucketOwnership(userId, bucketName);

  const params = {
    TableName: bucketName,
    KeyConditionExpression: "plant_id = :plantId",
    ExpressionAttributeValues: {
      ":plantId": { S: plantId }
    }
  };

  try {
    const data = await dynamoDbClient.send(new QueryCommand(params));
    if (data.Items) {
      // the request params matches items on dynamodb
      return data.Items.map(item => {
        return item.metadata.L.map(metadataItem => {
          return {
            time_stamp: metadataItem.M.time_stamp.S,
            probability: metadataItem.M.probability.N,
            disease: metadataItem.M.disease.S,
          };
        });
      });
    }
    else {
      return [];
    }
  }
  catch (error) {
    console.error('Error getting plant data:', error);
    throw error;
  }
};

// returns json data for a given plant
// requires authenticated user with ownership of the passed bucketName
router.get("/:userId/:bucketName/:plantId", async (req, res) => {
  const { userId, bucketName, plantId } = req.params;

  try {
    const plantData = await getPlantData(userId, bucketName, plantId);
    res.json(plantData);
  }
  catch (error) {
    console.error('Error fetching plant data:', error);
    res.status(500).json({ error: error.message });
  }
});

export const getScans = router;
