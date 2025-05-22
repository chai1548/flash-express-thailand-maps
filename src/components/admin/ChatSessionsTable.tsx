
import React from "react";
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
import { Badge } from "@/components/ui/badge";
import { EyeIcon, Trash2 } from "lucide-react";
import { ChatSession } from "@/lib/chat";

interface ChatSessionsTableProps {
  sessions: ChatSession[];
  onViewSession: (session: ChatSession) => void;
  onDeleteSession: (sessionId: string) => void;
  formatDate: (dateString: string) => string;
  getMessageCount: (session: ChatSession) => number;
}

const ChatSessionsTable = ({
  sessions,
  onViewSession,
  onDeleteSession,
  formatDate,
  getMessageCount,
}: ChatSessionsTableProps) => {
  return (
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewSession(session)}
              >
                <EyeIcon className="h-4 w-4 mr-1" />
                View
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteSession(session.id)}
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
  );
};

export default ChatSessionsTable;
