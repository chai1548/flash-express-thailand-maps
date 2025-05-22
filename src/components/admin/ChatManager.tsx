
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { 
  ChatSession, 
  getAllChatSessions, 
  deleteChatSession, 
  searchChatSessions 
} from "@/lib/chat";
import ChatSessionsTable from "./ChatSessionsTable";
import ChatSessionDetail from "./ChatSessionDetail";
import ChatSearchBar from "./ChatSearchBar";
import ChatEmptyState from "./ChatEmptyState";

const ChatManager = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load all chat sessions
  const loadSessions = () => {
    const allSessions = getAllChatSessions();
    setSessions(allSessions);
  };

  // Initial load
  useEffect(() => {
    loadSessions();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      loadSessions();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle session deletion
  const handleDeleteSession = (sessionId: string) => {
    if (window.confirm("Are you sure you want to delete this chat session?")) {
      const success = deleteChatSession(sessionId);
      if (success) {
        toast.success("Chat session deleted successfully");
        loadSessions();
      } else {
        toast.error("Failed to delete chat session");
      }
    }
  };

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      loadSessions();
      return;
    }
    
    const results = searchChatSessions(searchQuery);
    setSessions(results);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get message count for a session
  const getMessageCount = (session: ChatSession) => {
    return session.messages.filter(msg => msg.sender === 'user').length;
  };

  // Handle view session
  const handleViewSession = (session: ChatSession) => {
    setSelectedSession(session);
    setIsDialogOpen(true);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Chat Management
        </CardTitle>
        <CardDescription>
          View and manage customer chat sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChatSearchBar 
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
          onReset={loadSessions}
        />

        {sessions.length > 0 ? (
          <ChatSessionsTable 
            sessions={sessions}
            onViewSession={handleViewSession}
            onDeleteSession={handleDeleteSession}
            formatDate={formatDate}
            getMessageCount={getMessageCount}
          />
        ) : (
          <ChatEmptyState 
            searchQuery={searchQuery}
            onReset={loadSessions}
          />
        )}
        
        <ChatSessionDetail
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setSelectedSession(null);
          }}
          session={selectedSession}
          formatDate={formatDate}
        />
      </CardContent>
    </Card>
  );
};

export default ChatManager;
