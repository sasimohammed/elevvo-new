import { useJobs } from './JobContext';
import JobCard from './JobCard';
import img from './img/main.jpg';

export default function Dashboard() {
    const { jobs } = useJobs();

    return (
        <div className="p-6   ">
            <h1 className="text-3xl font-bold mb-8 text-[#327a6c]">Your Job Applications</h1>

            {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8  bg-[#f3eae0]  ">
                    <div className="relative w-full max-w-md group">
                        <img
                            src={img}
                            alt="Job search illustration"
                            className="w-full h-auto rounded-xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent rounded-xl" />
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">No applications yet</h2>
                        <p className="text-gray-500 max-w-md">
                            Start tracking your job applications and stay organized in your job search journey.
                        </p>
                        <a
                            href="/add-job"
                            className="inline-block bg-[#327a6c]  text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                        >
                            Add Your First Job
                        </a>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                            Total applications: <span className="text-yellow-500 font-bold">{jobs.length}</span>
                        </p>
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}