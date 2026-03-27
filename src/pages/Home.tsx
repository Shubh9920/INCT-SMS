import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialCourses, initialNotifications } from '../lib/mockData';

export default function Home() {
  const [courses, setCourses] = useState(initialCourses);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    } else {
      localStorage.setItem('courses', JSON.stringify(initialCourses));
    }

    const storedNotifs = localStorage.getItem('notifications');
    if (storedNotifs) {
      setNotifications(JSON.parse(storedNotifs));
    } else {
      localStorage.setItem('notifications', JSON.stringify(initialNotifications));
    }
  }, []);

  const combinedNotificationText = notifications.map(n => n.message).join(' | ');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-[#f0f7ff] py-20 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight uppercase">
          WELCOME TO INCT
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Shape Your Future. Excel.<br/>
          Register for our programs.
        </p>
        <Link
          to="/register"
          className="inline-block bg-[#5b9bd5] text-white font-bold py-3 px-8 rounded shadow-md hover:bg-blue-600 transition-colors uppercase tracking-wide"
        >
          Register Now
        </Link>
      </section>

      {/* Marquee Notification */}
      {combinedNotificationText && (
        <div className="bg-[#d9e1f2] py-2 overflow-hidden border-y border-blue-200">
          <div className="whitespace-nowrap animate-marquee inline-block text-gray-800 font-medium">
            {combinedNotificationText}
          </div>
        </div>
      )}

      {/* Featured Courses */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full bg-[#f8fcfc]">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.slice(0, 3).map((course) => (
            <div key={course.id} className="bg-[#e6f0fa] rounded-lg overflow-hidden shadow-sm border border-blue-100 flex flex-col">
              <div className="p-6 flex-grow">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">COURSE NAME</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{course.name}</h3>
                <div className="space-y-2 text-sm text-gray-800 font-medium">
                  <p>Duration: {course.duration}</p>
                  <p>Fees: ₹{course.fees.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-4 bg-[#d9e1f2] mt-auto">
                <Link
                  to={`/register?course=${encodeURIComponent(course.name)}`}
                  className="block w-full text-center bg-[#5b9bd5] text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
                >
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
