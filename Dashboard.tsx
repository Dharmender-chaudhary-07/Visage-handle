
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppHeader from '@/components/AppHeader';

// Mock attendance data
const mockAttendanceData = {
  "CS101": {
    name: "Introduction to Computer Science",
    sessions: [
      { date: "2025-05-19", present: 1, absent: 0, percentage: 100 },
      { date: "2025-05-19", present: 1, absent: 0, percentage: 100},
      { date: "2025-05-19", present: 1, absent: 0, percentage: 100 },
    ],
    students: [
      { id: "ST001", name: "gaurav", attendance: 1, percentage: 100 },
      { id: "ST002", name: "Rohit Rana", attendance: 1, percentage: 100 },
      { id: "ST003", name: "Rohit Chauhan", attendance: 3, percentage: 100 },
      { id: "ST004", name: "Dharmender", attendance: 1, percentage: 100 },
    ]
  },
  "CS201": {
    name: "Data Structures",
    sessions: [
      { date: "2025-05-14", present: 25, absent: 2, percentage: 93 },
      { date: "2025-05-16", present: 22, absent: 5, percentage: 81 },
      { date: "2025-05-19", present: 24, absent: 3, percentage: 89 },
    ],
    students: [
      { id: "ST005", name: "David Wilson", attendance: 3, percentage: 100 },
      { id: "ST006", name: "Emma Davis", attendance: 2, percentage: 67 },
      { id: "ST007", name: "Michael Rodriguez", attendance: 3, percentage: 100 },
      { id: "ST008", name: "Sophia Lee", attendance: 3, percentage: 100 },
    ]
  }
};

const Dashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const courseData = selectedCourse ? mockAttendanceData[selectedCourse as keyof typeof mockAttendanceData] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">Attendance Dashboard</h1>
        
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Select a course to view attendance statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-xs">
                <Label htmlFor="courseSelect">Course</Label>
                <Select onValueChange={(value) => setSelectedCourse(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CS101">Introduction to Computer Science</SelectItem>
                    <SelectItem value="CS201"></SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {courseData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-lg">
                  <CardHeader className="bg-attendance/10">
                    <CardTitle className="text-lg">Total Sessions</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-attendance">{courseData.sessions.length}</div>
                    <p className="text-sm text-gray-500 mt-1">Recorded attendance sessions</p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg">
                  <CardHeader className="bg-green-500/10">
                    <CardTitle className="text-lg">Average Attendance</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-green-600">
                      {Math.round(courseData.sessions.reduce((sum, session) => sum + session.percentage, 0) / courseData.sessions.length)}%
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Across all sessions</p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-lg">
                  <CardHeader className="bg-blue-500/10">
                    <CardTitle className="text-lg">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-blue-600">{courseData.students.length}</div>
                    <p className="text-sm text-gray-500 mt-1">Registered in this course</p>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="sessions" className="mb-8">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="sessions">Sessions</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>
                <TabsContent value="sessions">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Session History</CardTitle>
                      <CardDescription>Attendance record for each session</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-4 text-left">Date</th>
                              <th className="py-3 px-4 text-center">Present</th>
                              <th className="py-3 px-4 text-center">Absent</th>
                              <th className="py-3 px-4 text-right">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseData.sessions.map((session, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-left">{new Date(session.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-center text-green-600 font-medium">{session.present}</td>
                                <td className="py-3 px-4 text-center text-red-600 font-medium">{session.absent}</td>
                                <td className="py-3 px-4 text-right">
                                  <div className="inline-flex items-center space-x-2">
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-green-500 rounded-full"
                                        style={{ width: `${session.percentage}%` }}
                                      />
                                    </div>
                                    <span>{session.percentage}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="students">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Student Attendance</CardTitle>
                      <CardDescription>Individual attendance records</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-3 px-4 text-left">Student ID</th>
                              <th className="py-3 px-4 text-left">Name</th>
                              <th className="py-3 px-4 text-center">Sessions Attended</th>
                              <th className="py-3 px-4 text-right">Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseData.students.map((student, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-left font-medium">{student.id}</td>
                                <td className="py-3 px-4 text-left">{student.name}</td>
                                <td className="py-3 px-4 text-center">
                                  {student.attendance}/{courseData.sessions.length}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="inline-flex items-center space-x-2">
                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-attendance rounded-full"
                                        style={{ width: `${student.percentage}%` }}
                                      />
                                    </div>
                                    <span>{student.percentage}%</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="border-attendance text-attendance hover:bg-attendance/10">
                        Export Report
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center p-12 bg-gray-50 rounded-lg shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Course Selected</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Select a course from the dropdown menu above to view attendance statistics and reports.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
