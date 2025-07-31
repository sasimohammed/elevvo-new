import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from './JobContext';
import StatusBadge from './StatusBadge';

export default function JobDetailsPage() {
    const { id } = useParams();
    const { jobs, updateJob, deleteJob } = useJobs();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        status: 'Applied',
        appliedDate: '',
        notes: ''
    });

    useEffect(() => {
        const foundJob = jobs.find(j => j.id === parseInt(id));
        if (foundJob) {
            setJob(foundJob);
            setFormData({
                company: foundJob.company,
                title: foundJob.title,
                status: foundJob.status,
                appliedDate: foundJob.appliedDate,
                notes: foundJob.notes || ''
            });
        } else {
            navigate('/');
        }
    }, [id, jobs, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        updateJob(job.id, formData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this job application?')) {
            deleteJob(job.id);
            navigate('/');
        }
    };

    if (!job) return null;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-yellow-400">Job Details</h1>
                <div className="flex space-x-4">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition"
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>

            {!isEditing ? (
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-yellow-400">{job.company}</h2>
                        <p className="text-xl text-gray-300">{job.title}</p>
                        <div className="mt-2">
                            <StatusBadge status={job.status} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">Application Details</h3>
                            <p className="text-gray-400">Applied on: {new Date(job.appliedDate).toLocaleDateString()}</p>
                        </div>

                        {job.notes && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-300 mb-2">Notes</h3>
                                <p className="text-gray-400 whitespace-pre-wrap">{job.notes}</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <form className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Company Name</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                        >
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Applied Date</label>
                        <input
                            type="date"
                            name="appliedDate"
                            value={formData.appliedDate}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white h-32"
                        />
                    </div>
                </form>
            )}
        </div>
    );
}