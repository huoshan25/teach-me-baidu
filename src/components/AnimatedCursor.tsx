'use client';

export function AnimatedCursor() {
  return (
    <div
      id="animated-cursor"
      className="fixed pointer-events-none z-50 opacity-0"
      style={{
        width: 20,
        height: 20,
        left: 0,
        top: 0,
      }}
    >
      {/* Windows默认鼠标指针SVG */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 鼠标指针阴影 */}
        <path
          d="M3 2L3 16L7 12L10 18L12 17L9 11L15 11L3 2Z"
          fill="rgba(0,0,0,0.3)"
          transform="translate(1,1)"
        />
        {/* 鼠标指针主体 */}
        <path
          d="M2 1L2 15L6 11L9 17L11 16L8 10L14 10L2 1Z"
          fill="white"
          stroke="black"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
