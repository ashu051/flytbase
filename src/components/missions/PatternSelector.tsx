
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PatternSelectorProps {
  selectedPattern: string;
  onChange: (pattern: string) => void;
}

const PatternSelector = ({ selectedPattern, onChange }: PatternSelectorProps) => {
  const patterns = [
    {
      id: 'perimeter',
      name: 'Perimeter',
      description: 'Follows the boundary of the designated area',
      svg: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      )
    },
    {
      id: 'grid',
      name: 'Grid',
      description: 'Regular grid pattern for complete coverage',
      svg: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20H80M20 40H80M20 60H80M20 80H80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'crosshatch',
      name: 'Crosshatch',
      description: 'Dense coverage with perpendicular lines',
      svg: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20H80M20 40H80M20 60H80M20 80H80M20 20V80M40 20V80M60 20V80M80 20V80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'custom',
      name: 'Custom',
      description: 'Define your own flight path with waypoints',
      svg: (
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80L40 40L60 60L80 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="80" r="6" fill="currentColor" />
          <circle cx="40" cy="40" r="6" fill="currentColor" />
          <circle cx="60" cy="60" r="6" fill="currentColor" />
          <circle cx="80" cy="20" r="6" fill="currentColor" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {patterns.map((pattern) => (
        <Card
          key={pattern.id}
          className={cn(
            "p-4 cursor-pointer transition-all border-2 hover:border-primary",
            selectedPattern === pattern.id ? 'border-primary' : 'border-border'
          )}
          onClick={() => onChange(pattern.id)}
        >
          <div className="h-24 w-full flex items-center justify-center mb-2 relative">
            <div className={cn(
              "absolute inset-0 flex items-center justify-center text-primary transition-all",
              selectedPattern === pattern.id ? "opacity-80" : "opacity-40"
            )}>
              {pattern.svg}
            </div>
            {selectedPattern === pattern.id && (
              <div className="absolute top-0 right-0 bg-primary text-white rounded-full p-0.5">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
          <h3 className="font-medium">{pattern.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{pattern.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default PatternSelector;
