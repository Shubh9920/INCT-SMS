export default function Developer() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Developer Information</h1>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-[#e6f0fa] p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Organization</h3>
            <p className="text-lg text-gray-900 font-medium">Kamadgiri Software Solutions (P) Ltd.</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Project Name</h3>
            <p className="text-lg text-gray-900 font-medium">Student Registration & Course Management System (INCT)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Project Guide</h3>
              <p className="text-lg text-gray-900 font-medium">Er. Neetu Patel</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Developers</h3>
              <p className="text-lg text-gray-900 font-medium">SHUBHANKAR, RAJ, VAIBHAVI, MANISH, VAIBHAV, MUSKAN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
