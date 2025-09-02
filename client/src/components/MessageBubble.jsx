export default function MessageBubble({ data, socket }) {
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
      <span>{data.message}</span>
    </ul>
  );
}
