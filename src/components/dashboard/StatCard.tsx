
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  delta?: number;
  colorClass?: string;
}

const StatCard = ({ title, value, icon: Icon, delta, colorClass = 'bg-primary' }: StatCardProps) => {
  return (
    <motion.div 
      className="subtle-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ translateY: -5 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {delta !== undefined && (
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-xs font-medium inline-flex items-center px-1.5 py-0.5 rounded",
                delta >= 0 ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
              )}>
                {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs. last month</span>
            </div>
          )}
        </div>
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center",
          colorClass
        )}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
