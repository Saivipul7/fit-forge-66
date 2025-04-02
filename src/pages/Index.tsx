
import React from 'react';
import { useFitForge } from '@/context/FitForgeContext';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import UserInputScreen from '@/components/screens/UserInputScreen';
import WorkoutPlanScreen from '@/components/screens/WorkoutPlanScreen';
import ChatScreen from '@/components/screens/ChatScreen';
import ProgressScreen from '@/components/screens/ProgressScreen';

const Index = () => {
  const { currentScreen } = useFitForge();

  // Render appropriate screen based on current navigation state
  switch (currentScreen) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'userInput':
      return <UserInputScreen />;
    case 'workoutPlan':
      return <WorkoutPlanScreen />;
    case 'chat':
      return <ChatScreen />;
    case 'progress':
      return <ProgressScreen />;
    default:
      return <WelcomeScreen />;
  }
};

export default Index;
