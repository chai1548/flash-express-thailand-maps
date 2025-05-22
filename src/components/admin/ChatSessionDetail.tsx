
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatSession } from "@/lib/chat";
import { cn } from "@/lib/utils";

interface ChatSessionDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: ChatSession | null;
  formatDate: (dateString: string) => string;
}

const ChatSessionDetail = ({
  open,
  onOpenChange,
  session,
  formatDate,
}: ChatSessionDetailProps) => {
  if (!session) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chat Session Details</DialogTitle>
          <DialogDescription>
            {session.packageId ? `Package ID: ${session.packageId}` : 'General Inquiry'} | 
            Started: {formatDate(session.createdAt)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {session.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[80%] rounded-lg p-3",
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
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSessionDetail;
