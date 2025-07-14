'use client';

import Link from 'next/link';
import { useUrlParams } from '@/hooks/useUrlParams';
import { useAnimationSequence } from '@/hooks/useAnimationSequence';
import { BaiduInterface } from '@/components/BaiduInterface';
import { AnimatedCursor } from '@/components/AnimatedCursor';

export default function TeachPage() {
  const { searchQuery } = useUrlParams();
  const { currentStep, isTyping } = useAnimationSequence(searchQuery);

  const steps = [
    '让我来教你正确的打开方式',
    '找到输入框并选中',
    '点击搜索框',
    '输入搜索内容',
    '移动鼠标到搜索按钮',
    '点击搜索按钮...',
    '这就是你所谓的困难吗？'
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 返回首页按钮 */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          ← 返回首页
        </Link>
      </div>

      {/* 百度界面 */}
      <BaiduInterface
        searchQuery={searchQuery}
        currentStep={currentStep}
        isTyping={isTyping}
        currentStepText={currentStep >= 0 ? steps[currentStep] : ''}
        onAnimationComplete={() => {
          // 跳转逻辑已在useAnimationSequence中处理
        }}
      />

      {/* 动画鼠标 */}
      <AnimatedCursor />

      {/* 底部提示 */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
          正在教你如何使用百度搜索 &ldquo;{searchQuery}&rdquo;
        </div>
      </div>
    </div>
  );
}
