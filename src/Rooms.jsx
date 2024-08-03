import { useEffect, useState } from 'react';
import axios from 'axios';
import { NewRoom } from './NewRoom.jsx';
import { IoEllipseOutline } from 'react-icons/io5';
import { FaRegCheckCircle } from 'react-icons/fa';

const API_URL = 'http://localhost:3005/rooms';

async function getRooms() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error getting rooms:', error);
  }
}

export const Rooms = ({ handleSelectRoom, room, rooms }) => {
  const [localRooms, setLocalRooms] = useState([]);
  console.log(localRooms);

  useEffect(() => {
    setLocalRooms(rooms)
  }, [rooms])

  useEffect(() => {
    const fetchRooms = async () => {
      const fetchedRooms = await getRooms();
      setLocalRooms(fetchedRooms);
    };

    fetchRooms();
  }, []);

  const handleSetRooms = (data) => {
    setLocalRooms(data);
  };

  return (
    <>
      <NewRoom handleSetRooms={handleSetRooms} handleSelectRoom={handleSelectRoom} />
      {localRooms.length > 0 && (
        <>
          <h3>Rooms</h3>
          <ul>
            {localRooms.map((key) => (
              <li key={key} onClick={() => handleSelectRoom(key)} className="roomItem">
                {key === room ? (
                  <strong>
                    <FaRegCheckCircle className="iconCheck" />
                    {key}
                  </strong>
                ) : (
                  <>
                    <IoEllipseOutline className="iconCheck" />
                    {key}
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
