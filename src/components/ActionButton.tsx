
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const ActionButton = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  isLoading = false,
  icon,
  className,
  ...props
}: ActionButtonProps) => {
  const variantClasses = {
    primary: 'bg-fitforge-blue hover:bg-blue-600 text-white',
    secondary: 'bg-fitforge-green hover:bg-green-600 text-white',
    accent: 'bg-fitforge-purple hover:bg-purple-600 text-white',
    outline: 'bg-transparent border-2 border-fitforge-blue text-fitforge-blue hover:bg-blue-50',
    ghost: 'bg-transparent hover:bg-gray-100 text-fitforge-text',
  };

  const sizeClasses = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  return (
    <Button
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        'rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2',
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" />
      ) : icon ? (
        <>
          {icon}
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ActionButton;
