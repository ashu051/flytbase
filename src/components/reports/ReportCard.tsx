
import { Report } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { FileText, Clock, MapPin, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportCardProps {
  report: Report;
  onClick?: () => void;
}

const ReportCard = ({ report, onClick }: ReportCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="p-5 h-full">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium">{report.title}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(report.date).toLocaleDateString()}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span>{report.duration} min</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span>{report.distance} km</span>
          </div>
          
          <div className="flex items-center text-sm">
            <svg className="h-4 w-4 mr-1.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{report.coverage}% coverage</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Camera className="h-4 w-4 mr-1.5 text-muted-foreground" />
            <span>{report.imageCount} images</span>
          </div>
        </div>
        
        <div className="text-sm">
          <div className="font-medium mb-1">Key Findings:</div>
          <ul className="space-y-1 list-disc list-inside text-muted-foreground">
            {report.findings.slice(0, 2).map((finding, i) => (
              <li key={i} className="truncate">{finding}</li>
            ))}
            {report.findings.length > 2 && (
              <li className="text-primary">+{report.findings.length - 2} more findings</li>
            )}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
};

export default ReportCard;
