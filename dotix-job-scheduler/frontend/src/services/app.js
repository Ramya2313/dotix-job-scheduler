const API = 'http://localhost:5000';

export const fetchJobs = () =>
  fetch(`${API}/jobs`).then(res => res.json());

export const createJob = (data) =>
  fetch(`${API}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

export const runJob = (id) =>
  fetch(`${API}/run-job/${id}`, { method: 'POST' });
