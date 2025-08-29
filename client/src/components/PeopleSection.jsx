import { useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { CiUser } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";

export default function PeopleSection({
  socket,
  forResponsiveDesign,
  setForResponsiveDesign,
}) {
  const [users, setUsers] = useState(["jeet", "vandan", "himesh"]);
  const [rooms, setRooms] = useState(["jeetRoom", "vendanroom"]);
  const handleBack = (e) => {
    if (e.target.textContent === "Create Room") {
      console.log(e.target.textContent);
    } else {
      let newdesign = [...forResponsiveDesign];
      newdesign[0] = { display: "flex" };
      newdesign[1] = { display: "none" };
      console.log(newdesign);
      setForResponsiveDesign(newdesign);
    }
  };
  return (
    <div className="people-section" style={forResponsiveDesign[1]}>
      <div
        className="people-section-btns"
        onClick={(e) => {
          handleBack(e);
        }}
      >
        <div className="back-logo">
          <IoArrowBack size={32} />
        </div>
        <button className="create-room-btn">Create Room</button>
      </div>

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
    </div>
  );
}
