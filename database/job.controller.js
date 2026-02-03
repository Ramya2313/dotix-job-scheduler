const db = require('../database/db');

exports.createJob = (req, res) => {
  const { taskName, payload, priority } = req.body;

  if (!taskName || !priority) {
    return res.status(400).json({ error: 'taskName and priority required' });
  }

  db.run(
    `INSERT INTO jobs (taskName, payload, priority, status)
     VALUES (?, ?, ?, 'pending')`,
    [taskName, JSON.stringify(payload || {}), priority],
    function () {
      res.json({ id: this.lastID, message: 'Job created' });
    }
  );
};
