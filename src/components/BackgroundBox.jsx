import { useEffect, useRef } from "react";
import "../styles/background.css";

export default function BackgroundBox({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let dots = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const spacing = 12;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseSize: Math.random() * 1.5 + 0.5,
            offset: Math.random() * Math.PI * 2
          });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      dots.forEach(dot => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = dot.x - centerX;
        const dy = dot.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const wave = Math.sin(time + dot.offset + distance * 0.008) * 0.5 + 0.5;
        const size = dot.baseSize * (0.5 + wave * 1.5);
        const opacity = theme === 'dark' 
          ? 0.08 + wave * 0.15
          : 0.06 + wave * 0.12;

        ctx.fillStyle = theme === 'dark'
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="background-canvas" />;
}