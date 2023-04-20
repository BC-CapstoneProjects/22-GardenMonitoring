import express from "express";
import { dynamoDbClient } from "../public/libs/dynamoDbClient.js";
import { ScanCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import fs from "fs/promises"; 

const router = express.Router();

const getPlantData = async (plantId) => {
  const params = {
    TableName: "Plant_" + plantId,
  };

  console.log("Fetching plant data with params:", params);
  console.log("Table name:", params.TableName);

  const describeParams = {
    TableName: params.TableName,
  };
  const describeTableData = await dynamoDbClient.send(new DescribeTableCommand(describeParams));
  console.log("Table description:", describeTableData);

  try {
    const data = await dynamoDbClient.send(new ScanCommand(params));
    console.log("Fetched plant data:", data);

    if (data.Items.length === 0) {
      console.log("No data found in the table.");
      return [];
    }

    console.log("Data.Items:", data.Items);

    const formattedData = data.Items.map((item) => {
      console.log("Item:", item);
      return {
        time_stamp: item.time_stamp.S,
        probability: Number(item.probability.N),
        disease: item.disease.S,
      };
    });

    // convert timestamp in formattedData to ISO format, 
    // then Sort the returned ISO timestampin descending order
    formattedData.sort((a, b) => {
      const convertToComparable = (timestamp) => {
        const datePart = timestamp.slice(4, 15);
        const timePart = timestamp.slice(15, 24);
        const timezonePart = timestamp.slice(24);
        const [day, monthStr, year] = datePart.split('-');
        const monthMap = {
          'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
          'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
        };
        const month = monthMap[monthStr];
        return `${year}${month}${day}${timePart}${timezonePart}`;
      };
    
      const comparableA = convertToComparable(a.time_stamp);
      const comparableB = convertToComparable(b.time_stamp);
    
      return comparableB.localeCompare(comparableA);
    });
    
    console.log("Formatted plant data:", formattedData);

    // Saving formattedData to JSON file in /public/scans/
    const filePath = `./public/scans/Plant_${plantId}.json`;
    await fs.writeFile(filePath, JSON.stringify(formattedData, null, 2));
    console.log(`Saved plant data to ${filePath}`);

    return formattedData;
  } catch (error) {
    console.error("Error fetching plant data:", error);
    return { error: "Error fetching plant data", details: error.message, fullError: error };
  }
};

router.get("/plant/:plantId", async (req, res) => {
  const plantId = req.params.plantId;
  console.log("Received request for plant:", plantId); // Add this line
  const plantData = await getPlantData(plantId);
  res.json(plantData);
});

export const getScans = router;
