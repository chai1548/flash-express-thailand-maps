import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle, Search, Trash2, EyeIcon } from "lucide-react";
import { toast } from "sonner";
import { 
  ChatSession, 
  getAllChatSessions, 
  deleteChatSession, 
  searchChatSessions 
} from "@/lib/chat";
import { cn } from "@/lib/utils";

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
        <div className="flex gap-4 mb-6">
          <div className="flex flex-1 gap-2">
            <Input 
              placeholder="Search by package ID or message content..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <Button 
            variant="outline"
            onClick={loadSessions}
          >
            Reset
          </Button>
        </div>

        {sessions.length > 0 ? (
          <Table>
            <TableCaption>List of active chat sessions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Package ID</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    {session.packageId || "General Inquiry"}
                  </TableCell>
                  <TableCell>{formatDate(session.createdAt)}</TableCell>
                  <TableCell>{getMessageCount(session)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={isDialogOpen && selectedSession?.id === session.id} onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (!open) setSelectedSession(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedSession(session);
                            setIsDialogOpen(true);
                          }}
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Chat Session Details</DialogTitle>
                          <DialogDescription>
                            {session.packageId ? `Package ID: ${session.packageId}` : 'General Inquiry'} | 
                            Started: {formatDate(session.createdAt)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          {selectedSession?.messages.map((msg) => (
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
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSession(session.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No chat sessions found</p>
            {searchQuery && (
              <Button variant="outline" className="mt-4" onClick={loadSessions}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatManager;
