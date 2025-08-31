import { CiUser } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";

export default function PeopleSection({
  socket,
  users,
  responsiveCSS,
  setResponsiveCSS,
}) {
  const handleBack = (e) => {
    if (e.target.textContent === "Create Room") {
      console.log(e.target.textContent);
    } else {
      setResponsiveCSS(!responsiveCSS);
    }
  };
  return (
    <div
      className={`people-section ${
        !responsiveCSS ? "for-dynamic-people-section" : ""
      }`}
    >
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
        {[...users.entries()].map(([elem, index]) => (
          <li className="user-element" key={elem}>
            <CiUser />
            {index}
          </li>
        ))}
      </div>
    </div>
  );
}
