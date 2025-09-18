import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  GraduationCap, TrendingUp, Award, BarChart3, 
  Download, Filter, Star, Target, BookOpen,
  Calendar, Trophy, Medal, ChevronRight
} from 'lucide-react';

const ParentGrades = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const academicSummary = {
    currentCGPA: 8.4,
    previousCGPA: 8.2,
    classRank: 12,
    totalStudents: 60,
    creditsCompleted: 120,
    totalCredits: 160,
    semesterGPA: 8.6,
    targetCGPA: 8.5
  };

  const semesterResults = [
    {
      semester: 'Semester 6 (Current)',
      gpa: 8.6,
      credits: 22,
      status: 'ongoing',
      subjects: [
        { name: 'Machine Learning', code: 'CS601', credits: 4, grade: 'A', marks: 85, maxMarks: 100, status: 'completed' },
        { name: 'Database Systems', code: 'CS602', credits: 4, grade: 'A-', marks: 78, maxMarks: 100, status: 'completed' },
        { name: 'Software Engineering', code: 'CS603', credits: 3, grade: 'B+', marks: 72, maxMarks: 100, status: 'completed' },
        { name: 'Computer Networks', code: 'CS604', credits: 4, grade: 'A', marks: 82, maxMarks: 100, status: 'ongoing' },
        { name: 'Web Technologies', code: 'CS605', credits: 3, grade: 'B+', marks: 75, maxMarks: 100, status: 'ongoing' },
        { name: 'Mobile Development', code: 'CS606', credits: 4, grade: 'B', marks: 68, maxMarks: 100, status: 'ongoing' }
      ]
    },
    {
      semester: 'Semester 5',
      gpa: 8.4,
      credits: 20,
      status: 'completed',
      subjects: [
        { name: 'Data Structures', code: 'CS501', credits: 4, grade: 'A', marks: 88, maxMarks: 100, status: 'completed' },
        { name: 'Operating Systems', code: 'CS502', credits: 4, grade: 'A-', marks: 79, maxMarks: 100, status: 'completed' },
        { name: 'Computer Graphics', code: 'CS503', credits: 3, grade: 'B+', marks: 74, maxMarks: 100, status: 'completed' },
        { name: 'Compiler Design', code: 'CS504', credits: 4, grade: 'A', marks: 84, maxMarks: 100, status: 'completed' },
        { name: 'Theory of Computation', code: 'CS505', credits: 3, grade: 'A-', marks: 77, maxMarks: 100, status: 'completed' },
        { name: 'Artificial Intelligence', code: 'CS506', credits: 2, grade: 'A', marks: 86, maxMarks: 100, status: 'completed' }
      ]
    }
  ];

  const performanceAnalytics = {
    strongSubjects: ['Machine Learning', 'Database Systems', 'Computer Networks'],
    improvementAreas: ['Mobile Development', 'Web Technologies'],
    consistencyScore: 85,
    improvementTrend: 'positive',
    semesterComparison: [
      { semester: 'Sem 1', gpa: 7.8 },
      { semester: 'Sem 2', gpa: 8.0 },
      { semester: 'Sem 3', gpa: 8.1 },
      { semester: 'Sem 4', gpa: 8.3 },
      { semester: 'Sem 5', gpa: 8.4 },
      { semester: 'Sem 6', gpa: 8.6 }
    ]
  };

  const upcomingExams = [
    { subject: 'Computer Networks', date: '2024-04-15', type: 'Final Exam', syllabus: '85%', preparation: 'good' },
    { subject: 'Web Technologies', date: '2024-04-18', type: 'Final Exam', syllabus: '78%', preparation: 'average' },
    { subject: 'Mobile Development', date: '2024-04-22', type: 'Final Exam', syllabus: '70%', preparation: 'needs improvement' }
  ];

  const achievements = [
    { title: 'Dean\'s List', semester: 'Semester 5', description: 'GPA above 8.0', icon: Trophy },
    { title: 'Subject Topper', semester: 'Semester 4', description: 'Highest marks in Data Structures', icon: Medal },
    { title: 'Academic Excellence', semester: 'Semester 3', description: 'Consistent performance', icon: Award },
    { title: 'Best Project Award', semester: 'Semester 2', description: 'Outstanding project work', icon: Star }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': case 'A': return 'text-green-600 bg-green-100';
      case 'A-': case 'B+': return 'text-blue-600 bg-blue-100';
      case 'B': case 'B-': return 'text-yellow-600 bg-yellow-100';
      case 'C+': case 'C': return 'text-orange-600 bg-orange-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  const getGradePoints = (grade: string) => {
    const gradePoints: { [key: string]: number } = {
      'A+': 10, 'A': 9, 'A-': 8, 'B+': 7, 'B': 6, 'B-': 5, 'C+': 4, 'C': 3
    };
    return gradePoints[grade] || 0;
  };

  const getPreparationColor = (preparation: string) => {
    switch (preparation) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'needs improvement': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Academic Performance</h2>
          <p className="text-gray-600">Track grades, results, and academic progress</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Transcript
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter Results
          </Button>
        </div>
      </div>

      {/* Academic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current CGPA</p>
                <p className="text-2xl font-bold text-green-600">{academicSummary.currentCGPA}</p>
                <p className="text-xs text-green-600">
                  +{(academicSummary.currentCGPA - academicSummary.previousCGPA).toFixed(1)} from last semester
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Class Rank</p>
                <p className="text-2xl font-bold text-blue-600">#{academicSummary.classRank}</p>
                <p className="text-xs text-gray-500">out of {academicSummary.totalStudents} students</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Progress</p>
                <p className="text-2xl font-bold text-purple-600">
                  {academicSummary.creditsCompleted}/{academicSummary.totalCredits}
                </p>
                <Progress 
                  value={(academicSummary.creditsCompleted / academicSummary.totalCredits) * 100} 
                  className="mt-2 h-2"
                />
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Semester GPA</p>
                <p className="text-2xl font-bold text-orange-600">{academicSummary.semesterGPA}</p>
                <p className="text-xs text-orange-600">Current semester</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Semester-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceAnalytics.semesterComparison.map((sem, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{sem.semester}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32">
                      <Progress value={(sem.gpa / 10) * 100} className="h-2" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12">
                      {sem.gpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-green-600 mb-2">Strong Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {performanceAnalytics.strongSubjects.map((subject, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-orange-600 mb-2">Areas for Improvement</h4>
              <div className="flex flex-wrap gap-2">
                {performanceAnalytics.improvementAreas.map((subject, index) => (
                  <Badge key={index} className="bg-orange-100 text-orange-800">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Consistency Score</span>
                <span className="text-lg font-bold text-blue-600">
                  {performanceAnalytics.consistencyScore}%
                </span>
              </div>
              <Progress value={performanceAnalytics.consistencyScore} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Semester Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Semester</TabsTrigger>
              <TabsTrigger value="previous">Previous Semesters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4">
              {semesterResults[0].subjects.map((subject, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                        <Badge variant="outline" className="text-xs">{subject.code}</Badge>
                        <Badge className={getGradeColor(subject.grade)}>
                          {subject.grade}
                        </Badge>
                        <Badge variant={subject.status === 'completed' ? 'default' : 'secondary'}>
                          {subject.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Credits: {subject.credits}</span>
                        <span>Marks: {subject.marks}/{subject.maxMarks}</span>
                        <span>Grade Points: {getGradePoints(subject.grade)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="w-32">
                        <Progress value={(subject.marks / subject.maxMarks) * 100} className="h-2" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {((subject.marks / subject.maxMarks) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="previous" className="space-y-4">
              {semesterResults.slice(1).map((semester, semIndex) => (
                <div key={semIndex} className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{semester.semester}</h3>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-blue-100 text-blue-800">
                        GPA: {semester.gpa}
                      </Badge>
                      <Badge variant="outline">
                        {semester.credits} Credits
                      </Badge>
                    </div>
                  </div>
                  {semester.subjects.map((subject, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg ml-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">{subject.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({subject.code})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getGradeColor(subject.grade)}>
                            {subject.grade}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {subject.marks}/{subject.maxMarks}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Upcoming Exams and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Exams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{exam.subject}</h4>
                    <Badge className={getPreparationColor(exam.preparation)}>
                      {exam.preparation}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{exam.date}</span>
                    <span>{exam.type}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Syllabus Coverage</span>
                      <span>{exam.syllabus}</span>
                    </div>
                    <Progress value={parseInt(exam.syllabus)} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Academic Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Icon className="w-8 h-8 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.semester}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentGrades;