
import { useState } from 'react';
import { drones } from '@/data/mockData';
import DroneCard from '@/components/fleet/DroneCard';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SlidersHorizontal, Plus } from 'lucide-react';

const FleetManagement = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredDrones = statusFilter === 'all' 
    ? drones 
    : drones.filter(drone => drone.status === statusFilter);
  
  return (
    <div className="page-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="page-header mb-0">Fleet Management</h1>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                <DropdownMenuRadioItem value="all">All Drones</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="available">Available</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="in-mission">In Mission</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="charging">Charging</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="maintenance">Maintenance</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>Add Drone</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrones.map((drone) => (
          <DroneCard key={drone.id} drone={drone} />
        ))}
      </div>
    </div>
  );
};

export default FleetManagement;
