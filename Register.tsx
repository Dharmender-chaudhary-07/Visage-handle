
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import AppHeader from '@/components/AppHeader';

const Register = () => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageCount, setImageCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Start webcam feed
  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCapturing(true);
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
  const stopCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCapturing(false);
    }
  };

  // Capture student image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current && capturing) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const imageData = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageData);
        setImageCount(prev => prev + 1);
        
        toast({
          title: "Image Captured",
          description: `Captured image ${imageCount + 1} of 5 successfully!`,
        });
      }
    }
  };

  // Save student data
  const saveStudent = () => {
    if (!studentName || !studentId || !capturedImage) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please ensure all fields are filled and at least one image is captured."
      });
      return;
    }
    
    // In a real application, we would send this data to a server
    // For now, we'll just simulate success
    toast({
      title: "Student Registered",
      description: `${studentName} has been successfully registered!`,
    });
    
    // Reset form
    setStudentName('');
    setStudentId('');
    setCapturedImage(null);
    setImageCount(0);
    stopCapture();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCapture();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">Register New Student</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="studentName">Full Name</Label>
                    <Input 
                      id="studentName" 
                      value={studentName} 
                      onChange={(e) => setStudentName(e.target.value)} 
                      placeholder="Enter student's full name" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input 
                      id="studentId" 
                      value={studentId} 
                      onChange={(e) => setStudentId(e.target.value)} 
                      placeholder="Enter student ID" 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between flex-wrap">
                <div className="text-sm text-gray-500 mb-4 md:mb-0">
                  *All fields are required
                </div>
                <Button 
                  onClick={saveStudent}
                  className="bg-attendance hover:bg-attendance-dark"
                  disabled={!studentName || !studentId || !capturedImage}
                >
                  Register Student
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Capture Face Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
                    {capturedImage && !capturing ? (
                      <img 
                        src={capturedImage} 
                        alt="Captured student" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        className={`w-full h-full object-cover ${capturing ? 'block' : 'hidden'}`}
                      />
                    )}
                    {!capturing && !capturedImage && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-500">Camera feed will appear here</p>
                      </div>
                    )}
                  </div>
                  
                  <canvas ref={canvasRef} className="hidden" />
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={capturing ? stopCapture : startCapture}
                      variant={capturing ? "outline" : "default"}
                      className={capturing ? "border-red-500 text-red-500 hover:bg-red-50" : "bg-attendance hover:bg-attendance-dark"}
                    >
                      {capturing ? 'Stop Camera' : 'Start Camera'}
                    </Button>
                    
                    <Button
                      onClick={captureImage}
                      disabled={!capturing}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                      Capture Image ({imageCount}/5)
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Capture multiple images from different angles for better recognition.
                    We recommend at least 5 images per student.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
