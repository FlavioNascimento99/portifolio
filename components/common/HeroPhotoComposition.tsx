import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { HeroShape, ShapeColor } from '../../types/hero';

const COLOR_MAP: Record<ShapeColor, string> = {
  yellow: 'var(--yellow)',
  cyan: 'var(--cyan)',
  pink: 'var(--pink)',
  green: 'var(--green)',
  surface: 'var(--surface)',
  band: 'var(--band)',
  text: 'var(--text)',
};

interface GeometricShapeProps {
  shape: HeroShape;
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
}

const GeometricShape: React.FC<GeometricShapeProps> = ({ shape, mouseX, mouseY, containerRef, isMobile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 30 });
  const springY = useSpring(y, { stiffness: 200, damping: 30 });

  const pos = isMobile && shape.responsive?.position ? shape.responsive.position : shape.position;
  const sz = isMobile && shape.responsive?.size ? shape.responsive.size : shape.size;
  const w = isMobile && shape.responsive?.width ? shape.responsive.width : shape.width;
  const h = isMobile && shape.responsive?.height ? shape.responsive.height : shape.height;

  if (isMobile && shape.responsive?.hideOnMobile) return null;

  useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current || !containerRef.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX.current - centerX, 2) + Math.pow(mouseY.current - centerY, 2)
      );
      if (distance < 200) {
        const angle = Math.atan2(mouseY.current - centerY, mouseX.current - centerX);
        const force = (1 - distance / 200) * 15;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY, containerRef]);

  const color = COLOR_MAP[shape.color];
  const borderWidth = shape.borderWidth ?? 3;
  const opacity = shape.opacity ?? 1;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    ...pos,
    width: w ?? sz,
    height: h ?? (shape.type === 'line' ? borderWidth : sz),
    opacity,
    zIndex: shape.zIndex,
    pointerEvents: 'none',
  };

  if (shape.type === 'line') {
    return (
      <motion.div
        ref={ref}
        style={{ ...baseStyle, x: springX, y: springY, rotate: shape.rotation ?? 0, backgroundColor: color }}
      />
    );
  }

  if (shape.type === 'triangle') {
    const size = sz ?? 60;
    return (
      <motion.div
        ref={ref}
        style={{
          ...baseStyle,
          x: springX,
          y: springY,
          rotate: shape.rotation ?? 0,
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
        }}
      />
    );
  }

  const borderRadius = shape.type === 'circle' ? '50%' : '0';

  return (
    <motion.div
      ref={ref}
      style={{
        ...baseStyle,
        x: springX,
        y: springY,
        rotate: shape.rotation ?? 0,
        borderRadius,
        border: `${borderWidth}px solid ${color}`,
        backgroundColor: shape.filled ? color : 'transparent',
        boxShadow: shape.shadow ? `5px 5px 0 0 ${color}` : 'none',
      }}
    />
  );
};

export interface HeroPhotoCompositionProps {
  imageSrc: string;
  imageAlt: string;
  shapes: HeroShape[];
  children?: React.ReactNode;
  className?: string;
}

export const HeroPhotoComposition: React.FC<HeroPhotoCompositionProps> = ({
  imageSrc,
  imageAlt,
  shapes,
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ overflow: 'visible' }}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Geometric shapes */}
      {shapes.map((shape, i) => (
        <GeometricShape
          key={i}
          shape={shape}
          mouseX={mouseX}
          mouseY={mouseY}
          containerRef={containerRef}
          isMobile={isMobile}
        />
      ))}

      {/* Photo */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
