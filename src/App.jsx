import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Flob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [{
        id: 1,
        username: 'Bob',
        content: 'Has anyone seen my marbles?',
      },
      {
        id: 2,
        username: 'Anonymous',
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
      }]
    };
  };

  componentDidMount() {
    console.log('!!!!!', this.state.currentUser)
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onmessage = this.receiveMessage;
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000); 
  }

  submitUsername = (username) => {
    this.setState({ currentUser: {name: username}})
  }

  submitMessage = (newMessage) => {
    this.socket.send(JSON.stringify(
      newMessage
     ));
  }

  receiveMessage = (rawMessage) => {
    const newMessage = JSON.parse(rawMessage.data);
    this.setState({messages: this.state.messages.concat(newMessage)});
    // console.log('username', username, 'new message!!', newMessage)
  }

  render = () => (
    <div>
      <NavBar />
      <MessageList messages={ this.state.messages }/>
      <ChatBar newUser={this.submitUsername} user={ this.state.currentUser.name } submitMessage={ this.submitMessage }/>
    </div>
  )
}
export default App;

//send propto chat bar like onSendMessae

//1. Send the message to the WS server from App.js use stringify 
//2. Form the server console log the received message, using JSON parse

// Changing username input 
// Make the name input field editable
// Register an event on the input field that will 
// get called when the user presses
//  ENTER Read the username from the input field
// Send the new username to the App component so 
// this.state.currentUser can be updated