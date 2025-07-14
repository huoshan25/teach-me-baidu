'use client';

export function AnimatedCursor() {
  return (
    <div
      id="animated-cursor"
      className="fixed pointer-events-none z-50 opacity-0"
      style={{
        width: 24,
        height: 24,
        left: 0,
        top: 0,
      }}
    >
      {/* 鼠标指针SVG */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 3.5L18.5 12L11.5 14L9.5 20.5L5.5 3.5Z"
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
