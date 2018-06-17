//component import react
import React, { Component } from 'react';


class ChatBar extends Component {
constructor(props) {
    super(props)
    this.state = {
        message: '',        
    }
}

inputChangeMessage(event){
    if (event.key === 'Enter') {
    const inputMessage = event.target.value
    const username = this.props.user;
    this.props.submitMessage({username: username, content:inputMessage, type: "postMessage"});
    event.target.value = '';
   }
}

inputChangeUser(event){
    this.props.newUser(event.target.value)
}
 
render () {
    return (
    <footer className="chatbar">
    <input className="chatbar-username" defaultValue={ this.props.user } 
    onBlur=
        {this.inputChangeUser.bind(this)} />
    <input className="chatbar-message" value={this.props.messages} placeholder="Type a message and hit ENTER" 
     onKeyUp=
       {this.inputChangeMessage.bind(this)} />
    </footer> 
  );
 }
}
export default ChatBar ; 

//create a seperate function to handle the input change for the username and pass that
//through the username input!!


// the function we passed through props to the ChatBar component is called 
// when the user hits Enter, receiving the text in the input field and passing it up to App
// this.setState is called with a new array that contains the new message
// this will trigger React to call our components render() method
// the new state is passed to all children of the App component

//next steps
//1. change message input into a controlled input 
//2. insert value and onChange function into the input
//3. value will be message. Make sure to pass through username and Inputmessage in function
//4. on change function will be a callback, setting the state and the new input 

