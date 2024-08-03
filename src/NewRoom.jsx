import axios from "axios";
import { useState } from "react";

const API_URL = 'http://localhost:3005';


export const NewRoom = ({ handleSetRooms, handleSelectRoom }) => {
  const [text, setText] = useState('');

  async function postRoom(text) {
    if (text.trim() === '') {
      return;
    }

    try {
      const respons = await axios.get(`${API_URL}/new-rooms/?newRoom=${encodeURIComponent(text)}`);
      
      handleSelectRoom(text)
      handleSetRooms(respons.data)
    } catch (error) {
      console.error("Error get rooms:", error);
    }
  }

  return (
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();

        await postRoom(text);

        setText('');
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Enter a name room"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button className="button">Send</button>
    </form>
  )
}