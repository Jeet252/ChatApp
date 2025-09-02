import { CiUser } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";

export default function PeopleSection({
  socket,
  users,
  responsiveCSS,
  setResponsiveCSS,
}) {
  const handleBack = () => {
    setResponsiveCSS(!responsiveCSS);
  };
  return (
    <div
      className={`people-section ${
        !responsiveCSS ? "for-dynamic-people-section" : ""
      }`}
    >
      <div className="people-section-header">
        <div className="back-logo" onClick={handleBack}>
          <IoArrowBack size={32} />
        </div>
        <span>People Online</span>
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
