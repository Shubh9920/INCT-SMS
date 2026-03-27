export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About INCT</h1>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        <p className="text-lg leading-relaxed">
          Welcome to INCT, a premier institute dedicated to providing top-notch education and shaping the future of our students. 
          Our mission is to deliver high-quality, industry-relevant courses that empower individuals to excel in their chosen careers.
        </p>
        
        <div className="bg-[#e6f0fa] p-6 rounded-lg border border-blue-100 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p>
            To digitize the learning experience and provide accessible, comprehensive, and practical education to students worldwide, 
            bridging the gap between academic knowledge and industry requirements.
          </p>
        </div>

        <div className="bg-[#e6f0fa] p-6 rounded-lg border border-blue-100 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p>
            To be recognized globally as a center of excellence in education, fostering innovation, leadership, and continuous learning.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Educational Services</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Comprehensive course curriculum designed by industry experts.</li>
          <li>Interactive learning environment with practical assignments.</li>
          <li>Dedicated student support and career guidance.</li>
          <li>Seamless online registration and course management.</li>
        </ul>
      </div>
    </div>
  );
}
