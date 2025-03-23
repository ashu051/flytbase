
import { useState } from 'react';
import { missions } from '@/data/mockData';
import MissionMap from '@/components/monitoring/MissionMap';
import MissionControls from '@/components/monitoring/MissionControls';
import { Card } from '@/components/ui/card';
import { Mission } from '@/data/mockData';
import { toast } from 'sonner';

const MissionMonitoring = () => {
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [localMissions, setLocalMissions] = useState(missions);
  
  const selectedMission = selectedMissionId ? 
    localMissions.find(m => m.id === selectedMissionId) : undefined;
  
  const handleMissionUpdate = (missionId: string, updates: Partial<Mission>) => {
    setLocalMissions(prev => 
      prev.map(mission => 
        mission.id === missionId ? { ...mission, ...updates } : mission
      )
    );
    toast.success(`Mission ${updates.status || ''} successfully updated`);
  };
  
  const handleMissionSelect = (missionId: string) => {
    setSelectedMissionId(missionId);
    toast.info("Mission selected for monitoring");
  };
  
  const activeMissions = localMissions.filter(m => 
    m.status === 'in-progress' || m.status === 'scheduled'
  );
  
  return (
    <div className="page-container">
      <h1 className="page-header">Mission Monitoring</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MissionMap mission={selectedMission} />
        </div>
        
        <div>
          <MissionControls 
            mission={selectedMission} 
            onUpdate={handleMissionUpdate} 
          />
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-4">Active Missions</h2>
        
        {activeMissions.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">
            No active missions at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeMissions.map((mission) => (
              <Card 
                key={mission.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedMissionId === mission.id ? 
                  'border-primary ring-1 ring-primary shadow-md' : 
                  'hover:border-primary/50 hover:shadow-sm'
                }`}
                onClick={() => handleMissionSelect(mission.id)}
                aria-selected={selectedMissionId === mission.id}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMissionSelect(mission.id);
                  }
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{mission.name}</h3>
                  <div className={`
                    flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium
                    ${mission.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}
                  `}>
                    <span className="capitalize">{mission.status.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {mission.location}
                </p>
                
                <div className="flex justify-between items-center text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{mission.progress}%</span>
                </div>
                
                <div className="w-full h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionMonitoring;
