import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  User, Mail, Phone, GraduationCap, Users, 
  CheckCircle, Clock, MapPin, BookOpen, Calendar,
  Star, Award, ChevronRight
} from 'lucide-react';

interface Faculty {
  _id: string;
  name: string;
  designation: string;
  specialization: string[];
  mentorship: {
    maxCapacity: number;
    currentCount: number;
  };
  department: string;
  email: string;
  phone: string;
  rating: number;
  experience: number;
}

interface Class {
  _id: string;
  name: string;
  code: string;
  faculty: Faculty;
  schedule: {
    days: string[];
    time: string;
  };
  semester: number;
  credits: number;
  capacity: number;
  enrolled: number;
  description: string;
}

const StudentMentorshipAndClasses = () => {
  const [availableFaculty, setAvailableFaculty] = useState<Faculty[]>([]);
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);
  const [currentMentor, setCurrentMentor] = useState<Faculty | null>(null);
  const [enrolledClasses, setEnrolledClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('mentorship');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mock faculty data
      const mockFaculty: Faculty[] = [
        {
          _id: '1',
          name: 'Dr. Sarah Johnson',
          designation: 'Associate Professor',
          specialization: ['Data Structures', 'Algorithms', 'Machine Learning'],
          mentorship: { maxCapacity: 10, currentCount: 7 },
          department: 'Computer Science',
          email: 'sarah.johnson@college.edu',
          phone: '+91 9876543210',
          rating: 4.8,
          experience: 8
        },
        {
          _id: '2',
          name: 'Prof. Michael Chen',
          designation: 'Assistant Professor',
          specialization: ['Database Systems', 'Web Development', 'Software Engineering'],
          mentorship: { maxCapacity: 8, currentCount: 5 },
          department: 'Computer Science',
          email: 'michael.chen@college.edu',
          phone: '+91 9876543211',
          rating: 4.6,
          experience: 5
        },
        {
          _id: '3',
          name: 'Dr. Priya Sharma',
          designation: 'Professor',
          specialization: ['Computer Networks', 'Cybersecurity', 'IoT'],
          mentorship: { maxCapacity: 12, currentCount: 9 },
          department: 'Computer Science',
          email: 'priya.sharma@college.edu',
          phone: '+91 9876543212',
          rating: 4.9,
          experience: 12
        }
      ];

      // Mock classes data
      const mockClasses: Class[] = [
        {
          _id: 'c1',
          name: 'Data Structures and Algorithms',
          code: 'CS301',
          faculty: mockFaculty[0],
          schedule: { days: ['Mon', 'Wed', 'Fri'], time: '9:00 AM - 10:00 AM' },
          semester: 3,
          credits: 4,
          capacity: 60,
          enrolled: 45,
          description: 'Comprehensive study of data structures and algorithmic techniques'
        },
        {
          _id: 'c2',
          name: 'Database Management Systems',
          code: 'CS302',
          faculty: mockFaculty[1],
          schedule: { days: ['Tue', 'Thu'], time: '11:00 AM - 12:30 PM' },
          semester: 3,
          credits: 3,
          capacity: 50,
          enrolled: 38,
          description: 'Design and implementation of database systems'
        },
        {
          _id: 'c3',
          name: 'Computer Networks',
          code: 'CS303',
          faculty: mockFaculty[2],
          schedule: { days: ['Mon', 'Wed'], time: '2:00 PM - 3:30 PM' },
          semester: 3,
          credits: 3,
          capacity: 55,
          enrolled: 42,
          description: 'Network protocols, architecture, and security'
        }
      ];

      setAvailableFaculty(mockFaculty);
      setAvailableClasses(mockClasses);
      
      // Mock current mentor (if assigned)
      // setCurrentMentor(mockFaculty[0]);
      
      // Mock enrolled classes
      setEnrolledClasses([mockClasses[0]]);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMentor = async (facultyId: string) => {
    try {
      const selectedFaculty = availableFaculty.find(f => f._id === facultyId);
      if (selectedFaculty) {
        setCurrentMentor(selectedFaculty);
      }
    } catch (error) {
      console.error('Error assigning mentor:', error);
    }
  };

  const handleEnrollClass = async (classId: string) => {
    try {
      const selectedClass = availableClasses.find(c => c._id === classId);
      if (selectedClass && !enrolledClasses.find(c => c._id === classId)) {
        setEnrolledClasses([...enrolledClasses, selectedClass]);
      }
    } catch (error) {
      console.error('Error enrolling in class:', error);
    }
  };

  const handleDropClass = async (classId: string) => {
    try {
      setEnrolledClasses(enrolledClasses.filter(c => c._id !== classId));
    } catch (error) {
      console.error('Error dropping class:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>

        {/* Mentorship Tab */}
        <TabsContent value="mentorship" className="space-y-6">
          {/* Current Mentor Section */}
          {currentMentor && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Your Assigned Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                      {currentMentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{currentMentor.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{currentMentor.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-1">{currentMentor.designation}</p>
                    <p className="text-sm text-gray-500 mb-3">{currentMentor.experience} years experience</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{currentMentor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{currentMentor.phone}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentMentor.specialization.map((spec, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact Mentor
                      </Button>
                      <Button size="sm" variant="outline">
                        <Clock className="h-4 w-4 mr-1" />
                        Schedule Meeting
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Faculty Section */}
          {!currentMentor && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Your Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableFaculty.map((faculty) => (
                    <Card key={faculty._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="text-center mb-4">
                          <Avatar className="h-16 w-16 mx-auto mb-3">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-lg">
                              {faculty.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <h3 className="font-semibold text-gray-900">{faculty.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600">{faculty.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{faculty.designation}</p>
                          <p className="text-xs text-gray-500">{faculty.experience} years exp.</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{faculty.department}</span>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Specializations:</p>
                            <div className="flex flex-wrap gap-1">
                              {faculty.specialization.slice(0, 2).map((spec, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                              {faculty.specialization.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{faculty.specialization.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Available Slots:</span>
                            <Badge 
                              variant={faculty.mentorship.currentCount < faculty.mentorship.maxCapacity ? "default" : "secondary"}
                              className={faculty.mentorship.currentCount < faculty.mentorship.maxCapacity ? "bg-green-100 text-green-800" : ""}
                            >
                              {faculty.mentorship.maxCapacity - faculty.mentorship.currentCount} / {faculty.mentorship.maxCapacity}
                            </Badge>
                          </div>

                          <Button 
                            className="w-full" 
                            size="sm"
                            disabled={faculty.mentorship.currentCount >= faculty.mentorship.maxCapacity}
                            onClick={() => handleSelectMentor(faculty._id)}
                          >
                            {faculty.mentorship.currentCount >= faculty.mentorship.maxCapacity ? 'No Slots Available' : 'Select as Mentor'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Classes Tab */}
        <TabsContent value="classes" className="space-y-6">
          {/* Enrolled Classes */}
          {enrolledClasses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Your Enrolled Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledClasses.map((cls) => (
                    <div key={cls._id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                          <Badge variant="secondary">{cls.code}</Badge>
                          <Badge className="bg-green-100 text-green-800">{cls.credits} Credits</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{cls.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {cls.faculty.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {cls.schedule.days.join(', ')} • {cls.schedule.time}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDropClass(cls._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Drop Class
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Available Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableClasses.filter(cls => !enrolledClasses.find(e => e._id === cls._id)).map((cls) => (
                  <div key={cls._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                        <Badge variant="secondary">{cls.code}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">{cls.credits} Credits</Badge>
                        <Badge 
                          variant={cls.enrolled < cls.capacity ? "default" : "secondary"}
                          className={cls.enrolled < cls.capacity ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {cls.capacity - cls.enrolled} seats left
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{cls.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {cls.faculty.name} • {cls.faculty.designation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {cls.schedule.days.join(', ')} • {cls.schedule.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {cls.faculty.rating}
                        </span>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      disabled={cls.enrolled >= cls.capacity}
                      onClick={() => handleEnrollClass(cls._id)}
                    >
                      {cls.enrolled >= cls.capacity ? 'Class Full' : 'Enroll'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentMentorshipAndClasses;