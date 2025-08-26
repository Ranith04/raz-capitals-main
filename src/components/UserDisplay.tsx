'use client';

import UserName from './UserName';

interface UserDisplayProps {
  showGreeting?: boolean;
  className?: string;
  fallback?: string;
  variant?: 'header' | 'title' | 'simple';
}

export default function UserDisplay({ 
  showGreeting = false, 
  className = '', 
  fallback = 'User',
  variant = 'simple'
}: UserDisplayProps) {
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'header':
        return 'text-lg sm:text-xl font-medium text-white';
      case 'title':
        return 'text-xl font-medium text-white';
      default:
        return 'text-lg sm:text-xl font-medium text-white';
    }
  };

  const combinedClasses = `${getVariantClasses()} ${className}`.trim();

  if (showGreeting) {
    return (
      <span className={combinedClasses}>
        Welcome, <UserName fallback={fallback} />
      </span>
    );
  }

  return (
    <span className={combinedClasses}>
      <UserName fallback={fallback} />
    </span>
  );
}
