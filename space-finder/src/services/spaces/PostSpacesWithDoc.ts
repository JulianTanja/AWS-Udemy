import { DynamoDB, DynamoDBClient, ItemCollectionSizeLimitExceededException, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { marshall } from "@aws-sdk/util-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {


    const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
    const randomId = v4();
    const item = JSON.parse(event.body);
    //item.id = randomId;

    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        //Item: marshall(item)
        Item: item
        // Item: {
        //     id: {
        //         S: randomId
        //     },
        //     location: {
        //         S: item.location
        //     }
        // }
    }));
    console.log(result);

    return {
        statusCode: 201,
        body: JSON.stringify({ id: randomId })
    }
}