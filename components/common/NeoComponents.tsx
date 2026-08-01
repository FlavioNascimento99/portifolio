import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface NeoCardProps {
  children: ReactNode;
  className?: string;
  color?: string;
  hoverEffect?: boolean;
}

export const NeoCard: React.FC<NeoCardProps> = ({ 
  children, 
  className = "", 
  color = "bg-[var(--surface)]", 
  hoverEffect = true 
}) => {
  return (
    <div 
      className={`
        ${color} 
        border-4 border-black 
        shadow-neo 
        p-6 
        ${hoverEffect ? 'hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  className = "", 
  variant = 'primary', 
  ...props 
}) => {
  const baseStyles = "text-black font-bold border-4 border-black px-6 py-3 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm transition-all active:translate-x-[5px] active:translate-y-[5px] active:shadow-none font-mono text-sm md:text-base uppercase tracking-wider";
  
  const variants = {
    primary: "bg-neo-blue text-black",
    secondary: "bg-white text-black",
    accent: "bg-neo-pink text-black"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

interface NeoBadgeProps {
  label: string;
  color?: string;
}

export const NeoBadge: React.FC<NeoBadgeProps> = ({ label, color = "bg-neo-yellow" }) => {
  return (
    <span className={`inline-block text-black ${color} border-2 border-black px-2 py-1 font-mono text-xs font-bold shadow-neo-sm`}>
      {label}
    </span>
  );
};
