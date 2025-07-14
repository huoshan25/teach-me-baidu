'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  isActive: boolean;
  onComplete?: () => void;
  onProgress?: (currentText: string) => void;
  speed?: number;
}

export function TypingAnimation({
  text,
  isActive,
  onComplete,
  onProgress,
  speed = 100
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        const newText = displayedText + text[currentIndex];
        setDisplayedText(newText);
        setCurrentIndex(prev => prev + 1);

        // 通知父组件打字进度
        if (onProgress) {
          onProgress(newText);
        }
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && onComplete) {
      // 打字完成后立即调用回调
      const completeTimer = setTimeout(onComplete, 200);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, text, isActive, speed, onComplete, onProgress, displayedText]);

  return (
    <div className="relative inline-block">
      <span className="text-gray-900 whitespace-nowrap">
        {displayedText.split('').map((char, index) => (
          <span key={index} className="inline">
            {char}
          </span>
        ))}
      </span>

      {/* 光标闪烁效果 */}
      {isActive && currentIndex <= text.length && (
        <span
          className="inline-block w-0.5 h-5 bg-gray-900 ml-0.5 animate-pulse"
        />
      )}
    </div>
  );
}
