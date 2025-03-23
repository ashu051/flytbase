
import { useState } from 'react';
import { reports } from '@/data/mockData';
import ReportCard from '@/components/reports/ReportCard';
import SurveyChart from '@/components/reports/SurveyChart';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const surveyTypes = [
    { name: 'Perimeter', value: 12 },
    { name: 'Grid', value: 8 },
    { name: 'Crosshatch', value: 5 },
    { name: 'Custom', value: 3 }
  ];
  
  const monthlySurveys = [
    { name: 'Jan', value: 4 },
    { name: 'Feb', value: 6 },
    { name: 'Mar', value: 8 },
    { name: 'Apr', value: 5 },
    { name: 'May', value: 7 },
    { name: 'Jun', value: 9 }
  ];
  
  const surveyFindings = [
    { name: 'No issues', value: 18 },
    { name: 'Minor issues', value: 7 },
    { name: 'Major issues', value: 3 }
  ];
  
  return (
    <div className="page-container">
      <h1 className="page-header">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SurveyChart
          type="bar"
          title="Monthly Surveys"
          data={monthlySurveys}
        />
        
        <SurveyChart
          type="pie"
          title="Survey Types"
          data={surveyTypes}
        />
        
        <SurveyChart
          type="pie"
          title="Survey Findings"
          data={surveyFindings}
        />
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-4">Survey Reports</h2>
        <div className="relative">
          <Search className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No reports match your search criteria.
          </div>
        ) : (
          filteredReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
