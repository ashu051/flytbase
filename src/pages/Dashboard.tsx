
import { useState, useEffect } from 'react';
import { activities, drones, missions } from '@/data/mockData';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { Card } from '@/components/ui/card';
import { Plane, Radio, MapPin, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const totalDrones = drones.length;
  const availableDrones = drones.filter(d => d.status === 'available').length;
  const inMissionDrones = drones.filter(d => d.status === 'in-mission').length;
  
  const totalMissions = missions.length;
  const activeMissions = missions.filter(m => m.status === 'in-progress').length;
  const completedMissions = missions.filter(m => m.status === 'completed').length;
  
  const missionStatusData = [
    { name: 'Scheduled', value: missions.filter(m => m.status === 'scheduled').length },
    { name: 'In Progress', value: missions.filter(m => m.status === 'in-progress').length },
    { name: 'Completed', value: missions.filter(m => m.status === 'completed').length },
    { name: 'Aborted', value: missions.filter(m => m.status === 'aborted').length }
  ];
  
  const missionTypeData = [
    { name: 'Perimeter', value: missions.filter(m => m.type === 'perimeter').length },
    { name: 'Grid', value: missions.filter(m => m.type === 'grid').length },
    { name: 'Crosshatch', value: missions.filter(m => m.type === 'crosshatch').length },
    { name: 'Custom', value: missions.filter(m => m.type === 'custom').length }
  ];
  
  const weeklyMissionsData = [
    { name: 'Mon', value: 3 },
    { name: 'Tue', value: 5 },
    { name: 'Wed', value: 2 },
    { name: 'Thu', value: 7 },
    { name: 'Fri', value: 4 },
    { name: 'Sat', value: 1 },
    { name: 'Sun', value: 0 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="page-header">Dashboard</h1>
        <Button onClick={() => navigate('/missions')}>New Mission</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Drones" 
          value={totalDrones} 
          icon={Radio} 
          colorClass="bg-primary"
        />
        <StatCard 
          title="Available Drones" 
          value={availableDrones} 
          icon={Radio} 
          delta={12}
          colorClass="bg-green-500"
        />
        <StatCard 
          title="Active Missions" 
          value={activeMissions} 
          icon={Plane} 
          delta={-5}
          colorClass="bg-blue-500"
        />
        <StatCard 
          title="Completed Missions" 
          value={completedMissions} 
          icon={BarChart2} 
          delta={24}
          colorClass="bg-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="p-5 h-full">
            <h3 className="text-lg font-medium mb-4">Weekly Mission Activity</h3>
            <div className="h-64">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyMissionsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="p-5 h-full">
            <h3 className="text-lg font-medium mb-4">Mission Status</h3>
            <div className="h-64">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={missionStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {missionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} missions`, name]}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} />
        </div>
        
        <div>
          <Card className="p-5 h-full">
            <h3 className="text-lg font-medium mb-4">Mission Types</h3>
            <div className="h-64">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={missionTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {missionTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} missions`, name]}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
