import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Bot, User, Settings } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef, useState } from 'react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [catUrl, setCatUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isUser) {
      const storedCat = typeof window !== 'undefined' ? sessionStorage.getItem('userCatAvatar') : null;
      if (storedCat) {
        setCatUrl(storedCat);
      } else {
        fetch('https://cataas.com/cat?width=64&height=64&json=true')
          .then(res => res.json())
          .then(data => {
            setCatUrl(data.url);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('userCatAvatar', data.url);
            }
          })
          .catch(() => setCatUrl(null));
      }
    }
  }, [isUser]);

  return (
    <div className={cn(
      "flex items-start gap-2",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
      )}
      
      <div className={cn(
        "chat-bubble",
        isUser ? "chat-bubble-user" : "chat-bubble-assistant"
      )}>
        <div className="prose dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
          {catUrl ? (
            <img
              src={catUrl}
              alt="User Cat Avatar"
              className="w-8 h-8 object-cover rounded-full"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </div>
      )}
    </div>
  );
}

export function ChatLoader({ className }: { className?: string }) {
  const gearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gear = gearRef.current;
    if (!gear) return;
    let rotation = 0;
    let animationId: number;
    const rotateGear = () => {
      rotation += 2;
      if (gear) {
        gear.style.transform = `rotate(${rotation}deg)`;
      }
      animationId = requestAnimationFrame(rotateGear);
    };
    rotateGear();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className={cn('flex flex-col items-center justify-center py-8', className)}>
      <div className="relative flex items-center justify-center mb-4">
        <div
          ref={gearRef}
          className="w-12 h-12 text-primary drop-shadow-lg"
          style={{ transition: 'transform 0.1s linear' }}
        >
          <Settings className="w-full h-full" />
        </div>
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-semibold tracking-wide">
        </span>
      </div>
      <div className="flex space-x-1 mt-2">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
      </div>
    </div>
  );
}