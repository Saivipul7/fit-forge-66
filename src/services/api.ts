
import { UserProfile, Workout, ChatMessage } from '@/types';

// Sample workout data for demo purposes
const sampleWorkouts: Workout[] = [
  {
    id: '1',
    title: 'Full Body Strength',
    exercises: [
      {
        id: '101',
        name: 'Squats',
        sets: 3,
        reps: 12,
        description: 'Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing.',
        imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        muscleGroup: 'Legs'
      },
      {
        id: '102',
        name: 'Push-ups',
        sets: 3,
        reps: 10,
        description: 'Start in a plank position with hands shoulder-width apart, lower your body until chest nearly touches the floor, then push back up.',
        imageUrl: 'https://images.unsplash.com/photo-1566241142559-40a9552895d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        muscleGroup: 'Chest'
      },
      {
        id: '103',
        name: 'Deadlifts',
        sets: 3,
        reps: 8,
        description: 'Stand with feet hip-width apart, bend at hips and knees to lower hands to shins, then return to standing while keeping back straight.',
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        muscleGroup: 'Back'
      }
    ],
    duration: 45,
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'HIIT Cardio Blast',
    exercises: [
      {
        id: '201',
        name: 'Jumping Jacks',
        sets: 3,
        reps: 30,
        description: 'Stand with feet together and hands at sides, then jump while raising arms and separating legs.',
        imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        muscleGroup: 'Full Body'
      },
      {
        id: '202',
        name: 'Burpees',
        sets: 3,
        reps: 15,
        description: 'Start standing, move into a squat position, kick feet back into a plank, return to squat, and jump up from squat position.',
        imageUrl: 'https://images.unsplash.com/photo-1593164842264-854604db2260?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        muscleGroup: 'Full Body'
      },
      {
        id: '203',
        name: 'Mountain Climbers',
        sets: 3,
        reps: 20,
        description: 'Start in a plank position and alternate bringing knees toward chest in a running motion.',
        imageUrl: 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        muscleGroup: 'Core'
      }
    ],
    duration: 30,
    difficulty: 'Intermediate'
  }
];

const aiResponses = {
  'weight loss': "For weight loss, focus on creating a calorie deficit through diet and exercise. Include cardio workouts and strength training to preserve muscle mass while losing fat. Stay consistent and be patient with your progress.",
  'muscle gain': "To build muscle, make sure you're in a slight calorie surplus and consuming enough protein. Focus on progressive overload in your strength training. Don't forget adequate recovery and sleep.",
  'workout': "Consistency is key for any workout plan. Start at a level that's challenging but manageable, and gradually increase intensity. Listen to your body and allow for proper recovery between sessions.",
  'nutrition': "A balanced diet should include proteins, complex carbohydrates, healthy fats, and plenty of fruits and vegetables. Hydration is also crucial for optimal performance and recovery.",
  'motivation': "Remember why you started. Set specific, measurable goals and track your progress. Find a workout buddy or community for accountability. Celebrate small victories along the way."
};

// Simulated API calls with timeouts to mimic network delays
export const generateWorkoutPlan = async (userProfile: UserProfile): Promise<Workout[]> => {
  // In a real app, this would make an API call to a backend with AI
  console.log('Generating workout plan for:', userProfile);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return sampleWorkouts;
};

export const chatWithAI = async (message: string): Promise<ChatMessage> => {
  console.log('Sending message to AI:', message);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple keyword matching for demo
  let response = "I'm your AI fitness coach. How can I help you today?";
  
  const lowercaseMessage = message.toLowerCase();
  
  for (const [keyword, reply] of Object.entries(aiResponses)) {
    if (lowercaseMessage.includes(keyword)) {
      response = reply;
      break;
    }
  }
  
  return {
    id: Date.now().toString(),
    text: response,
    sender: 'ai',
    timestamp: new Date()
  };
};

// In a real app, this would connect to a real API (like OpenAI's)
export const getOpenAIResponse = async (message: string, userProfile: UserProfile | null): Promise<string> => {
  console.log('Getting OpenAI response for:', message, 'Profile:', userProfile);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // This is where you'd make a call to OpenAI API in a real implementation
  // For demo, we'll use the same simple response system
  let response = "I'm your AI fitness coach. How can I help you today?";
  
  const lowercaseMessage = message.toLowerCase();
  
  for (const [keyword, reply] of Object.entries(aiResponses)) {
    if (lowercaseMessage.includes(keyword)) {
      response = reply;
      break;
    }
  }
  
  return response;
};
