import { useState } from 'react';
import { createJob } from '../services/api';

export default function CreateJob() {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');

  const submit = async () => {
    await createJob({ taskName, priority, payload: {} });
    alert('Job Created');
  };

  return (
    <div>
      <input
        placeholder="Task Name"
        onChange={e => setTaskName(e.target.value)}
      />
      <select onChange={e => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button onClick={submit}>Create</button>
    </div>
  );
}
