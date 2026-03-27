import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Globe, MousePointer2 } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function Layout() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Student Registration', path: '/register' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="bg-[#e6f0fa] border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="INCT Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center">
                    <Globe className="text-blue-500 w-8 h-8" />
                    <MousePointer2 className="text-blue-600 w-4 h-4 absolute bottom-0 right-0 fill-blue-500" />
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-700 tracking-tight italic">
                  INCT
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Enquiry
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#e6f0fa] border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="INCT Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center">
                    <Globe className="text-blue-500 w-8 h-8" />
                    <MousePointer2 className="text-blue-600 w-4 h-4 absolute bottom-0 right-0 fill-blue-500" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-blue-700 tracking-tight italic">
                  INCT
                </span>
              </Link>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Home</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/courses" className="hover:text-blue-600">Courses</Link></li>
                <li><Link to="/register" className="hover:text-blue-600">Student Registration</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Privacy Policy</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/register" className="hover:text-blue-600">Student Registration</Link></li>
                <li><button onClick={() => setIsEnquiryOpen(true)} className="hover:text-blue-600">Enquiry</button></li>
                <li><Link to="/admin" className="hover:text-blue-600">Admin Login</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-500">
            <p>Designed by <Link to="/developer" className="font-medium hover:text-blue-600">SHUBHANKAR, RAJ, VAIBHAVI, MANISH, VAIBHAV, MUSKAN</Link></p>
          </div>
        </div>
      </footer>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
}
