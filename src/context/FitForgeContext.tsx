
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Workout, ChatMessage, ProgressEntry, FitnessGoal } from '@/types';

interface FitForgeContextType {
  userProfile: UserProfile | null;
  workouts: Workout[];
  chatHistory: ChatMessage[];
  progressData: ProgressEntry[];
  currentScreen: string;
  setUserProfile: (profile: UserProfile) => void;
  setWorkouts: (workouts: Workout[]) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  addProgressEntry: (entry: Omit<ProgressEntry, 'id'>) => void;
  navigateTo: (screen: string) => void;
  motivationalQuote: string;
  refreshMotivationalQuote: () => void;
}

const FitForgeContext = createContext<FitForgeContextType | undefined>(undefined);

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind that you have to convince.",
  "You don't have to be great to start, but you have to start to be great.",
  "The difference between try and triumph is just a little umph!",
  "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
  "The hardest lift of all is lifting your butt off the couch.",
  "Success isn't always about greatness. It's about consistency.",
  "The only place where success comes before work is in the dictionary.",
  "Don't wish for it, work for it.",
  "Your health is an investment, not an expense."
];

export const FitForgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [motivationalQuote, setMotivationalQuote] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('fitforge-profile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
      setCurrentScreen('workoutPlan');
    }

    const storedWorkouts = localStorage.getItem('fitforge-workouts');
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    }

    const storedChat = localStorage.getItem('fitforge-chat');
    if (storedChat) {
      setChatHistory(JSON.parse(storedChat));
    }

    const storedProgress = localStorage.getItem('fitforge-progress');
    if (storedProgress) {
      setProgressData(JSON.parse(storedProgress));
    }

    refreshMotivationalQuote();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('fitforge-profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem('fitforge-workouts', JSON.stringify(workouts));
    }
  }, [workouts]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('fitforge-chat', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  useEffect(() => {
    if (progressData.length > 0) {
      localStorage.setItem('fitforge-progress', JSON.stringify(progressData));
    }
  }, [progressData]);

  const refreshMotivationalQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setMotivationalQuote(motivationalQuotes[randomIndex]);
  };

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setChatHistory((prev) => [...prev, newMessage]);
  };

  const addProgressEntry = (entry: Omit<ProgressEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setProgressData((prev) => [...prev, newEntry]);
  };

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <FitForgeContext.Provider
      value={{
        userProfile,
        workouts,
        chatHistory,
        progressData,
        currentScreen,
        setUserProfile,
        setWorkouts,
        addChatMessage,
        addProgressEntry,
        navigateTo,
        motivationalQuote,
        refreshMotivationalQuote,
      }}
    >
      {children}
    </FitForgeContext.Provider>
  );
};

export const useFitForge = () => {
  const context = useContext(FitForgeContext);
  if (context === undefined) {
    throw new Error('useFitForge must be used within a FitForgeProvider');
  }
  return context;
};
