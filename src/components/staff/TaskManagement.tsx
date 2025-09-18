import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  task: string;
  assignedBy: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

const TaskManagement: React.FC = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      task: 'Process fee receipts for March',
      assignedBy: 'Admin Officer',
      deadline: 'Today 5 PM',
      status: 'pending',
      priority: 'high',
      description: 'Process all pending fee receipts and update student records'
    },
    {
      id: '2',
      task: 'Update student database records',
      assignedBy: 'Principal',
      deadline: 'Tomorrow',
      status: 'in-progress',
      priority: 'medium',
      description: 'Update contact information and academic records'
    },
    {
      id: '3',
      task: 'Prepare monthly attendance report',
      assignedBy: 'HOD',
      deadline: '3 days',
      status: 'pending',
      priority: 'low',
      description: 'Compile attendance data for all departments'
    }
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [progressUpdate, setProgressUpdate] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Task Management</h3>
        <Button className="bg-[#b1f2ff] text-black hover:bg-[#9ee8f5]">
          <Plus className="w-4 h-4 mr-2" />
          Add Progress Update
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedTask?.id === task.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.task}</h4>
                        <p className="text-sm text-gray-600 mt-1">Assigned by: {task.assignedBy}</p>
                        <p className="text-xs text-gray-500 mt-1">Due: {task.deadline}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(task.status)}
                            <span>{task.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1"
                      >
                        View Details
                      </Button>
                      {task.status !== 'completed' && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Details & Progress */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTask ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedTask.task}</h4>
                    <p className="text-sm text-gray-600 mt-2">{selectedTask.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Assigned by:</span>
                      <span className="text-sm font-medium">{selectedTask.assignedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Deadline:</span>
                      <span className="text-sm font-medium">{selectedTask.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Priority:</span>
                      <Badge className={getPriorityColor(selectedTask.priority)}>
                        {selectedTask.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge className={getStatusColor(selectedTask.status)}>
                        {selectedTask.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Add Progress Update</label>
                    <Textarea 
                      placeholder="Enter progress update or remarks..."
                      value={progressUpdate}
                      onChange={(e) => setProgressUpdate(e.target.value)}
                    />
                    <Button className="w-full">
                      Submit Update
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Select a task to view details
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Tasks</span>
                  <span className="font-medium">{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-medium text-green-600">
                    {tasks.filter(t => t.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="font-medium text-blue-600">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-medium text-orange-600">
                    {tasks.filter(t => t.status === 'pending').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;