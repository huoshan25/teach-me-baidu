'use client';

import { TypingAnimation } from './TypingAnimation';

interface BaiduInterfaceProps {
  searchQuery: string;
  currentStep: number;
  isTyping: boolean;
  currentStepText: string;
  onAnimationComplete: () => void;
}

export function BaiduInterface({ searchQuery, currentStep, isTyping, currentStepText, onAnimationComplete }: BaiduInterfaceProps) {
  const isInputFocused = currentStep >= 2; // 点击搜索框后

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* 百度Logo */}
      <div className="mb-8">
        <div className="text-6xl font-bold">
          <span className="text-blue-600">百</span>
          <span className="text-red-500">度</span>
        </div>
      </div>

      {/* 搜索框容器 */}
      <div className="w-full max-w-2xl mb-8">
        <div className="relative">
          {/* 搜索输入框 */}
          <input
            id="search-input"
            type="text"
            className="w-full px-4 py-3 text-lg border-2 rounded-lg bg-white focus:outline-none transition-all duration-200"
            style={{
              borderColor: isInputFocused ? '#4285f4' : '#ddd',
              boxShadow: isInputFocused
                ? '0 2px 8px rgba(66,133,244,0.3)'
                : '0 2px 4px rgba(0,0,0,0.1)'
            }}
            placeholder={currentStep < 2 ? '百度一下，你就知道' : ''}
            value={currentStep > 3 ? searchQuery : ''}
            readOnly
          />

          {/* 打字动画覆盖层 */}
          {isTyping && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <TypingAnimation
                text={searchQuery}
                isActive={isTyping}
                onComplete={() => {
                  console.log('打字动画完成');
                }}
              />
            </div>
          )}

          {/* 搜索图标 */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 步骤提示文字 */}
        {currentStepText && (
          <div className="text-center mt-4">
            <p className="text-gray-500 text-sm">{currentStepText}</p>
          </div>
        )}
      </div>

      {/* 搜索按钮 */}
      <div className="flex space-x-4">
        <button
          id="search-button"
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded border hover:bg-gray-200 transition-colors"
          onClick={() => {
            if (currentStep >= 5) {
              onAnimationComplete();
            }
          }}
        >
          百度一下
        </button>

        <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded border hover:bg-gray-200 transition-colors">
          手气不错
        </button>
      </div>

      {/* 底部链接 */}
      <div className="mt-16 text-sm text-gray-500 space-x-4">
        <a href="#" className="hover:underline">广告</a>
        <a href="#" className="hover:underline">商务</a>
        <a href="#" className="hover:underline">关于百度</a>
        <a href="#" className="hover:underline">About Baidu</a>
      </div>

      {/* 版权信息 */}
      <div className="mt-4 text-xs text-gray-400">
        ©2024 Baidu 使用百度前必读 意见反馈 京ICP证030173号
      </div>
    </div>
  );
}
