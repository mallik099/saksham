import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { User, Users, CheckCircle } from 'lucide-react';

const StudentMentorSelection = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  const faculty = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      designation: 'Associate Professor',
      specialization: ['Data Structures', 'AI'],
      availableSlots: 3,
      totalSlots: 10
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      designation: 'Assistant Professor',
      specialization: ['Database', 'Web Dev'],
      availableSlots: 2,
      totalSlots: 8
    }
  ];

  return (
    <div className="space-y-6">
      {selectedMentor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Your Mentor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedMentor.name}</h3>
                <p className="text-sm text-gray-600">{selectedMentor.designation}</p>
                <div className="flex gap-1 mt-1">
                  {selectedMentor.specialization.map((spec, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{spec}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedMentor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Select Mentor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {faculty.map((f) => (
                <div key={f.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{f.name}</h3>
                    <p className="text-sm text-gray-600">{f.designation}</p>
                    <div className="flex gap-1 mt-1">
                      {f.specialization.map((spec, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{spec}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {f.availableSlots} slots available
                    </p>
                  </div>
                  <Button 
                    size="sm"
                    disabled={f.availableSlots === 0}
                    onClick={() => setSelectedMentor(f)}
                  >
                    {f.availableSlots === 0 ? 'Full' : 'Select'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentMentorSelection;