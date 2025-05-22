
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ChatSearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const ChatSearchBar = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onReset,
}: ChatSearchBarProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex flex-1 gap-2">
        <Input 
          placeholder="Search by package ID or message content..." 
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <Button onClick={onSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      <Button 
        variant="outline"
        onClick={onReset}
      >
        Reset
      </Button>
    </div>
  );
};

export default ChatSearchBar;
