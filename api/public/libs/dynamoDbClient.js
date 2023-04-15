// based off this snippet-start:[GettingStarted.JavaScript.createclientv3]
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = "us-west-2"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const dynamoDbClient = new DynamoDBClient({ region: REGION });
console.log("DynamoDB client configuration:", dynamoDbClient.config);
export { dynamoDbClient };
// snippet-end:[GettingStarted.JavaScript.createclientv3]