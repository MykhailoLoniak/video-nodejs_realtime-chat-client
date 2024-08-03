import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3005/user';

export const NameInput = ({ setName }) => {
  const [inputName, setInputName] = useState('');

  async function sendMessage(name) {
    try {
      await axios.post(API_URL, { name });
      localStorage.setItem("name", name);
    } catch (error) {
      console.error("Error sending name:", error);
    }
  }
  
  return (
    <>
    <h1 className="title"></h1>
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();
        
        await sendMessage(inputName);
        setName(inputName);
        setInputName('');
      }}
      >
      <input
        type="text"
        className="input"
        placeholder="Enter a name"
        value={inputName}
        onChange={event => setInputName(event.target.value)}
        />
      <button className="button">Send</button>
    </form>
        </>
  );
}