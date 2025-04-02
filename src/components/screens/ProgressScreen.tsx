
import React, { useState } from 'react';
import { useFitForge } from '@/context/FitForgeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { BarChart3, ArrowLeft, Dumbbell, MessageSquare, RefreshCw } from 'lucide-react';
import Logo from '@/components/Logo';
import ActionButton from '@/components/ActionButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ProgressScreen = () => {
  const { userProfile, progressData, motivationalQuote, refreshMotivationalQuote, navigateTo } = useFitForge();
  
  // For demo purposes, generate some fake progress data if none exists
  const lastMonth = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: new Date()
  });
  
  const demoProgressData = lastMonth.map((date) => {
    // Random workout completion (70% chance of completion)
    const workoutCompleted = Math.random() > 0.3;
    
    return {
      date,
      workoutCompleted,
      duration: workoutCompleted ? Math.floor(Math.random() * 30) + 30 : 0, // 30-60 min workouts
    };
  });
  
  // Use actual progress data if available, otherwise use demo data
  const chartData = progressData.length > 0 ? progressData : demoProgressData;
  
  // Calculate completion rate
  const completedWorkouts = chartData.filter(entry => entry.workoutCompleted).length;
  const completionRate = (completedWorkouts / chartData.length) * 100;
  
  const pieData = [
    { name: 'Completed', value: completedWorkouts },
    { name: 'Missed', value: chartData.length - completedWorkouts }
  ];
  
  const COLORS = ['#10B981', '#E5E7EB'];
  
  // Format data for the bar chart
  const last7Days = chartData.slice(-7).map(entry => ({
    date: format(new Date(entry.date), 'EEE'),
    duration: entry.duration || 0,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
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
            Progress Tracker
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="bg-gradient-to-r from-fitforge-blue/10 to-fitforge-purple/10 p-4 rounded-lg mb-6 flex justify-between items-center">
          <p className="italic">{motivationalQuote}</p>
          <button 
            onClick={refreshMotivationalQuote}
            className="text-fitforge-blue hover:text-blue-700"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workout Completion</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-3xl font-bold text-fitforge-green">
                  {completionRate.toFixed(0)}%
                </p>
                <p className="text-gray-500">Monthly Completion Rate</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workout Duration (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={last7Days}>
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.slice(-5).reverse().map((entry, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${entry.workoutCompleted ? 'bg-fitforge-green' : 'bg-gray-300'}`}></div>
                    <div>
                      <p className="font-medium">{format(new Date(entry.date), 'EEEE, MMMM d')}</p>
                      <p className="text-sm text-gray-500">
                        {entry.workoutCompleted ? `Workout completed (${entry.duration} mins)` : 'No workout recorded'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <footer className="border-t bg-white py-4 mt-auto">
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
            className="flex flex-col items-center text-fitforge-blue"
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

export default ProgressScreen;
