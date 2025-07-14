'use client';

import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!searchQuery.trim()) return;

    const baseUrl = window.location.origin;
    const encodedQuery = encodeURIComponent(searchQuery);
    const link = `${baseUrl}/teach?q=${encodedQuery}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      alert('链接已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 帮伸手党百度
          </h1>
          <p className="text-gray-600 text-lg">
            生成一个教学链接，让别人学会如何使用百度搜索
          </p>
        </div>

        {/* 输入区域 */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              输入要搜索的内容：
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="例如：如何使用百度"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onKeyPress={(e) => e.key === 'Enter' && generateLink()}
            />
          </div>

          <button
            onClick={generateLink}
            disabled={!searchQuery.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            生成教学链接
          </button>
        </div>

        {/* 生成的链接 */}
        {generatedLink && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              生成的教学链接：
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={generatedLink}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
              >
                复制
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              分享这个链接给需要学习如何百度的朋友吧！
            </p>
          </div>
        )}

        {/* 示例 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">💡 使用示例：</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <strong>输入：</strong>"如何煮鸡蛋"
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <strong>效果：</strong>生成教学动画链接
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
