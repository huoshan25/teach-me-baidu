'use client';

import { useState, useEffect } from 'react';

export function useUrlParams() {
  const [searchQuery, setSearchQuery] = useState('如何使用百度');
  
  useEffect(() => {
    // 确保在客户端运行
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q') || '如何使用百度';
      setSearchQuery(decodeURIComponent(query));
    }
  }, []);
  
  return { searchQuery };
}
