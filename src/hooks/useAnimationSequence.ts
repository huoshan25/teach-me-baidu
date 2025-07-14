'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useAnimationSequence(searchQuery: string) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // 等待DOM完全加载
    const startAnimation = () => {
      // 创建GSAP时间轴
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // 步骤1: 显示鼠标
      tl.call(() => {
        setCurrentStep(0);
        console.log('步骤1: 显示鼠标');
      })
      .set('#animated-cursor', {
        x: 100,
        y: 100,
        opacity: 0
      })
      .to('#animated-cursor', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      })

      // 步骤2: 移动到输入框
      .call(() => {
        setCurrentStep(1);
        console.log('步骤2: 移动到输入框');
      })
      .to('#animated-cursor', {
        x: () => {
          const input = document.getElementById('search-input');
          if (input) {
            const rect = input.getBoundingClientRect();
            return rect.left + rect.width / 2;
          }
          return window.innerWidth / 2;
        },
        y: () => {
          const input = document.getElementById('search-input');
          if (input) {
            const rect = input.getBoundingClientRect();
            return rect.top + rect.height / 2;
          }
          return window.innerHeight / 2;
        },
        duration: 2.5,
        ease: 'power2.inOut'
      })

      // 步骤3: 点击输入框
      .call(() => {
        setCurrentStep(2);
        console.log('步骤3: 点击输入框');
      })
      .to('#animated-cursor', {
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.out'
      })
      .to('#animated-cursor', {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out'
      })
      .to('#search-input', {
        borderColor: '#4285f4',
        boxShadow: '0 2px 8px rgba(66,133,244,0.3)',
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.2')

      // 步骤4: 打字动画
      .call(() => {
        setCurrentStep(3);
        setIsTyping(true);
        console.log('步骤4: 开始打字');
      })
      .to({}, {
        duration: searchQuery.length * 0.15 + 1, // 根据文字长度动态调整时间
        ease: 'none'
      })

      // 步骤5: 移动到按钮
      .call(() => {
        setCurrentStep(4);
        setIsTyping(false);
        console.log('步骤5: 移动到按钮');
      })
      .to('#animated-cursor', {
        x: () => {
          const button = document.getElementById('search-button');
          if (button) {
            const rect = button.getBoundingClientRect();
            return rect.left + rect.width / 2;
          }
          return window.innerWidth / 2 + 100;
        },
        y: () => {
          const button = document.getElementById('search-button');
          if (button) {
            const rect = button.getBoundingClientRect();
            return rect.top + rect.height / 2;
          }
          return window.innerHeight / 2 + 50;
        },
        duration: 2,
        ease: 'power2.inOut'
      })

      // 步骤6: 点击按钮
      .call(() => {
        setCurrentStep(5);
        console.log('步骤6: 点击按钮');
      })
      .to('#animated-cursor', {
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.out'
      })
      .to('#search-button', {
        backgroundColor: '#f1f3f4',
        scale: 0.98,
        duration: 0.15,
        ease: 'power2.out'
      }, '-=0.15')
      .to('#animated-cursor', {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out'
      })
      .to('#search-button', {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out'
      }, '-=0.15')

      // 步骤7: 跳转
      .call(() => {
        setCurrentStep(6);
        console.log('步骤7: 准备跳转');
      })
      .to('#animated-cursor', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
      .call(() => {
        console.log('跳转到百度搜索');
        window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(searchQuery)}`;
      });
    };

    // 延迟启动动画，确保DOM已渲染
    const timer = setTimeout(startAnimation, 1500);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [searchQuery]);

  return {
    currentStep,
    isTyping
  };
}
