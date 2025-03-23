
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

const pieColors = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

interface SurveyChartProps {
  type: 'bar' | 'pie';
  title: string;
  data: any[];
}

const SurveyChart = ({ type, title, data }: SurveyChartProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <Card className="p-5">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-5">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" fontSize={12} tickMargin={10} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: 'none', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }} 
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SurveyChart;
