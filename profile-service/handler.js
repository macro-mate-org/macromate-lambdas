import AWS from "aws-sdk";
import { verifyToken } from "./verifyToken.js";
import { success, error } from "./utils/response.js";

const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.PROFILE_TABLE;

export const handler = async (event) => {
  try {
    const method = event.httpMethod;
    const user = await verifyToken(event.headers.Authorization);
    const user_id = user.sub;

    switch (method) {
      case "GET":
        const result = await dynamo.get({
          TableName: tableName,
          Key: { user_id }
        }).promise();
        return success(200, result.Item || {});

      case "POST":
      case "PUT":
        const body = JSON.parse(event.body || "{}");
        const now = new Date().toISOString();
        const item = {
          user_id,
          name: body.name || "",
          age: body.age || null,
          gender: body.gender || "",
          goal: body.goal || "",
          created_at: body.created_at || now,
          updated_at: now
        };
        await dynamo.put({ TableName: tableName, Item: item }).promise();
        return success(200, { message: "Profile saved", profile: item });

      case "DELETE":
        await dynamo.delete({
          TableName: tableName,
          Key: { user_id }
        }).promise();
        return success(200, { message: "Profile deleted" });

      default:
        return error(405, `Unsupported method: ${method}`);
    }
  } catch (err) {
    console.error("Error:", err);
    return error(401, err.message || "Unauthorized");
  }
};
