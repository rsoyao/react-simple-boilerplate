import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Ram'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 1
    };
  };

  componentDidMount() {
    console.log('!!!!!', this.state.currentUser)
    this.socket = new WebSocket('ws://0.0.0.0:3001');
    this.socket.onmessage = this.receiveMessage;
  }
  
  submitUsername = (username) => { //we know current username, get new username
    this.submitMessage({
      content: `${this.state.currentUser.name} has changed name to ${username}`,
      type: "postNotification"
    })
    this.setState({ currentUser: {name: username}}) //add type post NOtification 
  }

  submitMessage = (newMessage) => {
    this.socket.send(JSON.stringify( // add type postmessage
      newMessage
     ));
  }

  receiveMessage = (rawMessage) => {
    const newMessage = JSON.parse(rawMessage.data);

    switch(newMessage.type) {
      case "incomingMessage":        //
        this.setState({messages: this.state.messages.concat(newMessage)});

        break;
        //
      case "incomingNotification":
      this.setState({messages: this.state.messages.concat(newMessage)});
        break;
      case "clientSize":
      this.setState({userCount: newMessage.clientSize})
      break;
      default:
        throw new Error("Unknown event type " + newMessage.type);
    }

  }

  render = () => (
    <div>
      <NavBar userCount={this.state.userCount}/>
      <MessageList messages={ this.state.messages }/>
      <ChatBar newUser={ this.submitUsername } user={ this.state.currentUser.name } submitMessage={ this.submitMessage }/>
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