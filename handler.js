'use strict';

const AWS = require("aws-sdk");
const uuid = require("uuid");

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.getMessageList = async (event) => {

  let params = {
    TableName: "autoping-test-dynamodb"
  }

  let result = await docClient.scan(params).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      items: result.Items
    })
  };
};

module.exports.createMessage = async (event) => {
  const message = JSON.parse(event.body);
  message.createdAt = new Date().toJSON();

  let params = {
    TableName: "autoping-test-dynamodb",
    Item: message
  };

  let result = await docClient.put(params).promise();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(message)
  };
};
