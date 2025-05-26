import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
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
          {message.content}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}