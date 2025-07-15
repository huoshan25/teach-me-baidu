'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TypingAnimation } from './TypingAnimation';

interface GoogleInterfaceProps {
  searchQuery: string;
  currentStep: number;
  isTyping: boolean;
  currentStepText: string;
}

export function GoogleInterface({ searchQuery, currentStep, isTyping, currentStepText }: GoogleInterfaceProps) {
  const isInputFocused = currentStep >= 2; // 点击搜索框后
  const [displayedText, setDisplayedText] = useState('');

  // 处理打字进度，实现滚动跟随
  const handleTypingProgress = (currentText: string) => {
    setDisplayedText(currentText);
    
    // 滚动到最新位置
    const inputContainer = document.getElementById('google-search-input');
    if (inputContainer) {
      // 使用 requestAnimationFrame 确保 DOM 更新后再滚动
      requestAnimationFrame(() => {
        // 计算需要滚动的距离，确保最新内容可见
        const maxScrollLeft = inputContainer.scrollWidth - inputContainer.clientWidth;
        if (maxScrollLeft > 0) {
          inputContainer.scrollLeft = maxScrollLeft;
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 pb-40 md:pb-32">
      {/* Google Logo */}
      <div className="mb-8">
        {/* 桌面端布局 */}
        <div className="hidden md:flex items-end gap-2">
          <span className="text-2xl text-black">需要让我帮你</span>
          <Image
            src="/google.svg"
            alt="Google Logo"
            width={270}
            height={92}
            className="object-contain"
          />
          <span className="text-2xl text-black">一下么？</span>
        </div>
        
        {/* 移动端布局 */}
        <div className="md:hidden flex items-end justify-center gap-1">
          <span className="text-lg text-black">需要让我帮你</span>
          <Image
            src="/google.svg"
            alt="Google Logo"
            width={120}
            height={41}
            className="object-contain"
          />
          <span className="text-lg text-black">一下么？</span>
        </div>
      </div>

      {/* 搜索框容器 */}
      <div className="w-full max-w-2xl mb-8 px-4 md:px-0">
        <div className="flex items-stretch bg-white border rounded-full overflow-hidden transition-all duration-200 hover:shadow-lg"
          style={{
            borderColor: isInputFocused ? '#1a73e8' : '#dfe1e5',
            boxShadow: isInputFocused
              ? '0 2px 8px rgba(26,115,232,0.3)'
              : '0 2px 4px rgba(0,0,0,0.1)',
            height: '48px'
          }}
        >
          {/* 搜索图标 */}
          <div className="flex items-center justify-center px-4">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>

          {/* 搜索输入框 */}
          <div
            id="google-search-input"
            className="flex-1 px-2 py-3 text-base md:text-lg bg-white h-[48px] flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* 占位符文字 */}
            {currentStep < 2 && (
              <span className="text-gray-500 whitespace-nowrap"></span>
            )}

            {/* 打字动画 */}
            {isTyping && (
              <div className="whitespace-nowrap">
                <TypingAnimation
                  text={searchQuery}
                  isActive={isTyping}
                  onProgress={handleTypingProgress}
                  onComplete={() => {
                    console.log('打字动画完成');
                  }}
                />
              </div>
            )}

            {/* 打字完成后显示的文字 */}
            {currentStep > 3 && !isTyping && (
              <span className="text-gray-900 whitespace-nowrap">{searchQuery}</span>
            )}
          </div>

          {/* 右侧图标 */}
          <div className="flex items-center px-3 space-x-3">
            {/* 语音搜索图标 */}
            <svg className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
            
            {/* 相机搜索图标 */}
            <svg className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.25 2.26l-.08-.04-.01.02C13.46 2.09 12.74 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-.74-.09-1.46-.24-2.16l.02-.01-.04-.08C21.05 8.11 20.1 6.5 18.67 5.33L17.33 6.67C18.39 7.73 19 9.29 19 11c0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7c1.71 0 3.27.61 4.33 1.67l1.34-1.34C16.5 3.9 14.89 2.95 14.25 2.26z"/>
              <path d="M20 4V1l-4 4h3c0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.06-.53L14 5.53c-.26.8-.26 1.67 0 2.47L15.06 9.53c.18-.17.38-.31.6-.41.4-.18.84-.29 1.34-.29 1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3h-2c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.42-1.72-4.44-4-4.9V4h3z"/>
            </svg>
          </div>
        </div>

        {/* 搜索按钮 */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            id="google-search-button"
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded border hover:bg-gray-200 transition-colors text-sm"
          >
            Google 搜索
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded border hover:bg-gray-200 transition-colors text-sm">
            手气不错
          </button>
        </div>

        {/* 步骤提示文字 */}
        {currentStepText && (
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">{currentStepText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
