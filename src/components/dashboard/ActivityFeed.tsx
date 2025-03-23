import { Activity } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'mission_started':
        return '🚀';
      case 'mission_completed':
        return '✅';
      case 'mission_aborted':
        return '❌';
      case 'drone_deployed':
        return '🛫';
      case 'drone_returned':
        return '🛬';
      case 'maintenance_alert':
        return '🔧';
      default:
        return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'mission_started':
      case 'drone_deployed':
        return 'border-l-blue-500';
      case 'mission_completed':
      case 'drone_returned':
        return 'border-l-green-500';
      case 'mission_aborted':
        return 'border-l-red-500';
      case 'maintenance_alert':
        return 'border-l-yellow-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
           ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "p-3 border-l-4 rounded-r-lg bg-white dark:bg-gray-800 shadow-sm",
              getActivityColor(activity.type)
            )}
          >
            <div className="flex items-start">
              <span className="text-lg mr-3">{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium">{activity.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityFeed;
