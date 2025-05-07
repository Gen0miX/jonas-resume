import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  className?: string;
}

const CursorFollower: React.FC<Props> = ({ className }) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Ajouter un état pour la visibilité
  const hoverTimeout = useRef<number | null>(null);

  // Mettre à jour la position de la souris
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Lors du premier mouvement de la souris, rendre le curseur visible avec une transition
      if (!isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible]);

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
    <motion.div
      ref={ballRef}
      className={`
        pointer-events-none fixed h-[25px] w-[25px] -translate-x-1/2 -translate-y-1/2
        z-[999] transition-transform duration-500 ease-out mix-blend-difference
        ${
          hovering
            ? "bg-base-content theme-nord:bg-[#bebbb4] scale-[2.5]"
            : "bg-transparent border-2 border-base-content theme-nord:border-[#bebbb4] h-[25px] w-[25px]"
        }
        rounded-full ${className}
      `}
      style={{
        left: `${ballPosition.x}px`,
        top: `${ballPosition.y}px`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.5 }}
    >
      {!hovering && (
        <div className="h-1 w-1 bg-base-content theme-nord:bg-[#bebbb4] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
    </motion.div>
  );
};

export default CursorFollower;
