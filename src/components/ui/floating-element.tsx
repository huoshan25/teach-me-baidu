'use client';

import React from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({ children, className = '', delay = 0 }: FloatingElementProps) {
  return (
    <div
      className={`
        animate-pulse hover:animate-bounce
        transition-transform duration-300 hover:scale-110
        ${className}
      `}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
