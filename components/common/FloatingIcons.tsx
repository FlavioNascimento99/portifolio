import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Braces, Cloud, Coffee, Code2, Container, Database, Diamond, FileCode2, Flame,
  Gem, Github, GitBranch, Hash, HardDrive, Hexagon, Layers, Leaf, Server, Ship,
  Terminal, Triangle, Type, Wrench, Zap,
} from 'lucide-react';

interface FloatingIconData {
  id: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
  bg: string;
}

const TECH_ICONS: FloatingIconData[] = [
  { id: 1, icon: Coffee, className: 'top-[8%] left-[3%]', bg: 'bg-neo-yellow' },
  { id: 2, icon: Leaf, className: 'top-[42%] left-[6%]', bg: 'bg-neo-green' },
  { id: 3, icon: Hexagon, className: 'top-[74%] left-[2%]', bg: 'bg-neo-blue' },
  { id: 4, icon: Database, className: 'top-[94%] left-[7%]', bg: 'bg-neo-pink' },
  { id: 5, icon: GitBranch, className: 'top-[24%] left-[2%]', bg: 'bg-neo-yellow' },
  { id: 6, icon: Terminal, className: 'top-[8%] left-[14%]', bg: 'bg-neo-blue' },
  { id: 7, icon: Code2, className: 'top-[36%] left-[12%]', bg: 'bg-neo-green' },
  { id: 8, icon: Container, className: 'top-[64%] left-[15%]', bg: 'bg-neo-yellow' },
  { id: 9, icon: Ship, className: 'top-[88%] left-[12%]', bg: 'bg-neo-pink' },
  { id: 10, icon: Braces, className: 'top-[20%] left-[18%]', bg: 'bg-neo-blue' },
  { id: 11, icon: Layers, className: 'top-[8%] left-[30%]', bg: 'bg-neo-green' },
  { id: 12, icon: Server, className: 'top-[38%] left-[33%]', bg: 'bg-neo-yellow' },
  { id: 13, icon: Type, className: 'top-[68%] left-[30%]', bg: 'bg-neo-pink' },
  { id: 14, icon: FileCode2, className: 'top-[94%] left-[36%]', bg: 'bg-neo-blue' },
  { id: 15, icon: HardDrive, className: 'top-[22%] left-[38%]', bg: 'bg-neo-yellow' },
  { id: 16, icon: Github, className: 'top-[8%] left-[52%]', bg: 'bg-neo-pink' },
  { id: 17, icon: Triangle, className: 'top-[40%] left-[55%]', bg: 'bg-neo-blue' },
  { id: 18, icon: Flame, className: 'top-[70%] left-[52%]', bg: 'bg-neo-green' },
  { id: 19, icon: Cloud, className: 'top-[94%] left-[58%]', bg: 'bg-neo-yellow' },
  { id: 20, icon: Zap, className: 'top-[20%] left-[64%]', bg: 'bg-neo-green' },
  { id: 21, icon: Gem, className: 'top-[8%] left-[78%]', bg: 'bg-neo-pink' },
  { id: 22, icon: Wrench, className: 'top-[38%] left-[84%]', bg: 'bg-neo-yellow' },
  { id: 23, icon: Hash, className: 'top-[66%] left-[78%]', bg: 'bg-neo-blue' },
  { id: 24, icon: Diamond, className: 'top-[94%] left-[88%]', bg: 'bg-neo-pink' },
];

const FloatingIcon: React.FC<{
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
  iconData: FloatingIconData;
  index: number;
}> = ({ mouseX, mouseY, iconData, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2)
        );

        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2)
          );
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${iconData.className}`}
    >
      <motion.div
        className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border-4 border-black shadow-neo blur-[3px] ${iconData.bg}`}
        animate={{
          y: [0, -8, 0, 8, 0],
          x: [0, 6, 0, -6, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5 + index * 0.35,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <iconData.icon className="w-8 h-8 md:w-10 md:h-10 text-black" />
      </motion.div>
    </motion.div>
  );
};

export const FloatingIcons: React.FC = () => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {TECH_ICONS.map((iconData, index) => (
        <FloatingIcon
          key={iconData.id}
          mouseX={mouseX}
          mouseY={mouseY}
          iconData={iconData}
          index={index}
        />
      ))}
    </div>
  );
};
