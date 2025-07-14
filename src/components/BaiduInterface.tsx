'use client';

import { TypingAnimation } from './TypingAnimation';
import Image from 'next/image';

interface BaiduInterfaceProps {
  searchQuery: string;
  currentStep: number;
  isTyping: boolean;
  currentStepText: string;
}

export function BaiduInterface({ searchQuery, currentStep, isTyping, currentStepText }: BaiduInterfaceProps) {
  const isInputFocused = currentStep >= 2; // 点击搜索框后

  // 处理打字进度，实现滚动跟随
  const handleTypingProgress = () => {

    // 滚动到最新位置
    const inputContainer = document.getElementById('search-input');
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 pb-32">
      {/* 百度Logo */}
      <div className="mb-8">
        <div className="flex items-end gap-2">
          <span className="text-2xl text-black">需要让我帮你</span>
          <Image
            src="/img/baidu_logo.png"
            alt="Baidu Logo"
            width={270}
            height={129}
            className="object-contain"
          />
          <span className="text-2xl text-black">一下么？</span>
        </div>
      </div>

      {/* 搜索框容器 */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-stretch bg-white border-2 rounded-lg overflow-hidden transition-all duration-200"
          style={{
            borderColor: isInputFocused ? '#4285f4' : '#ddd',
            boxShadow: isInputFocused
              ? '0 2px 8px rgba(66,133,244,0.3)'
              : '0 2px 4px rgba(0,0,0,0.1)',
            height: '56px'
          }}
        >
          {/* 搜索输入框 */}
          <div
            id="search-input"
            className="flex-1 px-4 py-3 text-lg bg-white h-[56px] flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* 占位符文字 */}
            {currentStep < 2 && (
              <span className="text-gray-400 whitespace-nowrap">百度一下，你就知道</span>
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

          {/* 搜索按钮 */}
          <button
            id="search-button"
            className="px-6 bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex-shrink-0 flex items-center justify-center"
            style={{ minWidth: '100px' }}
          >
            百度一下
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
