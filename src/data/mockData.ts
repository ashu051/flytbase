
import { 
  Clock, 
  CloudLightning, 
  CloudSun, 
  LocateFixed, 
  MapPinned, 
  Plane, 
  RefreshCcw, 
  Shield, 
  Waves 
} from 'lucide-react';

export interface Drone {
  id: string;
  name: string;
  model: string;
  status: 'available' | 'in-mission' | 'maintenance' | 'charging';
  batteryLevel: number;
  lastMaintenance: string;
  location: string;
  altitude?: number;
  speed?: number;
}

export interface Mission {
  id: string;
  name: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'aborted';
  type: 'perimeter' | 'grid' | 'crosshatch' | 'custom';
  location: string;
  droneId: string;
  startTime: string;
  endTime?: string;
  progress: number;
  altitude: number;
  waypoints: [number, number][];
  description: string;
}

export interface Report {
  id: string;
  missionId: string;
  title: string;
  date: string;
  duration: number;
  distance: number;
  coverage: number;
  findings: string[];
  imageCount: number;
}

export interface Activity {
  id: string;
  type: 'mission_started' | 'mission_completed' | 'mission_aborted' | 'drone_deployed' | 'drone_returned' | 'maintenance_alert';
  title: string;
  description: string;
  timestamp: string;
  relatedId?: string;
}

export interface FacilityLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  address: string;
  drones: number;
  missions: number;
}

export interface WeatherCondition {
  location: string;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'windy';
  temperature: number;
  windSpeed: number;
  icon: any;
}

export const drones: Drone[] = [
  {
    id: 'd1',
    name: 'Falcon Eye 1',
    model: 'DJI Matrice 300 RTK',
    status: 'available',
    batteryLevel: 92,
    lastMaintenance: '2023-10-15',
    location: 'North Campus Hangar'
  },
  {
    id: 'd2',
    name: 'Hawk 2',
    model: 'DJI Mavic 3 Enterprise',
    status: 'in-mission',
    batteryLevel: 68,
    lastMaintenance: '2023-10-10',
    location: 'East Perimeter',
    altitude: 120,
    speed: 35
  },
  {
    id: 'd3',
    name: 'Skyview 3',
    model: 'Autel EVO II Pro',
    status: 'charging',
    batteryLevel: 24,
    lastMaintenance: '2023-10-12',
    location: 'South Campus Hangar'
  },
  {
    id: 'd4',
    name: 'Scout 4',
    model: 'Skydio 2+',
    status: 'maintenance',
    batteryLevel: 100,
    lastMaintenance: '2023-10-20',
    location: 'Maintenance Bay 2'
  },
  {
    id: 'd5',
    name: 'Raptor 5',
    model: 'DJI Matrice 300 RTK',
    status: 'available',
    batteryLevel: 85,
    lastMaintenance: '2023-10-05',
    location: 'West Campus Hangar'
  }
];

export const missions: Mission[] = [
  {
    id: 'm1',
    name: 'North Perimeter Inspection',
    status: 'scheduled',
    type: 'perimeter',
    location: 'North Campus',
    droneId: 'd1',
    startTime: '2023-10-25T08:00:00',
    progress: 0,
    altitude: 80,
    waypoints: [[33.7, -117.8], [33.71, -117.81], [33.72, -117.82]],
    description: 'Regular perimeter inspection of north campus facilities'
  },
  {
    id: 'm2',
    name: 'East Building Survey',
    status: 'in-progress',
    type: 'grid',
    location: 'East Campus',
    droneId: 'd2',
    startTime: '2023-10-23T09:30:00',
    progress: 65,
    altitude: 120,
    waypoints: [[33.73, -117.83], [33.74, -117.84], [33.75, -117.85]],
    description: 'Comprehensive grid survey of east campus buildings'
  },
  {
    id: 'm3',
    name: 'South Solar Farm Inspection',
    status: 'completed',
    type: 'crosshatch',
    location: 'South Campus',
    droneId: 'd3',
    startTime: '2023-10-22T13:00:00',
    endTime: '2023-10-22T14:30:00',
    progress: 100,
    altitude: 100,
    waypoints: [[33.76, -117.86], [33.77, -117.87], [33.78, -117.88]],
    description: 'Detailed inspection of solar panel arrays using crosshatch pattern'
  },
  {
    id: 'm4',
    name: 'Construction Site Monitoring',
    status: 'aborted',
    type: 'custom',
    location: 'West Campus',
    droneId: 'd5',
    startTime: '2023-10-21T15:00:00',
    endTime: '2023-10-21T15:10:00',
    progress: 25,
    altitude: 60,
    waypoints: [[33.79, -117.89], [33.80, -117.90], [33.81, -117.91]],
    description: 'Weekly progress monitoring of construction site'
  },
  {
    id: 'm5',
    name: 'Roof Inspection - Admin Building',
    status: 'scheduled',
    type: 'grid',
    location: 'Central Campus',
    droneId: 'd1',
    startTime: '2023-10-26T10:30:00',
    progress: 0,
    altitude: 40,
    waypoints: [[33.82, -117.92], [33.83, -117.93], [33.84, -117.94]],
    description: 'Detailed roof inspection for maintenance planning'
  }
];

