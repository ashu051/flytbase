
import { Button } from '@/components/ui/button';
import { Mission } from '@/data/mockData';
import { AlertCircle, Pause, Play, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface MissionControlsProps {
  mission?: Mission;
  onUpdate?: (missionId: string, updates: Partial<Mission>) => void;
}

const MissionControls = ({ mission, onUpdate }: MissionControlsProps) => {
  if (!mission) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Select a mission to view control options
      </div>
    );
  }

  const handlePause = () => {
    if (onUpdate) {
      toast.success('Mission paused successfully');
      onUpdate(mission.id, { status: 'scheduled' as any });
    }
  };

  const handleResume = () => {
    if (onUpdate) {
      toast.success('Mission resumed successfully');
      onUpdate(mission.id, { status: 'in-progress' as any });
    }
  };

  const handleAbort = () => {
    if (onUpdate) {
      toast.success('Mission aborted successfully');
      onUpdate(mission.id, { status: 'aborted' as any, progress: mission.progress });
    }
  };

  return (
    <div className="p-5 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Mission Controls</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span>Status</span>
          <span className="capitalize font-medium">{mission.status.replace('-', ' ')}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">{mission.progress}%</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span>Altitude</span>
          <span className="font-medium">{mission.altitude}m</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span>Waypoints</span>
          <span className="font-medium">{mission.waypoints.length}</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        {mission.status === 'in-progress' ? (
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handlePause}
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>
        ) : mission.status === 'scheduled' ? (
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleResume}
          >
            <Play className="h-4 w-4" />
            Start
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            disabled
          >
            <Play className="h-4 w-4" />
            Resume
          </Button>
        )}
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center gap-2"
              disabled={mission.status === 'completed' || mission.status === 'aborted'}
            >
              <XCircle className="h-4 w-4" />
              Abort
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Abort Mission</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to abort this mission? This action cannot be undone,
                and the drone will return to its home location immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAbort}>
                <AlertCircle className="h-4 w-4 mr-2" />
                Abort Mission
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MissionControls;
