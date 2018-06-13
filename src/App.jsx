import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Flob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
    {
      id: 1,
      username: 'Bob',
      content: 'Has anyone seen my marbles?',
    },
    {
      id: 2,
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]};
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001')

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  submitMessage = (username, inputMessage) => {
    const newMessage = {username: username, content: inputMessage, id: this.state.messages.length + 1};
    const messages = this.state.messages.concat(newMessage)
    this.socket.send(JSON.stringify(
      newMessage
     ))
    this.setState({messages})
    console.log('username', username, 'new message!!', newMessage)
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages }/>
        <ChatBar users={ this.state.currentUser.name } submitMessage={ this.submitMessage }/>
      </div>
    );
  }
}
export default App;

//send propto chat bar like onSendMessae

//1. Send the message to the WS server from App.js use stringify 
//2. Form the server console log the received message, using JSON parse