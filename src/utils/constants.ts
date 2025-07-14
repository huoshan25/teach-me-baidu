// 动画步骤配置
export const ANIMATION_STEPS = [
  { name: 'showCursor', duration: 1000 },    // 显示鼠标
  { name: 'moveToInput', duration: 2000 },   // 移动到输入框
  { name: 'clickInput', duration: 800 },     // 点击输入框
  { name: 'typeText', duration: 3000 },      // 打字动画
  { name: 'moveToButton', duration: 2000 },  // 移动到按钮
  { name: 'clickButton', duration: 800 },    // 点击按钮
  { name: 'redirect', duration: 1000 }       // 跳转
] as const;

// 响应式断点
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200
} as const;

// 动画配置
export const ANIMATION_CONFIG = {
  cursorSize: 24,
  clickScale: 0.8,
  typingSpeed: 100,
  easing: 'easeInOut'
} as const;
