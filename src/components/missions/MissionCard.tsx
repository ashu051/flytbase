
import { Mission, getStatusColor, getStatusIcon } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard = ({ mission }: MissionCardProps) => {
  const StatusIcon = getStatusIcon(mission.status);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getTimeRemaining = (startTime: string, progress: number) => {
    if (progress === 100) return 'Completed';
    if (progress === 0) return 'Not started';
    
    const elapsedTime = Date.now() - new Date(startTime).getTime();
    const estimatedTotalTime = (elapsedTime * 100) / progress;
    const remainingTime = estimatedTotalTime - elapsedTime;
    
    const minutes = Math.floor(remainingTime / (1000 * 60));
    
    if (minutes < 60) {
      return `${minutes} min remaining`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m remaining`;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-5 h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium truncate flex-1">{mission.name}</h3>
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            mission.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            mission.status === 'completed' ? 'bg-green-100 text-green-800' :
            mission.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          )}>
            <StatusIcon className="h-3 w-3" />
            <span className="capitalize">{mission.status.replace('-', ' ')}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{mission.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatDate(mission.startTime)}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress</span>
            <span className="font-medium">{mission.progress}%</span>
          </div>
          <Progress value={mission.progress} className="h-2" />
          
          {mission.status === 'in-progress' && (
            <div className="text-xs text-muted-foreground text-right">
              {getTimeRemaining(mission.startTime, mission.progress)}
            </div>
          )}
        </div>
        
        <div className="mt-3 text-sm">
          <span className="font-medium">Type: </span>
          <span className="capitalize">{mission.type}</span>
          <div className="mt-1">
            <span className="font-medium">Altitude: </span>
            <span>{mission.altitude}m</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MissionCard;
