import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { initialCourses } from '../lib/mockData';

export default function Registration() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedCourse = searchParams.get('course') || '';

  const [courses, setCourses] = useState(initialCourses);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    email: '',
    mobile: '',
    courseName: preselectedCourse,
    address: ''
  });

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudent = {
      id: Date.now(),
      ...formData,
      registeredOn: new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem('students') || '[]');
    localStorage.setItem('students', JSON.stringify([...existing, newStudent]));
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200 text-center p-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 w-20 h-20" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-4">
            Registered Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you, {formData.studentName}. Your registration for {formData.courseName} has been received.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setFormData({
                  studentName: '',
                  fatherName: '',
                  email: '',
                  mobile: '',
                  courseName: '',
                  address: ''
                });
                setIsSubmitted(false);
              }}
              className="bg-[#e6f0fa] text-blue-700 font-bold py-3 px-6 rounded shadow-sm hover:bg-blue-100 transition-colors uppercase tracking-wide"
            >
              Register Another
            </button>
            <Link
              to="/"
              className="bg-[#5b9bd5] text-white font-bold py-3 px-6 rounded shadow hover:bg-blue-600 transition-colors uppercase tracking-wide"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-[#e6f0fa] rounded-lg shadow-md overflow-hidden border border-blue-200">
        <div className="bg-[#f0f7ff] py-6 text-center border-b border-blue-200">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            STUDENT REGISTRATION
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Student Name</label>
              <input
                type="text"
                required
                placeholder="Enter student's full name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              />
            </div>
            
            {/* Father Name */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Father Name</label>
              <input
                type="text"
                required
                placeholder="Enter student's full name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="Enter email@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="Enter mobile number"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            {/* Select Course */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2 uppercase">Select Course</label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              >
                <option value="" disabled>Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.name}>{course.name}</option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Address</label>
              <textarea
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#5b9bd5] text-white font-bold py-3 px-4 rounded shadow hover:bg-blue-600 transition-colors uppercase tracking-wide"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
