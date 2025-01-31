import dynamoDB from "./libs/dynamoDB";
import { success, failure } from "./libs/response";

export async function main(event) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'noteId': path parameter
    Key: {
      noteId: { S: event.pathParameters.id }
    }
  };

  try {
    const result = await dynamoDB.getItem(params).promise();
    if (result.Item) {
      // Return the retrieved item
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
