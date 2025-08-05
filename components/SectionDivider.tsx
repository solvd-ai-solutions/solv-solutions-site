interface SectionDividerProps {
  pattern?: 'diagonal' | 'triangles' | 'dots' | 'waves' | 'diamonds';
  color?: 'mint' | 'coral' | 'lavender';
}

export function SectionDivider({ 
  pattern = 'diagonal', 
  color = 'mint' 
}: SectionDividerProps) {
  
  const getColorValue = (colorName: string) => {
    switch (colorName) {
      case 'mint': return '#4FB3A6';
      case 'coral': return '#F29E8E';
      case 'lavender': return '#C5A3E0';
      default: return '#4FB3A6';
    }
  };

  const colorValue = getColorValue(color);

  const renderPattern = () => {
    switch (pattern) {
      case 'diagonal':
        return (
          <svg 
            width="100%" 
            height="40" 
            viewBox="0 0 400 40" 
            fill="none" 
            className="w-full h-10"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={i}
                x1={i * 20}
                y1="0"
                x2={i * 20 + 20}
                y2="40"
                stroke={colorValue}
                strokeWidth="2"
                opacity="0.6"
              />
            ))}
          </svg>
        );

      case 'triangles':
        return (
          <svg 
            width="100%" 
            height="40" 
            viewBox="0 0 400 40" 
            fill="none" 
            className="w-full h-10"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <polygon
                key={i}
                points={`${i * 40 + 20},8 ${i * 40 + 32},32 ${i * 40 + 8},32`}
                fill={colorValue}
                opacity="0.7"
              />
            ))}
          </svg>
        );

      case 'dots':
        return (
          <svg 
            width="100%" 
            height="40" 
            viewBox="0 0 400 40" 
            fill="none" 
            className="w-full h-10"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <circle
                key={i}
                cx={i * 20 + 10}
                cy="20"
                r="4"
                fill={colorValue}
                opacity="0.8"
              />
            ))}
          </svg>
        );

      case 'waves':
        return (
          <svg 
            width="100%" 
            height="40" 
            viewBox="0 0 400 40" 
            fill="none" 
            className="w-full h-10"
          >
            <path
              d="M0,20 Q100,8 200,20 T400,20"
              stroke={colorValue}
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M0,24 Q100,12 200,24 T400,24"
              stroke={colorValue}
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
          </svg>
        );

      case 'diamonds':
        return (
          <svg 
            width="100%" 
            height="40" 
            viewBox="0 0 400 40" 
            fill="none" 
            className="w-full h-10"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <polygon
                key={i}
                points={`${i * 50 + 25},8 ${i * 50 + 35},20 ${i * 50 + 25},32 ${i * 50 + 15},20`}
                fill={colorValue}
                opacity="0.6"
              />
            ))}
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center py-1">
      <div className="w-full max-w-2xl">
        {renderPattern()}
      </div>
    </div>
  );
}