// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid-v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  count = {
      type: "clientSize",
      clientSize: wss.clients.size
  }
wss.clients.forEach(client => {
    client.send(JSON.stringify(count))
});
console.log(count)

ws.on('message', (rawMessage) => {
    console.log('$@#$@#', rawMessage)
    const UUID = uuid();
    const newMessage = JSON.parse(rawMessage);
    newMessage["id"] = UUID

    if(newMessage.type === 'postMessage'){
        newMessage.type = 'incomingMessage';
        broadcast(JSON.stringify(newMessage))
    } else if (newMessage.type === 'postNotification' ){
        newMessage.type = 'incomingNotification';
        broadcast(JSON.stringify(newMessage))
    } else {
        console.log('Unable to determine type'); ///
    }
    // change type message to type incoming message here

    console.log('newMessage: ', newMessage);
    console.log(wss.clients.size);
    broadcast(JSON.stringify(newMessage));
});
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    count = {
        type: "clientSize",
        clientSize: wss.clients.size
    }
  wss.clients.forEach(client => {
      client.send(JSON.stringify(count))
  });
      console.log('Client disconnected')
    }
);
});

//1. require broadcast and uuid (v4) api 
//2. create a  function that assigns a UUID to the parsed message and stringify that ISH
//3. implement the broadcast function. (look into documentation) ?? maybe not 


// Send a postNotification message to the server to notify all connected users of 
// the name change
// Browser receives the incomingNotification message and displays the notification