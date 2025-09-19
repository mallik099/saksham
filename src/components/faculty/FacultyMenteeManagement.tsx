import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Users, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

const FacultyMenteeManagement = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [newFeedback, setNewFeedback] = useState('');

  const mentees = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: 'CS2021001',
      branch: 'Computer Science',
      semester: 5,
      attendance: 85,
      marks: 78,
      backlogs: 0
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: 'CS2021002',
      branch: 'Computer Science',
      semester: 5,
      attendance: 92,
      marks: 85,
      backlogs: 1
    }
  ];

  const addGuidanceNote = () => {
    if (newNote.trim()) {
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  const addFeedback = () => {
    if (newFeedback.trim()) {
      console.log('Adding feedback:', newFeedback);
      setNewFeedback('');
    }
  };

  const scheduleMeeting = () => {
    console.log('Scheduling meeting for:', selectedStudent?.name);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Mentees ({mentees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mentees.map((student) => (
              <div 
                key={student.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedStudent?.id === student.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.rollNumber} • {student.branch}</p>
                    <p className="text-sm text-gray-500">Semester {student.semester}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex gap-2">
                      <Badge variant={student.attendance >= 75 ? "default" : "destructive"}>
                        {student.attendance}% Att.
                      </Badge>
                      <Badge variant={student.backlogs === 0 ? "default" : "destructive"}>
                        {student.backlogs} Backlogs
                      </Badge>
                    </div>
                    <p className="text-gray-600 mt-1">Marks: {student.marks}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Add Guidance Note
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter guidance note for the student..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <Button onClick={addGuidanceNote} className="w-full">
                Add Note
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter progress feedback..."
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
              />
              <Button onClick={addFeedback} className="w-full">
                Add Feedback
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Meeting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="datetime-local" />
              <Input placeholder="Meeting title" />
              <Button onClick={scheduleMeeting} className="w-full">
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Attendance:</span>
                  <Badge variant={selectedStudent.attendance >= 75 ? "default" : "destructive"}>
                    {selectedStudent.attendance}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Current Marks:</span>
                  <span>{selectedStudent.marks}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Backlogs:</span>
                  <Badge variant={selectedStudent.backlogs === 0 ? "default" : "destructive"}>
                    {selectedStudent.backlogs}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FacultyMenteeManagement;