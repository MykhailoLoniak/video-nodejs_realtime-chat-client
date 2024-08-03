import { useEffect, useRef, useState } from 'react';
import { MessageForm } from './MessageForm.jsx';
import { MessageList } from './MessageList.jsx';
import { NameInput } from './NameInput.jsx';
import { Rooms } from './Rooms.jsx';

import './App.css'

const createWebSocketConnection = (selectRoom, onData, setMessages, updateRooms) => {
  const socket = new WebSocket("ws://localhost:3005");

  const handleOpen = () => {
    console.log("WebSocket connected");
    socket.send(JSON.stringify({ type: "join", room: selectRoom }));
  };

  const handleMessage = (event) => {
    console.log('Received message from server:', event.data);
    const data = JSON.parse(event.data);

    if (data.type === 'history') {
      setMessages(data.messages);
    } else if (data.type === 'updateRooms') {
      updateRooms(data.rooms);
    } else {
      onData(data);
    }
  };

  const handleClose = (event) => {
    console.log(`WebSocket disconnected: ${event.code} - ${event.reason}`);
  };

  const handleError = (error) => {
    console.error(`WebSocket error: ${error.message}`);
  };

  socket.addEventListener('open', handleOpen);
  socket.addEventListener('message', handleMessage);
  socket.addEventListener('close',
    handleClose);
  socket.addEventListener('error', handleError);

  return () => {
    socket.removeEventListener('open',
      handleOpen);
    socket.removeEventListener('message', handleMessage);
    socket.removeEventListener('close',
      handleClose);
    socket.removeEventListener('error',
      handleError);
    console.log('WebSocket connection closed');
    socket.close();
  };
};

const DataLoader = ({ onData, selectRoom, setMessages, updateRooms }) => {
  useEffect(() => {
    createWebSocketConnection(selectRoom, onData, setMessages, updateRooms);
  }, []);

  useEffect(() => {
    createWebSocketConnection(selectRoom, onData, setMessages, updateRooms);

  }, [selectRoom]);

  return (
    <h1 className="title">Chat Application</h1>
  );
};

export function App() {
  const [messages, setMessages] = useState([]);
  const [selectRoom, setSelectRoom] = useState('');
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [rooms, setRooms] = useState([]);

  const handleSelectRoom = (room) => {
    setSelectRoom(room);
    setMessages([]);
  };

  function saveData(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  function updateRooms(newRooms) {
    setRooms(newRooms);
  }

  return (
    <section className="section content">
      <DataLoader onData={saveData} selectRoom={selectRoom} setMessages={setMessages} message={messages} updateRooms={updateRooms} />
      {!name && <NameInput setName={setName} />}

      {!!name && (
        <div className='con'>
          <div className='con__room'>
            <Rooms room={selectRoom} handleSelectRoom={handleSelectRoom} rooms={rooms} />
          </div>

          {name && !!selectRoom.length && (
            <div className='con__chat'>
              <MessageForm room={selectRoom} />
              <MessageList messages={messages} />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
