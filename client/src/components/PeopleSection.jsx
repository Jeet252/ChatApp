import { useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { CiUser } from "react-icons/ci";

export default function PeopleSection() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  return (
    <div className="people-section">
      <div className="user-room-section">
        {users.map((elem, index) => (
          <li className="user-element" key={index}>
            <CiUser />
            {elem}
          </li>
        ))}
        {rooms.map((elem, index) => (
          <li className="user-element" key={index}>
            <SiGoogleclassroom /> {elem}
          </li>
        ))}
      </div>

      <button className="create-room-btn">Create Room</button>
    </div>
  );
}
