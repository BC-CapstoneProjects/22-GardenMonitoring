/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_NOTIFICATIONTABEL_ARN
	STORAGE_NOTIFICATIONTABEL_NAME
	STORAGE_NOTIFICATIONTABEL_STREAMARN
Amplify Params - DO NOT EDIT */
// Import required AWS SDK clients and commands for Node.js
// const AWS = require("aws-sdk");
const { PublishCommand } = require("@aws-sdk/client-sns");

const { snsClient } = require("./libs/snsClient.js");

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/**********************
 * Example get method *
 **********************/

app.get("/Notification", function (req, res) {
  // Add your code here
  var params = {
    ExpressionAttributeValues: {
      ":Garden_id": req.query.Garden_id,
    },
    //  KeyConditionExpression: 'Season = :s and Episode > :e',
    FilterExpression: "contains (Garden_id, :Garden_id)",
    ProjectionExpression: "Garden_id, Label",
    TableName: process.env.STORAGE_NOTIFICATIONTABEL_NAME,
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      res.json({ error: err, url: req.url });
    } else {
      res.json({ data: data.Items });
    }
  });
});

/****************************
 * Example post method *
 ****************************/

app.post("/Notification", function (req, res) {
  //This using dynamodb to store notification data
  // var params = {
  //   TableName: process.env.STORAGE_NOTIFICATIONTABEL_NAME,
  //   Item: {
  //     UserId = "1"
  //     userId: req.body.userId,
  //     message: req.body.message,
  //   },
  // };

  // docClient.put(params, function (req, res) {
  //   if (err) res.json({ err: err });
  //   else res.json({ success: data });
  // });
  // Ses sending message through sns client
  var params = {
    Message: req.body.message, // MESSAGE_TEXT
    TopicArn: "Tarn:aws:sns:us-west-2:286336465435:AlarmTopic",
  };

  const run = async () => {
    try {
      const data = await snsClient.send(new PublishCommand(params));
      console.log("Success.", data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err.stack);
    }
  };
  run();

  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/Notification/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
