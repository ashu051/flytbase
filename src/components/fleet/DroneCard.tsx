
import { Drone, getStatusColor } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MapPin, AlertTriangle, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

interface DroneCardProps {
  drone: Drone;
}

const DroneCard = ({ drone }: DroneCardProps) => {
  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const needsMaintenance = () => {
    const lastMaintenance = new Date(drone.lastMaintenance);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastMaintenance.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 14;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-5 h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium text-lg">{drone.name}</h3>
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "h-2.5 w-2.5 rounded-full",
              getStatusColor(drone.status)
            )} />
            <span className="text-sm font-medium capitalize">{drone.status.replace('-', ' ')}</span>
          </div>
        </div>
        
        <div className="text-sm mb-4">
          <p className="text-muted-foreground">{drone.model}</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Battery</span>
            <div className="flex items-center">
              <Battery className={cn("h-4 w-4 mr-1", getBatteryColor(drone.batteryLevel))} />
              <span className={cn("font-medium", getBatteryColor(drone.batteryLevel))}>
                {drone.batteryLevel}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Location</span>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{drone.location}</span>
            </div>
          </div>
          
          {drone.status === 'in-mission' && drone.altitude && drone.speed && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm">Altitude</span>
                <span>{drone.altitude}m</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Speed</span>
                <span>{drone.speed} km/h</span>
              </div>
            </>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Last Maintenance</span>
            <span>{new Date(drone.lastMaintenance).toLocaleDateString()}</span>
          </div>
        </div>
        
        {needsMaintenance() && (
          <div className="mt-4 p-2 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 rounded flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-xs">Maintenance recommended</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default DroneCard;
