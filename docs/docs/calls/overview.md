---
sidebar_position: 6
---

# Calls Overview

Monitor and analyze all voice calls handled by your AI assistants.

## Call Log

The calls page shows a comprehensive list of all calls with filtering and details.

![Calls List](/img/calls-list.png)

### Call Information

Each call record includes:

| Field | Description |
|-------|-------------|
| **Phone Number** | Caller/callee number |
| **Assistant** | Which assistant handled the call |
| **Duration** | Length of the call |
| **Status** | Call outcome |
| **Cost** | Call cost in credits |
| **Timestamp** | When the call occurred |

### Call Statuses

| Status | Description |
|--------|-------------|
| **Initiated** | Call started |
| **Ringing** | Waiting for answer |
| **In Progress** | Active conversation |
| **Completed** | Successfully ended |
| **Busy** | Line was busy |
| **Unanswered** | No answer |
| **Failed** | Technical failure |
| **Voicemail** | Voicemail detected |

### Filtering

Filter calls by:
- **Date range** - Today, last 7 days, last 30 days, custom
- **Assistant** - Specific assistant
- **Status** - Call outcome
- **Phone number** - Search by number
- **Campaign** - Associated campaign

---

## Call Details

Click any call to expand or view detailed information.

### Transcript

Full conversation transcript with timestamps:

```
[00:00] AI: Hello! Thank you for calling. How can I help you today?
[00:03] Caller: I need to check on my order status
[00:06] AI: Of course! I'd be happy to help. What's your order number?
[00:10] Caller: It's 12345
[00:13] AI: Let me look that up for you...
[00:18] AI: I found your order. It's currently out for delivery.
```

### Audio Recording

If call recording is enabled:
- Play recording directly in browser
- Download for archival
- Share via link

### Variables Captured

Post-call variables extracted from the conversation:

| Variable | Value |
|----------|-------|
| `status` | `completed` |
| `order_checked` | `true` |
| `order_id` | `12345` |
| `customer_satisfied` | `true` |

### Metadata

- **Assistant used**
- **Phone number**
- **Campaign** (if applicable)
- **Cost breakdown**
- **API response times**

---

## Analytics

### Key Metrics

At the top of the calls page:

| Metric | Description |
|--------|-------------|
| **Total Calls** | Number of calls in period |
| **Completed Rate** | % of calls successfully completed |
| **Avg Duration** | Average call length |
| **Total Cost** | Credits spent in period |

### Trends

View call volume and success rates over time:
- Daily/weekly/monthly trends
- Compare periods
- Identify patterns

---

## Exporting

Export call data for external analysis:

1. Apply desired filters
2. Click **Export** button
3. Choose format (CSV, JSON)
4. Download file

---

## Related Features

- [Call Insights](/docs/calls/insights) - Deep dive into post-call variables
- [Conversations](/docs/conversations/overview) - Text-based interactions
- [Campaigns](/docs/campaigns/overview) - Outbound call automation
