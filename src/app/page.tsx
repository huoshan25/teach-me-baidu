'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Typewriter } from '@/components/ui/typewriter';
import { FloatingElement } from '@/components/ui/floating-element';
import { Copy, ExternalLink, Sparkles } from 'lucide-react';

enum SearchEngine {
  Baidu = 'baidu',
  Google = 'google',
}

export default function Home() {
  const SEARCH_ENGINES = {
    [SearchEngine.Baidu]: {
      name: '百度',
      path: 'baidu'
    },
    [SearchEngine.Google]: {
      name: 'Google',
      path: 'google'
    }
  } as const;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState<SearchEngine>(SearchEngine.Baidu);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (!searchQuery.trim()) return;

    const baseUrl = window.location.origin;
    const encodedQuery = encodeURIComponent(searchQuery);
    const config = SEARCH_ENGINES[searchEngine];
    const link = `${baseUrl}/${config.path}?q=${encodedQuery}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast.success('链接已复制到剪贴板！', {
        description: `现在可以分享给需要学习${SEARCH_ENGINES[searchEngine].name}搜索的朋友了`,
        duration: 3000,
      });
    } catch (err) {
      console.error('复制失败:', err);
      toast.error('复制失败', {
        description: '请手动复制链接',
        duration: 3000,
      });
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/40 flex items-center justify-center p-4">
      <AnimatedCard className="w-full max-w-2xl shadow-2xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60" delay={200}>
        <CardHeader className="text-center space-y-4">
          <FloatingElement delay={500}>
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-200 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Image
                src="/favicon.svg"
                alt="Teach Me Baidu Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
          </FloatingElement>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            <Typewriter text="帮伸手党百度" delay={800} speed={150} />
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            <Typewriter text="生成一个教学链接，让别人学会如何使用百度搜索" delay={2000} speed={50} />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 搜索引擎选择 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">选择搜索引擎</Label>
            <div className="flex space-x-4">
              {Object.entries(SEARCH_ENGINES).map(([key, config]) => (
                <label key={key} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="searchEngine"
                    value={key}
                    checked={searchEngine === key}
                    onChange={(e) => setSearchEngine(e.target.value as SearchEngine)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">{config.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-query" className="text-sm font-medium">
              输入要搜索的内容
            </Label>
            <Input
              id="search-query"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`例如：如何使用${SEARCH_ENGINES[searchEngine].name}`}
              className="h-12 text-base"
              onKeyPress={(e) => e.key === 'Enter' && generateLink()}
            />
          </div>

          <Button
            onClick={generateLink}
            disabled={!searchQuery.trim()}
            className="w-full h-12 text-base font-medium bg-gradient-to-br from-blue-500 to-blue-600"
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            生成教学链接
          </Button>

          {/* 生成的链接 */}
          {generatedLink && (
            <AnimatedCard className="bg-muted/50 border-dashed" delay={300}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FloatingElement delay={100}>
                    <ExternalLink className="w-5 h-5" />
                  </FloatingElement>
                  生成的教学链接
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={generatedLink}
                    readOnly
                    className="flex-1 bg-background"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="secondary"
                    size="sm"
                    className="shrink-0 hover:scale-105 transition-transform"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    复制
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  分享这个链接给需要学习如何百度的朋友吧！
                </p>
              </CardContent>
            </AnimatedCard>
          )}
        </CardContent>
      </AnimatedCard>
    </div>
  );
}
