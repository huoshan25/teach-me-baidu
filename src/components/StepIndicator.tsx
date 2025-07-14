'use client';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  if (currentStep < 0) return null;

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border">
        <div className="flex items-center space-x-4">
          {/* 步骤编号 */}
          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold">
            {currentStep + 1}
          </div>

          {/* 步骤描述 */}
          <div className="text-gray-800 font-medium">
            {steps[currentStep] || '准备中...'}
          </div>

          {/* 进度条 */}
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
