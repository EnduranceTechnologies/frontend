import { cn } from '@/lib/utils';
import React, { useEffect, useState, ReactNode } from 'react';

type AnimationType = 'slide-from-right' | 'slide-from-left' | 'slide-from-bottom' | 'slide-from-top';

interface AnimatedInProps {
  type?: AnimationType;
  children: ReactNode;
  delay?: number;
  duration?: string;
  className?: string;
}

const AnimatedComponent: React.FC<AnimatedInProps> = ({ type = 'slide-from-left', children, delay = 0, duration = 'duration-700', className }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);


  const initialTransformClasses: Record<AnimationType, string> = {
    'slide-from-right': 'translate-x-full',
    'slide-from-left': '-translate-x-full',
    'slide-from-bottom': 'translate-y-full',
    'slide-from-top': '-translate-y-full',
  };

  const finalTransformClasses: Record<AnimationType, string> = {
    'slide-from-right': '-translate-x-0',
    'slide-from-left': 'translate-x-0',
    'slide-from-bottom': '-translate-y-0',
    'slide-from-top': 'translate-y-0',
  };

  return (
    <div
      className={cn(
        `opacity-0 ${initialTransformClasses[type]} transition-all ${duration} ease-out`,
        shouldAnimate && `opacity-100 ${finalTransformClasses[type]}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedComponent;