import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
let socket;
const CONNECTION_PORT = "localhost:3002/";

function App() {
  const [loegdIn, setLogedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
      const chatMessages = document.querySelector(".messages");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  });
  const connectToRoom = () => {
    setLogedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    const chatMessages = document.querySelector(".messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setMessage("");
    setCount(count + 1);
  };

  return (
    <div className="App">
      {!loegdIn ? (
        <div className="logIn">
          <h2>Chat Info</h2>
          <div className="inputs">
            <input
              type="text"
              name="name"
              placeholder="Name.."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              name="room"
              placeholder="Room.."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages" id="temp">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author === userName ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    <h4>{val.author}</h4>
                    {val.message}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
