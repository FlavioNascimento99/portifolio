import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'li';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const directionClass = {
    up: 'reveal-from-up',
    down: 'reveal-from-down',
    left: 'reveal-from-left',
    right: 'reveal-from-right',
    none: '',
  }[direction];

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${directionClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};
