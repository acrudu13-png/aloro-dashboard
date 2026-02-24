---
sidebar_position: 15
---

# Post-Call Webhooks

Send call data to your external systems in real-time.

## Overview

Webhooks allow you to automatically send call data to your external systems after each conversation. Use this to:

- Update CRM records
- Sync data to your database
- Trigger notifications
- Log calls to external services
- Integrate with business workflows

---

## Configuration

### Setting Up a Webhook

1. Navigate to **Webhooks** or **Assistant > Post-Call Actions**
2. Click **Add Webhook**
3. Configure settings:

![Webhook Config](/img/webhook-config.png)

| Setting | Description |
|---------|-------------|
| **Endpoint URL** | Where to send the data |
| **Completed Only** | Only send for successful calls |
| **Include Recording** | Add recording URL to payload |
| **Secret** | Optional signing secret for verification |

---

## Webhook Payload

### Full Payload Structure

```json
{
  "event": "call.ended",
  "timestamp": "2024-03-15T14:30:00Z",
  "data": {
    "call": {
      "id": "call_abc123",
      "phone": "+1234567890",
      "direction": "inbound",
      "status": "completed",
      "duration": 180,
      "started_at": "2024-03-15T14:27:00Z",
      "ended_at": "2024-03-15T14:30:00Z"
    },
    "assistant": {
      "id": "asst_xyz789",
      "name": "Customer Support"
    },
    "phone_number": {
      "id": "pn_456",
      "number": "+0987654321"
    },
    "campaign": {
      "id": "camp_123",
      "name": "March Outreach"
    },
    "variables": {
      "status": true,
      "summary": "Customer inquired about order status",
      "order_id": "ORD-12345",
      "issue_resolved": true,
      "customer_satisfied": true
    },
    "transcript": {
      "formatted": "AI: Hello! How can I help you today?\nCustomer: I need to check my order status...",
      "timestamped": [
        {
          "speaker": "ai",
          "text": "Hello! How can I help you today?",
          "timestamp": "00:00"
        },
        {
          "speaker": "customer",
          "text": "I need to check my order status",
          "timestamp": "00:03"
        }
      ]
    },
    "recording": {
      "url": "https://storage.aloro.ai/recordings/call_abc123.mp3",
      "duration": 180
    },
    "cost": {
      "total": 0.45,
      "breakdown": {
        "voice": 0.30,
        "transcription": 0.10,
        "recording": 0.05
      }
    }
  }
}
```

---

## Payload Fields

### Call Information

| Field | Type | Description |
|-------|------|-------------|
| `call.id` | string | Unique call identifier |
| `call.phone` | string | Caller/callee phone number |
| `call.direction` | string | `inbound` or `outbound` |
| `call.status` | string | Call outcome |
| `call.duration` | number | Duration in seconds |

### Variables

| Field | Type | Description |
|-------|------|-------------|
| `variables.status` | boolean | Call success |
| `variables.summary` | string | Call summary |
| `variables.*` | any | Custom post-call variables |

### Transcript

| Field | Type | Description |
|-------|------|-------------|
| `transcript.formatted` | string | Readable transcript |
| `transcript.timestamped` | array | Timestamped segments |

### Recording (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `recording.url` | string | Download URL |
| `recording.duration` | number | Recording length |

---

## Webhook Options

### Completed Only

When enabled, webhooks only fire for successfully completed calls. This filters out:
- Missed calls
- Busy signals
- Voicemails
- Failed calls

### Include Recording

Adds the recording URL to the payload. Disable if you don't need recordings or want smaller payloads.

---

## Security

### Signature Verification

When you set a secret, Aloro signs each webhook:

```javascript
// Node.js example
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return signature === expectedSignature;
}
```

### Headers

Each webhook includes:

```
X-Aloro-Signature: sha256=<hash>
X-Aloro-Timestamp: 2024-03-15T14:30:00Z
Content-Type: application/json
```

---

## Testing

### Test Button

Use the **Test Request** button to send a sample payload:

1. Configure your webhook
2. Click **Test Request**
3. Check your endpoint for the test payload

### Test Payload

```json
{
  "event": "call.ended",
  "test": true,
  "data": {
    "call": {
      "id": "test_call_123",
      "phone": "+15555555555",
      "status": "completed",
      "duration": 120
    },
    "variables": {
      "status": true,
      "summary": "This is a test webhook"
    }
  }
}
```

---

## Integration Examples

### HubSpot CRM

```javascript
// Webhook handler
app.post('/webhook/aloro', async (req, res) => {
  const { call, variables } = req.body.data;
  
  // Find contact by phone
  const contact = await hubspot.contacts.getByPhone(call.phone);
  
  // Update contact properties
  await hubspot.contacts.update(contact.id, {
    properties: {
      last_call_status: call.status,
      last_call_summary: variables.summary,
      last_call_date: call.ended_at
    }
  });
  
  // Add note
  await hubspot.notes.create({
    engagement: { type: 'NOTE' },
    associations: { contactIds: [contact.id] },
    metadata: { body: variables.summary }
  });
  
  res.sendStatus(200);
});
```

### Google Sheets

```javascript
const { GoogleSpreadsheet } = require('google-spreadsheet');

app.post('/webhook/aloro', async (req, res) => {
  const doc = new GoogleSpreadsheet('SPREADSHEET_ID');
  await doc.useServiceAccountAuth(credentials);
  
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({
    Date: req.body.data.call.ended_at,
    Phone: req.body.data.call.phone,
    Duration: req.body.data.call.duration,
    Status: req.body.data.call.status,
    Summary: req.body.data.variables.summary
  });
  
  res.sendStatus(200);
});
```

### Slack Notification

```javascript
const { WebClient } = require('@slack/web-api');

app.post('/webhook/aloro', async (req, res) => {
  const slack = new WebClient(process.env.SLACK_TOKEN);
  const { call, variables, assistant } = req.body.data;
  
  if (variables.lead_qualified) {
    await slack.chat.postMessage({
      channel: 'sales-leads',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `🎯 *New Qualified Lead!*\nPhone: ${call.phone}\nSummary: ${variables.summary}`
          }
        }
      ]
    });
  }
  
  res.sendStatus(200);
});
```

---

## Retry Logic

If your endpoint is unavailable, Aloro will retry:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 15 minutes |
| 5 | 1 hour |

After 5 failed attempts, the webhook is marked as failed.

---

## Best Practices

### Endpoint Design

- Return `200 OK` quickly (within 5 seconds)
- Process data asynchronously if slow
- Make endpoint idempotent

### Error Handling

```javascript
app.post('/webhook/aloro', async (req, res) => {
  // Acknowledge immediately
  res.sendStatus(200);
  
  // Process in background
  try {
    await processCallData(req.body);
  } catch (error) {
    console.error('Webhook processing failed:', error);
    // Alert your team
  }
});
```

### Security

- Always verify signatures
- Use HTTPS endpoints
- Keep secrets secure
- Rotate secrets periodically

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Not receiving webhooks | Check endpoint URL, verify firewall |
| Timeout errors | Process asynchronously |
| Invalid signature | Verify secret configuration |
| Missing data | Check payload options enabled |

---

## Next Steps

- [Call Insights](/docs/calls/insights) - Configure post-call variables
- [Campaigns](/docs/campaigns/overview) - Use webhooks with campaigns
