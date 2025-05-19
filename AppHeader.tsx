
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-attendance to-attendance-light flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">FaceAttend</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-attendance transition-colors duration-300">Home</Link>
            <Link to="/register" className="text-gray-700 hover:text-attendance transition-colors duration-300">Register</Link>
            <Link to="/attendance" className="text-gray-700 hover:text-attendance transition-colors duration-300">Attendance</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-attendance transition-colors duration-300">Dashboard</Link>
          </nav>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="hidden md:inline-flex border-attendance text-attendance hover:bg-attendance hover:text-white">
              Login
            </Button>
            <Button className="bg-attendance hover:bg-attendance-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Admin
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
