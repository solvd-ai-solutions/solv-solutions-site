import React from 'react';

interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'mint' | 'coral' | 'lavender' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function OutlineButton({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: OutlineButtonProps) {
  const baseClasses = 'btn-base';
  
  const variantClasses = {
    primary: 'bg-white text-black outline-primary hover:outline-mint hover:bg-mint hover:text-white',
    mint: 'bg-mint text-white outline-mint hover:outline-black hover:bg-white hover:text-black',
    coral: 'bg-coral text-white outline-coral hover:outline-black hover:bg-white hover:text-black',
    lavender: 'bg-lavender text-white outline-lavender hover:outline-black hover:bg-white hover:text-black',
    white: 'bg-black text-white outline-white hover:outline-mint hover:bg-mint'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}