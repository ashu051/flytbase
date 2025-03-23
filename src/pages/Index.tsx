
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Radio } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-background to-secondary/40">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-primary"
          >
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6">
              <Radio className="h-10 w-10" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Drone Survey Management System
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-2xl text-xl text-muted-foreground"
          >
            Plan, manage, and monitor autonomous drone surveys across your global facilities, 
            streamlining inspections, security monitoring, and mapping operations.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 px-8">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/missions">
              <Button variant="outline" size="lg">
                Plan a Mission
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="glassmorphic-panel p-6">
              <h3 className="text-lg font-medium mb-2">Plan Missions</h3>
              <p className="text-muted-foreground">Create and schedule survey missions across multiple facilities.</p>
            </div>
            
            <div className="glassmorphic-panel p-6">
              <h3 className="text-lg font-medium mb-2">Manage Fleet</h3>
              <p className="text-muted-foreground">Monitor your drone inventory, status, and vital statistics.</p>
            </div>
            
            <div className="glassmorphic-panel p-6">
              <h3 className="text-lg font-medium mb-2">Track Progress</h3>
              <p className="text-muted-foreground">Visualize real-time drone flight paths and mission progress.</p>
            </div>
            
            <div className="glassmorphic-panel p-6">
              <h3 className="text-lg font-medium mb-2">Generate Reports</h3>
              <p className="text-muted-foreground">Access comprehensive survey summaries and statistics.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
