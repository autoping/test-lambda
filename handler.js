'use strict';

const uuid = require("uuid");

const messages = [
  {
    authorId: "0ef2a10d831af83ad4f712fd97d4df5",
    content: "Newer message from 24th of December",
    createdAt: "2021-12-24T09:30:00.000Z",
    id: "b09283b6-d9b4-42c7-b051-6c14738dc096"
  },
  {
    authorId: "0ef2a10d831af83ad4f712fd97d4df5",
    content: "Old message from 20th of December",
    createdAt: "2021-12-20T08:00:00.000Z",
    id: "82a663b9-9f3d-449b-ba20-7d774573a022"
  }
];

module.exports.getMessageList = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      items: messages
    }),
  };
  callback(null, response);
};

module.exports.createMessage = (event, context, callback) => {
  let message = JSON.parse(event.body);
  message.id = uuid.v4();
  message.createdAt = new Date().toJSON();
  messages.push(message);
  const response = {
    statusCode: 201,
    body: JSON.stringify({
      items: messages
    }),
  };
  callback(null, response);
};
