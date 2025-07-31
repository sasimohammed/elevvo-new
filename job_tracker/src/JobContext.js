import { createContext, useContext, useState, useEffect } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);

    // Load jobs from localStorage on initial render
    useEffect(() => {
        const savedJobs = localStorage.getItem('jobApplications');
        if (savedJobs) {
            setJobs(JSON.parse(savedJobs));
        }
    }, []);

    // Save jobs to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('jobApplications', JSON.stringify(jobs));
    }, [jobs]);

    const addJob = (job) => {
        setJobs([...jobs, { ...job, id: Date.now() }]);
    };

    const updateJob = (id, updatedJob) => {
        setJobs(jobs.map(job => job.id === id ? { ...updatedJob, id } : job));
    };

    const deleteJob = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    const exportJobs = () => {
        const dataStr = JSON.stringify(jobs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

        const exportFileDefaultName = 'job_applications.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const importJobs = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const importedJobs = JSON.parse(event.target.result);
                    if (Array.isArray(importedJobs)) {
                        setJobs(importedJobs);
                        resolve();
                    } else {
                        reject(new Error('Invalid file format'));
                    }
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };

            reader.readAsText(file);
        });
    };

    return (
        <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob, exportJobs, importJobs }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);