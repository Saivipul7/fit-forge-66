
import React, { useState, useRef, useEffect } from 'react';
import { useFitForge } from '@/context/FitForgeContext';
import { chatWithAI } from '@/services/api';
import ActionButton from '@/components/ActionButton';
import Logo from '@/components/Logo';
import { ArrowLeft, Send, Dumbbell, BarChart3, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBubble = ({ message, isUser, timestamp }: ChatBubbleProps) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[80%]`}>
        <Avatar className="w-8 h-8">
          <div className={`w-full h-full flex items-center justify-center ${isUser ? 'bg-fitforge-blue' : 'bg-fitforge-green'} text-white`}>
            {isUser ? 'You' : 'AI'}
          </div>
        </Avatar>
        
        <div 
          className={`rounded-2xl py-3 px-4 ${
            isUser 
              ? 'bg-fitforge-blue text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message}</p>
          <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatScreen = () => {
  const { userProfile, chatHistory, addChatMessage, navigateTo } = useFitForge();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);
    
    // Add user message to chat history
    addChatMessage({
      text: userMessage,
      sender: 'user',
    });
    
    try {
      // Get AI response
      const aiResponse = await chatWithAI(userMessage);
      
      // Add AI response to chat history
      addChatMessage({
        text: aiResponse.text,
        sender: 'ai',
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message to chat history
      addChatMessage({
        text: "Sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigateTo('workoutPlan')}
              className="mr-3 text-fitforge-text"
            >
              <ArrowLeft size={20} />
            </button>
            <Logo size="sm" />
          </div>
          <div className="text-lg font-semibold">
            AI Coach
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {chatHistory.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-fitforge-purple/10 text-fitforge-purple flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} />
              </div>
              <h2 className="text-xl font-semibold mb-2">Welcome to your AI Coach</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Ask any fitness or nutrition questions, get workout advice, or find motivation to reach your goals.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                <div 
                  className="bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setMessage("How can I improve my squat form?");
                  }}
                >
                  How can I improve my squat form?
                </div>
                <div 
                  className="bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setMessage("What should I eat before a workout?");
                  }}
                >
                  What should I eat before a workout?
                </div>
              </div>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <ChatBubble 
                key={chat.id}
                message={chat.text}
                isUser={chat.sender === 'user'}
                timestamp={chat.timestamp}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <Separator />
      
      <div className="p-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your AI coach..."
              className="flex-1"
              disabled={isLoading}
            />
            <ActionButton
              type="submit"
              variant={message.trim() ? 'primary' : 'outline'}
              icon={<Send size={18} />}
              disabled={!message.trim() || isLoading}
              isLoading={isLoading}
            >
              Send
            </ActionButton>
          </form>
        </div>
      </div>

      <footer className="border-t bg-white py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between">
          <button 
            onClick={() => navigateTo('workoutPlan')}
            className="flex flex-col items-center text-gray-500"
          >
            <Dumbbell size={20} />
            <span className="text-xs mt-1">Workouts</span>
          </button>
          
          <button 
            onClick={() => navigateTo('progress')}
            className="flex flex-col items-center text-gray-500"
          >
            <BarChart3 size={20} />
            <span className="text-xs mt-1">Progress</span>
          </button>
          
          <button 
            onClick={() => navigateTo('chat')}
            className="flex flex-col items-center text-fitforge-blue"
          >
            <MessageSquare size={20} />
            <span className="text-xs mt-1">AI Coach</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;