export const reports: Report[] = [
  {
    id: 'r1',
    missionId: 'm3',
    title: 'South Solar Farm Inspection Results',
    date: '2023-10-22',
    duration: 90,
    distance: 5.2,
    coverage: 98,
    findings: [
      'All solar panels operational',
      'Minor debris on east section panels',
      'No structural anomalies detected'
    ],
    imageCount: 248
  },
  {
    id: 'r2',
    missionId: 'm4',
    title: 'Construction Site Monitoring - Aborted',
    date: '2023-10-21',
    duration: 10,
    distance: 0.8,
    coverage: 25,
    findings: [
      'Mission aborted due to high winds',
      'Partial data collected for northwest sector'
    ],
    imageCount: 42
  }
];

export const activities: Activity[] = [
  {
    id: 'a1',
    type: 'mission_started',
    title: 'Mission Started',
    description: 'East Building Survey mission has started with Hawk 2',
    timestamp: '2023-10-23T09:30:00',
    relatedId: 'm2'
  },
  {
    id: 'a2',
    type: 'mission_completed',
    title: 'Mission Completed',
    description: 'South Solar Farm Inspection completed successfully',
    timestamp: '2023-10-22T14:30:00',
    relatedId: 'm3'
  },
  {
    id: 'a3',
    type: 'mission_aborted',
    title: 'Mission Aborted',
    description: 'Construction Site Monitoring aborted due to weather conditions',
    timestamp: '2023-10-21T15:10:00',
    relatedId: 'm4'
  },
  {
    id: 'a4',
    type: 'drone_returned',
    title: 'Drone Returned',
    description: 'Skyview 3 has returned to the South Campus Hangar',
    timestamp: '2023-10-22T14:35:00',
    relatedId: 'd3'
  },
  {
    id: 'a5',
    type: 'maintenance_alert',
    title: 'Maintenance Due',
    description: 'Raptor 5 is due for scheduled maintenance',
    timestamp: '2023-10-23T08:00:00',
    relatedId: 'd5'
  }
];

export const facilities: FacilityLocation[] = [
  {
    id: 'f1',
    name: 'North Campus',
    coordinates: [33.7, -117.8],
    address: '1234 North Science Dr, Irvine, CA 92617',
    drones: 2,
    missions: 5
  },
  {
    id: 'f2',
    name: 'East Campus',
    coordinates: [33.73, -117.83],
    address: '5678 East Innovation Blvd, Irvine, CA 92617',
    drones: 1,
    missions: 3
  },
  {
    id: 'f3',
    name: 'South Campus',
    coordinates: [33.76, -117.86],
    address: '9012 South Research Pkwy, Irvine, CA 92617',
    drones: 1,
    missions: 4
  },
  {
    id: 'f4',
    name: 'West Campus',
    coordinates: [33.79, -117.89],
    address: '3456 West Technology Cir, Irvine, CA 92617',
    drones: 1,
    missions: 2
  }
];

export const weatherConditions: WeatherCondition[] = [
  {
    location: 'North Campus',
    condition: 'sunny',
    temperature: 75,
    windSpeed: 5,
    icon: CloudSun
  },
  {
    location: 'East Campus',
    condition: 'cloudy',
    temperature: 72,
    windSpeed: 8,
    icon: CloudSun
  },
  {
    location: 'South Campus',
    condition: 'windy',
    temperature: 70,
    windSpeed: 15,
    icon: Waves
  },
  {
    location: 'West Campus',
    condition: 'stormy',
    temperature: 65,
    windSpeed: 20,
    icon: CloudLightning
  }
];

export const getStatusColor = (status: string) => {
  switch(status) {
    case 'available':
    case 'completed':
    case 'operational':
      return 'bg-green-500';
    case 'in-mission':
    case 'in-progress':
    case 'scheduled':
      return 'bg-blue-500';
    case 'charging':
      return 'bg-yellow-500';
    case 'maintenance':
    case 'aborted':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const getStatusIcon = (status: string) => {
  switch(status) {
    case 'available':
      return Shield;
    case 'in-mission':
    case 'in-progress':
      return Plane;
    case 'charging':
      return RefreshCcw;
    case 'maintenance':
      return Clock;
    case 'completed':
      return MapPinned;
    case 'scheduled':
      return Clock;
    case 'aborted':
      return LocateFixed;
    default:
      return LocateFixed;
  }
};

export const getDroneByID = (id: string): Drone | undefined => {
  return drones.find(drone => drone.id === id);
};

export const getMissionByID = (id: string): Mission | undefined => {
  return missions.find(mission => mission.id === id);
};

export const getMissionsByDroneID = (droneId: string): Mission[] => {
  return missions.filter(mission => mission.droneId === droneId);
};

export const getReportsByMissionID = (missionId: string): Report[] => {
  return reports.filter(report => report.missionId === missionId);
};
