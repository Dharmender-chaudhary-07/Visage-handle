
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppHeader from '@/components/AppHeader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Face Recognition Attendance System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An intelligent attendance management solution that uses facial recognition 
            technology to accurately record and manage student attendance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-attendance to-attendance-light text-white">
              <CardTitle className="text-center text-2xl">Register Students</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-2 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-attendance">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <p className="text-gray-700">Add new students to the system by capturing their facial data.</p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 flex justify-center">
              <Button asChild className="bg-attendance hover:bg-attendance-dark">
                <Link to="/register">Register Students</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-attendance-dark to-attendance text-white">
              <CardTitle className="text-center text-2xl">Take Attendance</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-2 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-attendance">
                  <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3"></path>
                  <path d="M14 3a2 2 0 1 0-4 0v8a2 2 0 1 1-4 0V5"></path>
                  <path d="m17 14 3 3-3 3"></path>
                </svg>
              </div>
              <p className="text-gray-700">Mark attendance by recognizing the faces of registered students.</p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 flex justify-center">
              <Button asChild className="bg-attendance hover:bg-attendance-dark">
                <Link to="/attendance">Take Attendance</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-attendance-light to-attendance text-white">
              <CardTitle className="text-center text-2xl">View Reports</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-2 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-attendance">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
              </div>
              <p className="text-gray-700">Access and analyze attendance records and generate reports.</p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 flex justify-center">
              <Button asChild className="bg-attendance hover:bg-attendance-dark">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="mt-16 py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">&copy; {new Date().getFullYear()} Face Recognition Attendance System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
