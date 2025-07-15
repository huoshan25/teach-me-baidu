'use client';

import { useUrlParams } from '@/hooks/useUrlParams';
import { useAnimationSequence } from '@/hooks/useAnimationSequence';
import { BaiduInterface } from '@/components/BaiduInterface';
import { AnimatedCursor } from '@/components/AnimatedCursor';
import Link from 'next/link';

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
      {/* 百度界面 */}
      <BaiduInterface
        searchQuery={searchQuery}
        currentStep={currentStep}
        isTyping={isTyping}
        currentStepText={currentStep >= 0 ? steps[currentStep] : ''}
      />

      {/* 动画鼠标 */}
      <AnimatedCursor />

      {/* 返回首页提示 */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-colors text-sm"
        >
          停停停！我是自己人，我要生成链接
        </Link>
      </div>
    </div>
  );
}
