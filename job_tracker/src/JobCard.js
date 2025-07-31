import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function JobCard({ job }) {
    return (
        <Link
            to={`/job/${job.id}`}
            className="block bg-white hover:bg-[#f8f9fa] rounded-lg p-4 mb-4 transition-all shadow-sm hover:shadow-md border border-gray-100"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-[#327a6c]">{job.company}</h3>
                    <p className="text-gray-700">{job.title}</p>
                </div>
                <StatusBadge status={job.status} />
            </div>
            <div className="mt-2 text-sm text-gray-500">
                Applied on: {new Date(job.appliedDate).toLocaleDateString()}
            </div>
        </Link>
    );
}