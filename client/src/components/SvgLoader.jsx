export default function SvgLoader({
  size = 168,
  speed = 1,
  label,
  fullScreen = true,
}) {
  const wrapperClasses = fullScreen
    ? "fixed inset-0 z-[9999] flex items-center justify-center bg-[#1f1f1f]"
    : "inline-flex items-center justify-center";

  const spd = typeof speed === "number" && speed > 0 ? speed : 1;
  const typingDur = `${1.2 / spd}s`;

  return (
    <div className="flex flex-col items-center gap-6 loader-div">
      <div className="svg-container">
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
@keyframes typing { 0%{opacity:.2; transform: translateY(0)} 50%{opacity:1; transform: translateY(-3px)} 100%{opacity:.2; transform: translateY(0)} }
.dot { animation: typing ${typingDur} ease-in-out infinite; }
`}</style>

          {/* Single chat bubble */}
          <path
            d="M44 70c-14 0-26 10-26 22v16c0 12 12 22 26 22h6c1.5 0 2.8.6 3.7 1.6l8.5 9c2.1 2.2 5.8.7 5.8-2.3v-6.4c0-1.6 1.3-2.9 2.9-2.9H64c14 0 26-10 26-22V92c0-12-12-22-26-22H44Z"
            fill="#2c2c2c"
            stroke="#e0e0e0"
            strokeWidth="2"
          />

          {/* three typing dots */}
          <g transform="translate(54 98)">
            <circle
              className="dot"
              style={{ animationDelay: `${(0.0 / spd).toFixed(3)}s` }}
              r="5"
              cx="0"
              cy="0"
              fill="#e0e0e0"
            />
            <circle
              className="dot"
              style={{ animationDelay: `${(0.2 / spd).toFixed(3)}s` }}
              r="5"
              cx="18"
              cy="0"
              fill="#e0e0e0"
            />
            <circle
              className="dot"
              style={{ animationDelay: `${(0.4 / spd).toFixed(3)}s` }}
              r="5"
              cx="36"
              cy="0"
              fill="#e0e0e0"
            />
          </g>
        </svg>
      </div>

      {/* Label */}
      <p className=" loader-text text-[#e0e0e0] text-sm tracking-wide select-none">
        Connecting to {label}
      </p>
    </div>
  );
}
