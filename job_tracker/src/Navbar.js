import { Link } from 'react-router-dom';
import { useJobs } from './JobContext';

export default function Navbar() {
    const { exportJobs, importJobs } = useJobs();

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (file) {
            importJobs(file)
                .then(() => alert('Jobs imported successfully!'))
                .catch((error) => alert(`Error importing jobs: ${error.message}`));
        }
        e.target.value = ''; // Reset file input
    };

    return (
        <nav className="bg-[#327a6c] text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">JobTracker</Link>
                <div className="flex space-x-4">
                    <Link to="/add-job" className=" font-bold  transition">Add Job</Link>
                    <button
                        onClick={exportJobs}
                        className="  font-bold  transition"
                    >
                        Export
                    </button>
                    <label className=" font-bold transition cursor-pointer">
                        Import
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
        </nav>
    );
}