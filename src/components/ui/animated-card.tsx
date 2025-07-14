'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './card';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  // 使用 useEffect 来触发动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card
      className={`
        transition-all duration-700 ease-out
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
        }
        ${className}
      `}
    >
      {children}
    </Card>
  );
}
