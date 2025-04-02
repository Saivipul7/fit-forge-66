
export type FitnessGoal = 'Weight Loss' | 'Muscle Gain' | 'Endurance' | 'Flexibility' | 'General Fitness';

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoal: FitnessGoal;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  description: string;
  imageUrl: string;
  muscleGroup: string;
}

export interface Workout {
  id: string;
  title: string;
  exercises: Exercise[];
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ProgressEntry {
  date: Date;
  workoutCompleted: boolean;
  workoutId?: string;
  duration?: number;
  notes?: string;
}
