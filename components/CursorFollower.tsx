import React, { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const ballRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });

  // Gestionnaire de mouvement de souris
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

  // Animation de la balle
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

  return (
    <div
      ref={ballRef}
      className="pointer-events-none fixed h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rotate-0 rounded-full theme-nord:bg-base-100 bg-base-content mix-blend-difference dark:mix-blend-difference z-0"
      style={{
        left: `${ballPosition.x}px`,
        top: `${ballPosition.y}px`,
      }}
    />
  );
};

export default CursorFollower;
