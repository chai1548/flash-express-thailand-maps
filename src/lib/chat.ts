
// Chat utility types and functions

export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: string;
};

export type ChatSession = {
  id: string;
  messages: Message[];
  createdAt: string;
  packageId?: string; // Optional reference to a package tracking number
};

// In-memory store for chat sessions (would be replaced by database in production)
const chatSessions: Record<string, ChatSession> = {};

// Generate automated responses based on package tracking questions
export const generateAutoResponse = (message: string, packageId?: string): string => {
  const lowerCaseMessage = message.toLowerCase();
  
  // Common tracking questions and automated responses
  if (lowerCaseMessage.includes('where') && lowerCaseMessage.includes('package')) {
    return `Your package ${packageId ? `(${packageId})` : ''} is currently in transit. You can track its exact location on the tracking page.`;
  }
  
  if (lowerCaseMessage.includes('delay') || lowerCaseMessage.includes('late')) {
    return "We apologize for any delay. Packages may sometimes take longer due to weather, high volume, or other factors. If your package is significantly delayed, please contact customer support.";
  }
  
  if (lowerCaseMessage.includes('damaged') || lowerCaseMessage.includes('broken')) {
    return "We're sorry to hear that. Please take photos of the damaged item and packaging, then contact our customer support with your tracking number to file a claim.";
  }
  
  if (lowerCaseMessage.includes('deliver') && lowerCaseMessage.includes('time')) {
    return "Deliveries typically occur between 9 AM and 7 PM local time. For more specific delivery windows, please check your tracking details.";
  }
  
  if (lowerCaseMessage.includes('wrong address') || lowerCaseMessage.includes('incorrect address')) {
    return "If your package has an incorrect address, please contact our customer support immediately. If it hasn't been delivered yet, we may be able to redirect it.";
  }
  
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
    return "Hello! How can I assist you with your package today?";
  }
  
  // Default response
  return "Thank you for your message. For package-specific questions, please include your tracking number. For immediate assistance, please contact our customer support at 1-800-FLASH-EX.";
};

// Create a new chat session
export const createChatSession = (packageId?: string): ChatSession => {
  const sessionId = Math.random().toString(36).substring(2, 15);
  const timestamp = new Date().toISOString();
  
  // Initial welcome message
  const initialMessage: Message = {
    id: Math.random().toString(36).substring(2, 15),
    content: `Welcome to Flash Express support${packageId ? ` for package ${packageId}` : ''}. How can I assist you today?`,
    sender: 'system',
    timestamp
  };
  
  const newSession: ChatSession = {
    id: sessionId,
    messages: [initialMessage],
    createdAt: timestamp,
    packageId
  };
  
  chatSessions[sessionId] = newSession;
  return newSession;
};

// Get or create a chat session
export const getChatSession = (sessionId?: string, packageId?: string): ChatSession => {
  if (sessionId && chatSessions[sessionId]) {
    return chatSessions[sessionId];
  }
  
  return createChatSession(packageId);
};

// Add a user message and generate an automated response
export const addMessageAndGetResponse = (
  sessionId: string,
  messageContent: string
): { userMessage: Message; systemResponse: Message; session: ChatSession } => {
  const session = chatSessions[sessionId];
  if (!session) {
    throw new Error("Chat session not found");
  }
  
  const timestamp = new Date().toISOString();
  
  // Create user message
  const userMessage: Message = {
    id: Math.random().toString(36).substring(2, 15),
    content: messageContent,
    sender: 'user',
    timestamp
  };
  
  // Generate automated response
  const responseContent = generateAutoResponse(messageContent, session.packageId);
  const systemResponse: Message = {
    id: Math.random().toString(36).substring(2, 15),
    content: responseContent,
    sender: 'system',
    timestamp: new Date().toISOString() // Slight delay for realism
  };
  
  // Add messages to session
  session.messages.push(userMessage, systemResponse);
  
  return { userMessage, systemResponse, session };
};
