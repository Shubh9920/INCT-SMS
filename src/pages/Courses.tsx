import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialCourses } from '../lib/mockData';

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Available Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-[#e6f0fa] p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{course.name}</h2>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
              
              <div className="space-y-2 text-sm text-gray-800 font-medium bg-gray-50 p-4 rounded-md mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fees:</span>
                  <span>₹{course.fees.toLocaleString()}</span>
                </div>
              </div>
              
              <Link
                to={`/register?course=${encodeURIComponent(course.name)}`}
                className="block w-full text-center bg-[#5b9bd5] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Register Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
