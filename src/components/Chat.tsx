
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Message, ChatSession, getChatSession, addMessageAndGetResponse } from "@/lib/chat";
import { useToast } from "@/hooks/use-toast";

type ChatProps = {
  packageId?: string;
  className?: string;
};

const Chat = ({ packageId, className }: ChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize chat session
  useEffect(() => {
    if (isOpen && !session) {
      const newSession = getChatSession(undefined, packageId);
      setSession(newSession);
    }
  }, [isOpen, session, packageId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [session?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !session) return;

    // Add user message and get auto-response
    try {
      setIsTyping(true);
      const { session: updatedSession } = addMessageAndGetResponse(session.id, message);
      setSession(updatedSession);
      setMessage("");
      
      // Simulate typing delay for system response
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsTyping(false);
    }
  };

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className={cn("fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg bg-flash-primary text-white hover:bg-flash-primary-dark", className)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] flex flex-col">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-flash-secondary" />
            Flash Express Support Chat
            {packageId && <span className="text-sm text-gray-500">({packageId})</span>}
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="flex-1 px-4 overflow-y-auto mb-2">
          {session?.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "mb-4 max-w-[80%] rounded-lg p-3",
                msg.sender === "user" 
                  ? "ml-auto bg-flash-primary text-white" 
                  : "mr-auto bg-gray-100 text-gray-900"
              )}
            >
              <div className="text-sm">{msg.content}</div>
              <div className={cn(
                "text-[10px] mt-1", 
                msg.sender === "user" ? "text-gray-200" : "text-gray-500"
              )}>
                {formatMessageTime(msg.timestamp)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mr-auto bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%] mb-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <DrawerFooter>
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!message.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-center text-gray-500 mt-2">
            This is an automated chat assistant. For complex issues, please contact customer support.
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Chat;
