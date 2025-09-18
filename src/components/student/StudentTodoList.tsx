import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Plus, Calendar, Clock, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface TodoItem {
  id: number;
  task: string;
  dueDate: string;
  completed: boolean;
}

const mockTodos: TodoItem[] = [
  { id: 1, task: 'Submit Data Structures Assignment', dueDate: '2024-03-15', completed: false },
  { id: 2, task: 'Pay Library Fine', dueDate: '2024-03-12', completed: false },
  { id: 3, task: 'Prepare for Physics Exam', dueDate: '2024-03-20', completed: false },
  { id: 4, task: 'Return Database Book', dueDate: '2024-03-10', completed: true }
];

const StudentTodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>(mockTodos);
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const addTodo = () => {
    if (!newTask || !newDueDate) return;
    
    const todo: TodoItem = {
      id: Date.now(),
      task: newTask,
      dueDate: newDueDate,
      completed: false
    };
    
    setTodos([...todos, todo]);
    setNewTask('');
    setNewDueDate('');
    setShowForm(false);
    toast.success('Task added');
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Task deleted');
  };

  const getDaysLeft = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const pendingTodos = todos.filter(todo => !todo.completed);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-blue-700">
            <Calendar className="w-5 h-5 mr-2" />
            To-Do List & Reminders
          </CardTitle>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {showForm && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="space-y-3">
              <Input
                placeholder="Enter task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button onClick={addTodo} size="sm">Add</Button>
                <Button onClick={() => setShowForm(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Pending Tasks ({pendingTodos.length})</h3>
          {pendingTodos.map((todo) => {
            const daysLeft = getDaysLeft(todo.dueDate);
            return (
              <div key={todo.id} className="flex items-center space-x-3 p-3 bg-white border rounded-lg">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleComplete(todo.id)}
                />
                <div className="flex-1">
                  <p className="font-medium">{todo.task}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {todo.dueDate}
                    </div>
                    {daysLeft <= 2 && daysLeft >= 0 && (
                      <Badge className="bg-red-100 text-red-800">Due Soon</Badge>
                    )}
                    {daysLeft < 0 && (
                      <Badge className="bg-red-500 text-white">Overdue</Badge>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>

        {todos.filter(todo => todo.completed).length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-gray-900">Completed</h3>
            {todos.filter(todo => todo.completed).map((todo) => (
              <div key={todo.id} className="flex items-center space-x-3 p-3 bg-gray-50 border rounded-lg opacity-75">
                <Checkbox checked={true} onCheckedChange={() => toggleComplete(todo.id)} />
                <div className="flex-1">
                  <p className="font-medium line-through text-gray-600">{todo.task}</p>
                </div>
                <Button
                  onClick={() => deleteTodo(todo.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {todos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No tasks yet. Add your first task!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentTodoList;