
import React from 'react';
import { useFitForge } from '@/context/FitForgeContext';
import ActionButton from '@/components/ActionButton';
import Logo from '@/components/Logo';
import { Exercise, Workout } from '@/types';
import { Calendar, MessageSquare, BarChart3, Dumbbell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="flex flex-row">
        <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-lg">{exercise.name}</h3>
          <p className="text-gray-600 text-sm mb-2">
            {exercise.sets} sets × {exercise.reps} reps
          </p>
          <Badge variant="outline" className="bg-gray-100 text-fitforge-text">
            {exercise.muscleGroup}
          </Badge>
        </div>
      </div>
    </div>
  );
};

const WorkoutCard = ({ workout, onStartClick }: { workout: Workout; onStartClick: () => void }) => {
  return (
    <Card className="mb-6 overflow-hidden border-none shadow-md">
      <CardHeader className="bg-gradient-to-r from-fitforge-blue/10 to-fitforge-purple/10">
        <CardTitle className="text-xl font-bold">{workout.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="flex items-center">
              <Dumbbell size={14} className="mr-1" />
              {workout.difficulty}
            </span>
            <span>•</span>
            <span>{workout.duration} mins</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-1">
          {workout.exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <ActionButton onClick={onStartClick} fullWidth variant="primary">
          Start Workout
        </ActionButton>
      </CardFooter>
    </Card>
  );
};

const WorkoutPlanScreen = () => {
  const { userProfile, workouts, navigateTo, motivationalQuote } = useFitForge();
  const { toast } = useToast();

  const handleStartWorkout = (workoutId: string) => {
    // In a real app, this would navigate to a detailed workout screen
    toast({
      title: "Workout Started",
      description: "You've started the workout. Keep up the good work!",
    });
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Please complete your profile first</p>
          <ActionButton onClick={() => navigateTo('userInput')}>
            Go to Profile Setup
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium hidden md:inline-block">
              Hi, {userProfile.name}!
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">Your AI-Powered Workout Plan</h1>
          <div className="flex gap-2">
            <ActionButton
              variant="outline"
              size="sm"
              icon={<MessageSquare size={16} />}
              onClick={() => navigateTo('chat')}
            >
              Chat
            </ActionButton>
            <ActionButton
              variant="outline"
              size="sm"
              icon={<BarChart3 size={16} />}
              onClick={() => navigateTo('progress')}
            >
              Progress
            </ActionButton>
          </div>
        </div>

        <div className="bg-gradient-to-r from-fitforge-purple/20 to-fitforge-blue/20 p-4 rounded-lg mb-6">
          <p className="text-center italic">{motivationalQuote}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recommended Workouts</h2>
          <div className="space-y-4">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onStartClick={() => handleStartWorkout(workout.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t bg-white py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between">
          <button 
            onClick={() => navigateTo('workoutPlan')}
            className="flex flex-col items-center text-fitforge-blue"
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
            className="flex flex-col items-center text-gray-500"
          >
            <MessageSquare size={20} />
            <span className="text-xs mt-1">AI Coach</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default WorkoutPlanScreen;
