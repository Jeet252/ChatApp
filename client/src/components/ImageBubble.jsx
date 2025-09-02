export default function ImageBubble({ data, socket }) {
  console.log(data);
  return (
    <ul
      className={`message-bubble ${
        data.senderId === socket.id ? "sent" : "received"
      }`}
    >
      <span
        className="sender-name"
        style={{
          display: `${data.senderId === socket.id ? "none" : "flex"}`,
        }}
      >
        {data.sender}
      </span>
      <span className="image-bubble">
        <img src={data.image} alt="" />
      </span>
    </ul>
  );
}
