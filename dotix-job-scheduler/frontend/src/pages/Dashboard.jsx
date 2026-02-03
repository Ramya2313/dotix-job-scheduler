import { useEffect, useState } from 'react';
import { fetchJobs, runJob } from '../services/api';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job.id}>
            <td>{job.id}</td>
            <td>{job.taskName}</td>
            <td>{job.status}</td>
            <td>
              {job.status === 'pending' && (
                <button onClick={() => runJob(job.id)}>Run</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
