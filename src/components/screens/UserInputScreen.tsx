
import React, { useState } from 'react';
import { useFitForge } from '@/context/FitForgeContext';
import { FitnessGoal } from '@/types';
import { generateWorkoutPlan } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import ActionButton from '@/components/ActionButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const UserInputScreen = () => {
  const { setUserProfile, setWorkouts, navigateTo } = useFitForge();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    fitnessGoal: '' as FitnessGoal,
  });
  
  const [errors, setErrors] = useState({
    name: false,
    age: false,
    weight: false,
    height: false,
    fitnessGoal: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleGoalChange = (value: string) => {
    setFormData(prev => ({ ...prev, fitnessGoal: value as FitnessGoal }));
    setErrors(prev => ({ ...prev, fitnessGoal: false }));
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      age: formData.age === '' || parseInt(formData.age) <= 0 || parseInt(formData.age) > 120,
      weight: formData.weight === '' || parseFloat(formData.weight) <= 0,
      height: formData.height === '' || parseFloat(formData.height) <= 0,
      fitnessGoal: formData.fitnessGoal === '',
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userProfile = {
        name: formData.name,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        fitnessGoal: formData.fitnessGoal,
      };
      
      setUserProfile(userProfile);
      
      // Generate workout plan
      const workoutPlan = await generateWorkoutPlan(userProfile);
      setWorkouts(workoutPlan);
      
      toast({
        title: "Success!",
        description: "Your personalized workout plan is ready!",
      });
      
      // Navigate to workout plan screen
      navigateTo('workoutPlan');
    } catch (error) {
      console.error('Error generating workout plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate your workout plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigateTo('welcome')}
            className="text-fitforge-blue hover:text-blue-700 flex items-center"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </button>
          
          <Logo size="sm" />
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-center mb-6">Tell Us About Yourself</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && <p className="text-red-500 text-sm">Valid age is required</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  placeholder="Weight in kg"
                  value={formData.weight}
                  onChange={handleChange}
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && <p className="text-red-500 text-sm">Valid weight required</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  step="0.1"
                  placeholder="Height in cm"
                  value={formData.height}
                  onChange={handleChange}
                  className={errors.height ? 'border-red-500' : ''}
                />
                {errors.height && <p className="text-red-500 text-sm">Valid height required</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fitnessGoal">Fitness Goal</Label>
              <Select
                onValueChange={handleGoalChange}
                value={formData.fitnessGoal}
              >
                <SelectTrigger className={errors.fitnessGoal ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select your fitness goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                  <SelectItem value="Muscle Gain">Muscle Gain</SelectItem>
                  <SelectItem value="Endurance">Endurance</SelectItem>
                  <SelectItem value="Flexibility">Flexibility</SelectItem>
                  <SelectItem value="General Fitness">General Fitness</SelectItem>
                </SelectContent>
              </Select>
              {errors.fitnessGoal && <p className="text-red-500 text-sm">Please select a fitness goal</p>}
            </div>
            
            <ActionButton
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Generate My Workout
            </ActionButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInputScreen;
