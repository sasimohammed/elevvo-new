import { useState } from 'react';
import { useJobs } from './JobContext';
import { useNavigate } from 'react-router-dom';

export default function AddJobPage() {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const { addJob } = useJobs();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addJob(formData);
        navigate('/');
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#327a6c] mb-2">Add New Job</h1>
                <p className="text-gray-500">Track your job application details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#327a6c] mb-1">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border  text-[#327a6c]   border-gray-300 rounded-lg focus:ring-2 focus:ring-[#327a6c] focus:border-[#327a6c] outline-none transition"
                            required
                            placeholder="Enter company name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#327a6c]  mb-1">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300  text-[#327a6c] rounded-lg focus:ring-2 focus:ring-[#327a6c] focus:border-[#327a6c] outline-none transition"
                            required
                            placeholder="Enter job title"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#327a6c]  mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg   text-[#327a6c]  focus:ring-2 focus:ring-[#327a6c] focus:border-[#327a6c] outline-none transition"
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#327a6c]  mb-1">Date</label>
                            <input
                                type="date"
                                name="appliedDate"
                                value={formData.appliedDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300  text-[#327a6c]   rounded-lg focus:ring-2 focus:ring-[#327a6c] focus:border-[#327a6c] outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#327a6c]  mb-1">Notes</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2  text-[#327a6c]  focus:ring-[#327a6c] focus:border-[#327a6c] outline-none transition h-24"
                            placeholder="Any additional notes..."
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 text-sm font-medium text-[#327a6c]  bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-[#327a6c] hover:bg-[#286155] rounded-lg transition shadow-sm"
                    >
                        Save Application
                    </button>
                </div>
            </form>
        </div>
    );
}