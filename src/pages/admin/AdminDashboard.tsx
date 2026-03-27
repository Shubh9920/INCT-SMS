import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { initialCourses, initialNotifications } from '../../lib/mockData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');
  
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [editingEnquiry, setEditingEnquiry] = useState<any>(null);
  const [editingNotification, setEditingNotification] = useState<any>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    // Load data
    setStudents(JSON.parse(localStorage.getItem('students') || '[]'));
    setCourses(JSON.parse(localStorage.getItem('courses') || JSON.stringify(initialCourses)));
    setEnquiries(JSON.parse(localStorage.getItem('enquiries') || '[]'));
    setNotifications(JSON.parse(localStorage.getItem('notifications') || JSON.stringify(initialNotifications)));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  const deleteStudent = (id: number) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
  };

  const deleteCourse = (id: number) => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const deleteEnquiry = (id: number) => {
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    localStorage.setItem('enquiries', JSON.stringify(updated));
  };

  const deleteNotification = (id: number) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const addNotification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem('message') as HTMLInputElement).value;
    
    const newNotif = {
      id: Date.now(),
      message,
      addedOn: new Date().toISOString()
    };
    
    const updated = [...notifications, newNotif];
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    form.reset();
  };

  const addCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const duration = (form.elements.namedItem('duration') as HTMLInputElement).value;
    const fees = parseInt((form.elements.namedItem('fees') as HTMLInputElement).value, 10);
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    
    const newCourse = {
      id: Date.now(),
      name,
      duration,
      fees,
      description,
      addedOn: new Date().toISOString()
    };
    
    const updated = [...courses, newCourse];
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
    form.reset();
  };

  const updateStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updated = students.map(s => s.id === editingStudent.id ? editingStudent : s);
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
    setEditingStudent(null);
  };

  const updateCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updated = courses.map(c => c.id === editingCourse.id ? editingCourse : c);
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
    setEditingCourse(null);
  };

  const updateEnquiry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updated = enquiries.map(enq => enq.id === editingEnquiry.id ? editingEnquiry : enq);
    setEnquiries(updated);
    localStorage.setItem('enquiries', JSON.stringify(updated));
    setEditingEnquiry(null);
  };

  const updateNotification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updated = notifications.map(n => n.id === editingNotification.id ? editingNotification : n);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
    setEditingNotification(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-gray-900 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">INCT Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="text-sm text-gray-300 hover:text-white"
            >
              View Site
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <nav className="space-y-1 bg-white rounded-lg shadow p-4">
            {[
              { id: 'students', name: 'Manage Students' },
              { id: 'courses', name: 'Manage Courses' },
              { id: 'enquiries', name: 'Manage Enquiries' },
              { id: 'notifications', name: 'Manage Notifications' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
              Manage {activeTab}
            </h2>

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No students registered yet.</td></tr>
                    ) : students.map((s) => (
                      <tr key={s.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.studentName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.courseName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(s.registeredOn).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => setEditingStudent(s)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                          <button onClick={() => deleteStudent(s.id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <form onSubmit={addCourse} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Course</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Course Name"
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="duration"
                      required
                      placeholder="Duration (e.g., 6 Months)"
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      name="fees"
                      required
                      placeholder="Fees (in ₹)"
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      name="description"
                      required
                      placeholder="Course Description"
                      rows={1}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium">
                    Add Course
                  </button>
                </form>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((c) => (
                        <tr key={c.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.duration}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{c.fees}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => setEditingCourse(c)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                            <button onClick={() => deleteCourse(c.id)} className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Enquiries Tab */}
            {activeTab === 'enquiries' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enquiries.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No enquiries yet.</td></tr>
                    ) : enquiries.map((e) => (
                      <tr key={e.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {e.name}<br/><span className="text-xs text-gray-500">{e.email}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.subject}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{e.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => setEditingEnquiry(e)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                          <button onClick={() => deleteEnquiry(e.id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <form onSubmit={addNotification} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Notification</h3>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      name="message"
                      required
                      placeholder="Enter notification message..."
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium">
                      Add
                    </button>
                  </div>
                </form>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {notifications.map((n) => (
                        <tr key={n.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">{n.message}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(n.addedOn).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => setEditingNotification(n)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                            <button onClick={() => deleteNotification(n.id)} className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Student</h3>
              <button onClick={() => setEditingStudent(null)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={updateStudent} className="space-y-4">
              <input type="text" value={editingStudent.studentName} onChange={e => setEditingStudent({...editingStudent, studentName: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Student Name" required />
              <input type="text" value={editingStudent.fatherName} onChange={e => setEditingStudent({...editingStudent, fatherName: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Father Name" required />
              <input type="email" value={editingStudent.email} onChange={e => setEditingStudent({...editingStudent, email: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Email" required />
              <input type="tel" value={editingStudent.mobile} onChange={e => setEditingStudent({...editingStudent, mobile: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Mobile" required />
              <input type="text" value={editingStudent.courseName} onChange={e => setEditingStudent({...editingStudent, courseName: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Course" required />
              <textarea value={editingStudent.address} onChange={e => setEditingStudent({...editingStudent, address: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Address" required></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Course</h3>
              <button onClick={() => setEditingCourse(null)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={updateCourse} className="space-y-4">
              <input type="text" value={editingCourse.name} onChange={e => setEditingCourse({...editingCourse, name: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Course Name" required />
              <input type="text" value={editingCourse.duration} onChange={e => setEditingCourse({...editingCourse, duration: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Duration" required />
              <input type="number" value={editingCourse.fees} onChange={e => setEditingCourse({...editingCourse, fees: parseInt(e.target.value, 10)})} className="w-full px-3 py-2 border rounded" placeholder="Fees" required />
              <textarea value={editingCourse.description} onChange={e => setEditingCourse({...editingCourse, description: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Description" required></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Enquiry Modal */}
      {editingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Enquiry</h3>
              <button onClick={() => setEditingEnquiry(null)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={updateEnquiry} className="space-y-4">
              <input type="text" value={editingEnquiry.name} onChange={e => setEditingEnquiry({...editingEnquiry, name: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Name" required />
              <input type="email" value={editingEnquiry.email} onChange={e => setEditingEnquiry({...editingEnquiry, email: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Email" required />
              <input type="tel" value={editingEnquiry.mobileNo} onChange={e => setEditingEnquiry({...editingEnquiry, mobileNo: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Mobile" required />
              <input type="text" value={editingEnquiry.subject} onChange={e => setEditingEnquiry({...editingEnquiry, subject: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Subject" required />
              <textarea value={editingEnquiry.message} onChange={e => setEditingEnquiry({...editingEnquiry, message: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Message" required></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {editingNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Notification</h3>
              <button onClick={() => setEditingNotification(null)}><X size={20} className="text-gray-500" /></button>
            </div>
            <form onSubmit={updateNotification} className="space-y-4">
              <input type="text" value={editingNotification.message} onChange={e => setEditingNotification({...editingNotification, message: e.target.value})} className="w-full px-3 py-2 border rounded" placeholder="Message" required />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
