const db = require('../database/db');
const triggerWebhook = require('../services/webhook.service');

// Create Job
exports.createJob = (req, res) => {
  const { taskName, payload, priority } = req.body;

  if (!taskName || !priority) {
    return res.status(400).json({ error: 'taskName & priority required' });
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

// Get All Jobs
exports.getJobs = (req, res) => {
  const { status, priority } = req.query;

  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }

  db.all(query, params, (err, rows) => {
    res.json(rows);
  });
};

// Get Job By ID
exports.getJobById = (req, res) => {
  db.get(
    'SELECT * FROM jobs WHERE id = ?',
    [req.params.id],
    (err, row) => {
      if (!row) return res.status(404).json({ error: 'Job not found' });
      res.json(row);
    }
  );
};

// Run Job
exports.runJob = (req, res) => {
  const id = req.params.id;

  db.run(`UPDATE jobs SET status='running' WHERE id=?`, [id]);

  setTimeout(() => {
    db.run(
      `UPDATE jobs SET status='completed', updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
      [id]
    );

    db.get(`SELECT * FROM jobs WHERE id=?`, [id], (err, job) => {
      triggerWebhook(job);
    });
  }, 3000);

  res.json({ message: 'Job started' });
};
