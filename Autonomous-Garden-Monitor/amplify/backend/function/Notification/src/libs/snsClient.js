// const AWS = require("@aws-sdk");

const { SNSClient } = require("@aws-sdk/client-sns");
// Set the AWS Region.
const REGION = "us-west-2"; //e.g. "us-east-1"
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION });
module.exports = { snsClient };
