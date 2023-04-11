import express from "express";
import { dynamoDbClient } from "../public/libs/dynamoDbClient.js";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

const router = express.Router();

// get params from client for specific plant table on aws
const getPlantData = async (plantId) => {
  
    const params = {
      TableName: "Plant_" + plantId, //concat second param to string for dynamodb request
    };

    console.log("Fetching plant data with params:", params);
    console.log("Table name:", params.TableName);
    try {
        const data = await dynamoDbClient.send(new ScanCommand(params));
        console.log("Fetched plant data:", data);
        // format data for json
        const formattedData = data.Items.map((item) => ({
            time_stamp: item.time_stamp.S,
            probability: Number(item.probability.N),
            disease: item.disease.S,
        }));
    return formattedData;
  } 
  catch (error) {
    console.error("Error fetching plant data:", error);
    return { error: "Error fetching plant data", details: error.message, fullError: error };
  }
};

router.get("/plant/:plantId", async (req, res) => {
  const plantId = req.params.plantId;
  const plantData = await getPlantData(plantId);
  res.json(plantData); // response is json with Plant_ table data
});

export const getScans = router;