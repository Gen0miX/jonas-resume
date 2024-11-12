import React, { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

const CursorFollower: React.FC<Props> = ({ className }) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const hoverTimeout = useRef<number | null>(null);

  // Mettre à jour la position de la souris
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const speed = 0.02;
    let animationFrameId: number;
    const animate = () => {
      setBallPosition((prev) => {
        const distX = mousePosition.x - prev.x;
        const distY = mousePosition.y - prev.y;
        return {
          x: prev.x + distX * speed,
          y: prev.y + distY * speed,
        };
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = null;
      }
      setHovering(true);
    };

    const handleMouseLeave = () => {
      hoverTimeout.current = window.setTimeout(() => {
        setHovering(false);
      }, 120);
    };

    const clickableElements = document.querySelectorAll(
      "a, button, [role='button']"
    );
    clickableElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      clickableElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <div
      ref={ballRef}
      className={`
        pointer-events-none fixed h-[25px] w-[25px] -translate-x-1/2 -translate-y-1/2
        z-[999] transition-transform duration-500 ease-in-out mix-blend-difference
        ${
          hovering
            ? "bg-base-content theme-nord:bg-[#bebbb4] scale-[5]  "
            : "bg-transparent border-2 border-base-content theme-nord:border-[#bebbb4] h-[50px] w-[50px]"
        }
        rounded-full ${className}
      `}
      style={{
        left: `${ballPosition.x}px`,
        top: `${ballPosition.y}px`,
      }}
    >
      {!hovering && (
        <div className="h-1 w-1 bg-base-content theme-nord:bg-[#bebbb4] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
};

export default CursorFollower;
