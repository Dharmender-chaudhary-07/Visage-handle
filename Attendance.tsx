
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppHeader from '@/components/AppHeader';

const Attendance = () => {
  const [detecting, setDetecting] = useState(false);
  const [recognizedStudent, setRecognizedStudent] = useState<string | null>(null);
  const [course, setCourse] = useState('');
  const [courseId, setCourseId] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [attendanceList, setAttendanceList] = useState<Array<{name: string, id: string, time: string}>>([]);
  const { toast } = useToast();

  // Mock student data - in a real app this would come from a database
  const mockStudents = [
    { id: 'ST001', name: 'John Doe' },
    { id: 'ST002', name: 'Jane Smith' },
    { id: 'ST003', name: 'Bob Johnson' },
    { id: 'ST004', name: 'Alice Brown' },
  ];

  // Start webcam feed
  const startDetection = async () => {
    if (!course || !courseId) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a course before starting attendance."
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setDetecting(true);
      
      toast({
        title: "Detection Started",
        description: "The system is now ready to detect student faces."
      });
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access the camera. Please ensure you have camera permissions enabled."
      });
    }
  };

  // Stop webcam feed
  const stopDetection = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setDetecting(false);
      
      toast({
        title: "Detection Stopped",
        description: "Face detection has been stopped."
      });
    }
  };

  // Simulate face recognition by randomly selecting a student after a delay
  const simulateDetection = () => {
    if (!detecting) return;
    
    setRecognizedStudent(null);
    
    // Draw detection rectangle
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw detection rectangle - in a real app, this would be based on actual face detection
        const x = canvasRef.current.width * 0.25;
        const y = canvasRef.current.height * 0.2;
        const width = canvasRef.current.width * 0.5;
        const height = canvasRef.current.height * 0.6;
        
        context.strokeStyle = '#3b82f6';
        context.lineWidth = 3;
        context.strokeRect(x, y, width, height);
        
        // Add facial landmark dots - simulated
        const landmarks = [
          {x: x + width * 0.3, y: y + height * 0.3}, // left eye
          {x: x + width * 0.7, y: y + height * 0.3}, // right eye
          {x: x + width * 0.5, y: y + height * 0.5}, // nose
          {x: x + width * 0.35, y: y + height * 0.7}, // left mouth
          {x: x + width * 0.65, y: y + height * 0.7}, // right mouth
        ];
        
        landmarks.forEach(point => {
          context.beginPath();
          context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
          context.fillStyle = '#22c55e';
          context.fill();
        });
      }
    }
    
    // Simulate processing time and random student recognition
    setTimeout(() => {
      if (!detecting) return;
      
      const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
      setRecognizedStudent(randomStudent.name);
      
      // Add to attendance list
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      
      const updatedList = [...attendanceList];
      // Check if student is already in attendance list
      const existingIndex = updatedList.findIndex(s => s.id === randomStudent.id);
      if (existingIndex === -1) {
        updatedList.push({
          id: randomStudent.id,
          name: randomStudent.name,
          time: timeStr
        });
        setAttendanceList(updatedList);
        
        toast({
          title: "Attendance Marked",
          description: `${randomStudent.name} has been marked present.`
        });
      } else {
        toast({
          variant: "warning",
          title: "Duplicate Detection",
          description: `${randomStudent.name} has already been marked present.`
        });
      }
    }, 2000);
  };

  // Reset attendance list
  const resetAttendance = () => {
    setAttendanceList([]);
    toast({
      title: "Attendance Reset",
      description: "The attendance list has been cleared."
    });
  };

  // Simulate continuous detection when detection is active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (detecting) {
      interval = setInterval(() => {
        simulateDetection();
      }, 5000); // Simulate detection every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [detecting, attendanceList]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetection();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">Take Attendance</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-lg">
              <CardHeader>
                <CardTitle>Face Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="course">Course</Label>
                      <Select onValueChange={setCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CS101">Introduction to Computer Science</SelectItem>
                          <SelectItem value="CS201">Data Structures</SelectItem>
                          <SelectItem value="CS301">Database Systems</SelectItem>
                          <SelectItem value="CS401">Machine Learning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="courseId">Course ID</Label>
                      <Input 
                        id="courseId" 
                        value={courseId} 
                        onChange={(e) => setCourseId(e.target.value)} 
                        placeholder="Enter course ID" 
                      />
                    </div>
                  </div>
                  
                  <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      className="w-full h-full object-cover" 
                    />
                    <canvas 
                      ref={canvasRef} 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none" 
                    />
                    {!detecting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-500">Camera feed will appear here</p>
                      </div>
                    )}
                    {recognizedStudent && (
                      <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white p-2 text-center">
                        <p className="font-semibold">Recognized: {recognizedStudent}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={detecting ? stopDetection : startDetection}
                      className={detecting ? "bg-red-500 hover:bg-red-600" : "bg-attendance hover:bg-attendance-dark"}
                    >
                      {detecting ? 'Stop Detection' : 'Start Detection'}
                    </Button>
                    
                    <Button
                      onClick={simulateDetection}
                      disabled={!detecting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Manually Detect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Attendance List</CardTitle>
                <span className="bg-attendance text-white text-xs px-2 py-1 rounded-full">
                  {attendanceList.length} Present
                </span>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto">
                {attendanceList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No students marked present yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {attendanceList.map((student, index) => (
                      <li key={index} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">ID: {student.id}</p>
                        </div>
                        <div className="text-sm text-gray-500">{student.time}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={resetAttendance}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  disabled={attendanceList.length === 0}
                >
                  Reset List
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
