
import { useEffect, useRef, useState } from 'react';
import { Mission } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface MissionMapProps {
  mission?: Mission;
}

const MissionMap = ({ mission }: MissionMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getMissionColor = (type?: string) => {
    switch(type) {
      case 'perimeter':
        return '#3b82f6'; // blue
      case 'grid':
        return '#10b981'; // green
      case 'crosshatch':
        return '#8b5cf6'; // purple
      case 'custom':
        return '#f59e0b'; // amber
      default:
        return '#6b7280'; // gray
    }
  };

  const renderPath = () => {
    if (!mission) return null;

    const pathColor = getMissionColor(mission.type);
    
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute">
          <path
            d={mission.type === 'perimeter' ? 'M100,100 L300,100 L300,300 L100,300 Z' :
               mission.type === 'grid' ? 'M100,100 H300 M100,150 H300 M100,200 H300 M100,250 H300 M100,300 H300' :
               mission.type === 'crosshatch' ? 'M100,100 H300 M100,150 H300 M100,200 H300 M100,250 H300 M100,300 H300 M100,100 V300 M150,100 V300 M200,100 V300 M250,100 V300 M300,100 V300' :
               'M100,300 C150,200 200,300 250,150 S300,100 350,100'}
            stroke={pathColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={mission.progress < 100 ? "10,5" : "none"}
            strokeDashoffset="0"
            style={{
              strokeDashoffset: `calc(${mission.progress}% * -1)`,
              transition: 'stroke-dashoffset 1s ease'
            }}
          />
          
          {/* Waypoints */}
          {mission.waypoints.map((_, index) => {
            const x = mission.type === 'perimeter' ? 
              (index === 0 ? 100 : index === 1 ? 300 : index === 2 ? 300 : 100) :
              100 + (index * 50);
            const y = mission.type === 'perimeter' ? 
              (index === 0 ? 100 : index === 1 ? 100 : index === 2 ? 300 : 300) :
              100 + (index * 50);
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="5"
                fill={pathColor}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Drone position (placed at the appropriate progress point) */}
          {mission.status === 'in-progress' && (
            <circle
              cx={mission.type === 'perimeter' ? 
                  (mission.progress <= 25 ? 100 + (mission.progress * 8) : 
                   mission.progress <= 50 ? 300 : 
                   mission.progress <= 75 ? 300 : 
                   mission.progress <= 100 ? 100 + ((100 - mission.progress) * 8) : 100) : 
                  100 + (mission.progress * 2)}
              cy={mission.type === 'perimeter' ? 
                  (mission.progress <= 25 ? 100 : 
                   mission.progress <= 50 ? 100 + ((mission.progress - 25) * 8) : 
                   mission.progress <= 75 ? 300 : 
                   mission.progress <= 100 ? 300 - ((mission.progress - 75) * 8) : 300) : 
                  100 + (mission.progress * 2)}
              r="8"
              fill="#ef4444"
              stroke="white"
              strokeWidth="2"
              className="animate-pulse"
            />
          )}
        </svg>
      </div>
    );
  };

  return (
    <Card className="relative overflow-hidden h-full min-h-[400px] bg-gray-50 dark:bg-gray-900/20 border-none">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : !mission ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
          <MapPin className="h-10 w-10 mb-2" />
          <p>Select a mission to view its route</p>
        </div>
      ) : (
        <>
          <div 
            ref={mapRef} 
            className="absolute inset-0"
            style={{
              background: `url('/src/assets/map-pattern.svg') repeat`,
              opacity: 0.7
            }}
          />
          {renderPath()}
          <div className="absolute bottom-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-md shadow-sm text-xs">
            <div className="font-medium mb-1">{mission.location}</div>
            <div>
              <span className="text-muted-foreground">Altitude: </span>
              <span>{mission.altitude}m</span>
            </div>
            <div>
              <span className="text-muted-foreground">Type: </span>
              <span className="capitalize">{mission.type}</span>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default MissionMap;
