import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Backend not connected"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dotix Job Scheduler</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
