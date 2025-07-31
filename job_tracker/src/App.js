import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JobProvider } from './JobContext';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import AddJobPage from './AddJobPage';
import JobDetailsPage from './JobDetailsPage';

import './index.css';

function App() {
  return (
      <JobProvider>
        <Router>
          <div className="min-h-screen bg-[#f3eae0] text-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-job" element={<AddJobPage />} />
                <Route path="/job/:id" element={<JobDetailsPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </JobProvider>
  );
}

export default App;