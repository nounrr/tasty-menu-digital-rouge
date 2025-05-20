
import { FC } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center">
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100" className="fill-restaurant-red">
          <circle cx="50" cy="50" r="45" fill="#E63946" />
          <path 
            d="M30 35 Q50 20 70 35 Q85 50 70 65 Q50 80 30 65 Q15 50 30 35" 
            fill="#FFFFFF" 
          />
          <circle cx="50" cy="50" r="15" fill="#E63946" />
        </svg>
      </div>
      <div className="ml-2">
        <span className="font-bold text-xl sm:text-2xl font-montserrat text-restaurant-dark">
          Le Rouge
        </span>
        <div className="text-xs text-restaurant-red font-medium tracking-wider">
          CUISINE FRANÇAISE
        </div>
      </div>
    </div>
  );
};

export default Logo;
