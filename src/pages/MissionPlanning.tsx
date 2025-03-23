
import { useState } from 'react';
import { facilities, drones } from '@/data/mockData';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { CalendarIcon, MapPin, Save } from 'lucide-react';
import { format } from 'date-fns';
import PatternSelector from '@/components/missions/PatternSelector';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Slider } from '@/components/ui/slider';

const MissionPlanning = () => {
  const [missionName, setMissionName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDrone, setSelectedDrone] = useState('');
  const [selectedPattern, setSelectedPattern] = useState('perimeter');
  const [altitude, setAltitude] = useState([80]);
  const [speed, setSpeed] = useState([20]);
  const [overlap, setOverlap] = useState([60]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!missionName || !selectedDate || !selectedFacility || !selectedDrone) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    toast.success('Mission created successfully', {
      description: `${missionName} has been scheduled for ${format(selectedDate, 'PPP')} at ${selectedTime}`
    });
    
    setMissionName('');
    setDescription('');
    setSelectedDate(new Date());
    setSelectedTime('09:00');
    setSelectedFacility('');
    setSelectedDrone('');
  };
  
  const availableDrones = drones.filter(drone => drone.status === 'available');
  
  return (
    <div className="page-container">
      <h1 className="page-header">Mission Planning</h1>
      
      <Tabs defaultValue="new" className="w-full">
        <TabsList>
          <TabsTrigger value="new">New Mission</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the mission details and schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Mission Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Enter mission name" 
                          value={missionName}
                          onChange={(e) => setMissionName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Enter mission description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !selectedDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 pointer-events-auto">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input 
                            id="time" 
                            type="time" 
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="facility">Facility</Label>
                          <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select facility" />
                            </SelectTrigger>
                            <SelectContent>
                              {facilities.map((facility) => (
                                <SelectItem key={facility.id} value={facility.id}>
                                  {facility.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="drone">Drone</Label>
                          <Select value={selectedDrone} onValueChange={setSelectedDrone}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select drone" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDrones.map((drone) => (
                                <SelectItem key={drone.id} value={drone.id}>
                                  {drone.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Flight Path Pattern</CardTitle>
                  <CardDescription>
                    Select the flight pattern for this mission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PatternSelector 
                    selectedPattern={selectedPattern}
                    onChange={setSelectedPattern}
                  />
                  
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Flight Altitude</Label>
                        <span className="text-sm">{altitude[0]}m</span>
                      </div>
                      <Slider 
                        value={altitude} 
                        onValueChange={setAltitude} 
                        max={120}
                        min={20}
                        step={5}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Flight Speed</Label>
                        <span className="text-sm">{speed[0]} km/h</span>
                      </div>
                      <Slider 
                        value={speed} 
                        onValueChange={setSpeed} 
                        max={40}
                        min={5}
                        step={1}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Image Overlap</Label>
                        <span className="text-sm">{overlap[0]}%</span>
                      </div>
                      <Slider 
                        value={overlap} 
                        onValueChange={setOverlap} 
                        max={90}
                        min={30}
                        step={5}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mission Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Mission Name</div>
                        <div className="font-medium">{missionName || "Not specified"}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Date & Time</div>
                        <div className="font-medium">
                          {selectedDate ? format(selectedDate, 'PPP') : "Not specified"} at {selectedTime}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          {selectedFacility ? 
                            facilities.find(f => f.id === selectedFacility)?.name : 
                            "Not specified"
                          }
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Drone</div>
                        <div className="font-medium">
                          {selectedDrone ? 
                            drones.find(d => d.id === selectedDrone)?.name : 
                            "Not specified"
                          }
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Pattern</div>
                        <div className="font-medium capitalize">{selectedPattern}</div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="text-sm text-muted-foreground">Flight Parameters</div>
                        <ul className="list-disc list-inside mt-1 text-sm">
                          <li>Altitude: {altitude[0]}m</li>
                          <li>Speed: {speed[0]} km/h</li>
                          <li>Overlap: {overlap[0]}%</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleSubmit}>
                      <Save className="mr-2 h-4 w-4" />
                      Save Mission
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Estimated Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Flight Time</span>
                        <span className="font-medium">~25 minutes</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Distance</span>
                        <span className="font-medium">~2.4 km</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Battery Usage</span>
                        <span className="font-medium">~40%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Image Count</span>
                        <span className="font-medium">~180 images</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-5">
              <h3 className="font-medium mb-2">Perimeter Inspection</h3>
              <p className="text-sm text-muted-foreground mb-4">Standard perimeter security inspection route.</p>
              <Button variant="outline" className="w-full">Load Template</Button>
            </Card>
            
            <Card className="p-5">
              <h3 className="font-medium mb-2">Roof Survey</h3>
              <p className="text-sm text-muted-foreground mb-4">Comprehensive grid pattern for roof inspections.</p>
              <Button variant="outline" className="w-full">Load Template</Button>
            </Card>
            
            <Card className="p-5">
              <h3 className="font-medium mb-2">Solar Panel Inspection</h3>
              <p className="text-sm text-muted-foreground mb-4">Specialized route for solar panel monitoring.</p>
              <Button variant="outline" className="w-full">Load Template</Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <div className="mt-6">
            <p className="text-center text-muted-foreground py-12">
              No scheduled missions. Create a new mission to see it here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MissionPlanning;
