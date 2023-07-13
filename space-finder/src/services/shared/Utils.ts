import { APIGatewayProxyEvent } from "aws-lambda";
import { randomUUID } from "crypto";
//import { v4 } from "uuid";
import { JsonError } from "./Validator";

export function createRandomId() {
    return randomUUID();
}

export function parseJSON(arg: string) {
    try {
        return JSON.parse(arg);
    } catch (error) {
        throw new JsonError(error.message);
    }
}

export function hasAdminGroup(event: APIGatewayProxyEvent) {
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    }
    return false;
}