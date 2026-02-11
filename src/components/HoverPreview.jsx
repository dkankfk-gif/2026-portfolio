import { useState } from "react";
import "./HoverPreview.css";

export default function HoverPreview({
  children,
  imgSrc,
  imgAlt = "",
  width = 120,
  offsetX = 10,
  offsetY = -20,
  className = "",
}) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      className={`hpWrap ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {children}

      <div
        className={`hpPreview ${hover ? "is-show" : ""}`}
        aria-hidden={!hover}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      >
        <div
          className="hpBox"
          style={{
            width: `${width}px`,
            transform: `translate(${offsetX}px, ${offsetY}px)`,
          }}
        >
          <img className="hpImg" src={imgSrc} alt={imgAlt} draggable="false" />
        </div>
      </div>
    </div>
  );
}
