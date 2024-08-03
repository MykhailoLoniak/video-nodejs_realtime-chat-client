import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3005/messages';

const sendMessage = async (text, author, room) => {
  try {
    await axios.post(API_URL, { text, author, room });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const MessageForm = ({room}) => {
  const [text, setText] = useState('');
  const author =  localStorage.getItem("name");

  return (
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();
        
        await sendMessage(text, author, room );
        
        setText('');
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Enter a message"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button className="button">Send</button>
    </form>
  );
};
