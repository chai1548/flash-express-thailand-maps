
import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatEmptyStateProps {
  searchQuery: string;
  onReset: () => void;
}

const ChatEmptyState = ({ searchQuery, onReset }: ChatEmptyStateProps) => {
  return (
    <div className="text-center py-10">
      <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">No chat sessions found</p>
      {searchQuery && (
        <Button variant="outline" className="mt-4" onClick={onReset}>
          Clear Search
        </Button>
      )}
    </div>
  );
};

export default ChatEmptyState;
