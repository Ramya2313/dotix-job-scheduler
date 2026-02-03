const fetch = require('node-fetch');

const WEBHOOK_URL = 'https://webhook.site/your-url-here'; // replace

async function triggerWebhook(job) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job)
    });
    console.log('Webhook triggered');
  } catch (err) {
    console.error('Webhook failed', err);
  }
}

module.exports = triggerWebhook;
