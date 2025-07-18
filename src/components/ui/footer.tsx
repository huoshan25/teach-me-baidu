import Link from "next/link";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background/80 backdrop-blur-sm py-2 px-4">
      <div className="container flex items-center justify-between w-full mx-auto">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link 
            href="https://hs-blog.top/"
            target="_blank"
            rel="noopener noreferrer" 
            className="hover:text-foreground transition-colors"
          >
            火山博客
          </Link>
          <Link 
            href="https://github.com/huoshan25/smart-questions"
            target="_blank"
            rel="noopener noreferrer" 
            className="hover:text-foreground transition-colors"
          >
            提问的智慧
          </Link>
        </div>
        
        <div className="hidden md:block text-sm text-muted-foreground">
          © {new Date().getFullYear()} 帮伸手党百度
        </div>
      </div>
    </footer>
  );
}