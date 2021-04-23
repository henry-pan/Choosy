import React from "react";
import io from "socket.io-client";
import { socket } from "../../util/socket_util";
import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

class Room extends React.Component{
  constructor(props){
    super(props);

    // all this initial state-setting requires hooks. rip.
    // const [username, setUsername] = useState("");
    // const [connected, setConnected] = useState(false); // need this
    // const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: "general", receiverId: "" });
    // const [connectedRooms, setConnectedRooms] = useState(["general"]);
    // const [allUsers, setAllUsers] = useState([]);
    // const [messages, setMessages] = useState(initialMessagesState);
    // const [message, setMessage] = useState("");
    // const socketRef = useRef(); // ref will be housed in the socket.io connected client

    
    this.state = {};
  }

  componentDidMount(){
    // this.props.loadGuests(); // doesn't work

    socket();
  }

  // sendUsername() {
  //   const payload = {
  //     username,
  //     roomcode // pass in roomcode from props?
  //   }
  //   socketRef.current.emit("send message", payload);
  // }



  
  render() {
    if (!this.props.currentUser) return null;

    return (
      <div>
        <h1>Welcome, {this.props.currentUser.name}. You are in the room.</h1>
        <ul id="usernames"></ul>
        <form id="form-test" action="">
          <input id="input-test" placeholder="Input name" autoComplete="off" /><button>Send</button>
        </form>
        <Link to='/room/submitideas'>Start</Link>
      </div>
    );
  }
}

export default Room;
