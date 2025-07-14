'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function Typewriter({ text, delay = 0, speed = 100, className = '' }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, isStarted, speed]);

  return (
    <span className={className}>
      {displayedText}
      {isStarted && currentIndex <= text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
