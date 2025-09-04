export default function ImageBubble({ data }) {
  return (
    <span className="image-bubble">
      <img src={data.image} alt="" />
    </span>
  );
}
