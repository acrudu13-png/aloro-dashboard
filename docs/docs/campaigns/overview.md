---
sidebar_position: 8
---

# Campaigns Overview

Automate outbound calling to reach leads at scale with AI-powered conversations.

## What Are Campaigns?

Campaigns are automated outbound calling operations that:
- Call a list of leads using an AI assistant
- Follow configurable schedules and retry logic
- Track results and extract conversation insights

---

## Campaign Status

| Status | Description |
|--------|-------------|
| **Draft** | Being configured, not calling |
| **In Progress** | Actively calling leads |
| **Paused** | Temporarily stopped |
| **Completed** | All leads processed |

---

## Creating a Campaign

### Prerequisites

Before creating a campaign:

1. **Outbound assistant** - An assistant configured for outbound calls
2. **Phone number** - A number assigned to the assistant
3. **Account balance** - Sufficient credits for calls
4. **Leads** - Contact list ready to import

### Campaign Setup

1. Navigate to **Campaigns**
2. Click **Create Campaign**
3. Configure settings:

![Create Campaign](/img/create-campaign.png)

#### Basic Information

| Field | Description |
|-------|-------------|
| **Name** | Campaign name for identification |
| **Assistant** | AI assistant to use for calls |
| **Phone Number** | Number to call from |

---

## Scheduling

### Calling Hours

Set when calls can be made:

| Setting | Default | Range |
|---------|---------|-------|
| **Start Time** | 00:00 | Any time |
| **End Time** | 23:59 | Any time |
| **Timezone** | Assistant's timezone | All timezones |

### Allowed Days

Select which days calls can be made:

- **Custom** - Select individual days (Mon-Sun)
- **Business Days** - Monday through Friday only
- **Every Day** - All days

:::warning Legal Compliance
Always respect calling time regulations in your jurisdiction. Many regions restrict calling hours and require opt-out mechanisms.
:::

---

## Retry Logic

Configure how the campaign handles failed attempts:

### Retry Settings

| Setting | Default | Range |
|---------|---------|-------|
| **Max Retries** | 3 | 1-5 |
| **Retry Interval** | 60 min | 10-4320 min |

### Retry Conditions

| Option | Description |
|--------|-------------|
| **Retry on voicemail** | Retry if voicemail detected |
| **Retry until goal** | Keep trying until a variable is true |

### Goal-Based Retries

Set a post-call variable as the success condition:

```
Retry until: meeting_scheduled = true
```

The campaign will retry leads until this condition is met.

---

## Lead Management

### Adding Leads

**Methods:**

1. **Manual Entry** - Add leads one by one
2. **CSV Import** - Bulk upload from spreadsheet
3. **Integration** - Import from GoHighLevel, Google Sheets

### CSV Format

```csv
phone,name,company,email,account_type
+1234567890,John Smith,Acme Corp,john@acme.com,premium
+0987654321,Jane Doe,Biz Inc,jane@biz.com,standard
```

### Lead Types

| Type | Description |
|------|-------------|
| **Primary** | Main contact to call |
| **Secondary** | Backup number if primary fails |

### Lead Status

| Status | Description |
|--------|-------------|
| **Created** | Ready to be called |
| **Scheduled** | Queued for next attempt |
| **Processing** | Currently being called |
| **Completed** | Successfully contacted |
| **Rescheduled** | Scheduled for retry |
| **Max Retries** | Reached max attempts |

### Managing Leads

- **Reset to Created** - Allow another call attempt
- **Mark Completed** - Stop calling this lead
- **Remove** - Delete from campaign

---

## Monitoring Campaigns

### Real-Time Metrics

| Metric | Description |
|--------|-------------|
| **Calls in Progress** | Active calls right now |
| **Calls Completed** | Total completed calls |
| **Leads Remaining** | Leads still to call |
| **Next Call Time** | When the next call will be made |

### Call Results

Track outcomes for each lead:

| Result | Description |
|--------|-------------|
| **Initiated** | Call started |
| **Ringing** | Waiting for answer |
| **In Progress** | Conversation happening |
| **Completed** | Call finished |
| **Busy** | Line busy |
| **Unanswered** | No answer |
| **Failed** | Technical error |

---

## Best Practices

### Timing

:::tip Optimal Calling Times
- **B2B**: Tuesday-Thursday, 10am-4pm local time
- **B2C**: Evenings and weekends often work better
- Always consider timezone differences
:::

### Lead Quality

- Clean your list before importing
- Remove invalid numbers
- Deduplicate contacts
- Include relevant pre-call variables

### Assistant Preparation

- Test thoroughly before campaign launch
- Include clear introduction and purpose
- Handle objections gracefully
- Collect key variables efficiently

### Compliance

- Honor do-not-call lists
- Provide opt-out mechanism
- Follow local regulations (TCPA, GDPR, etc.)
- Keep records of consent

---

## Example Campaign

### Appointment Reminder Campaign

**Goal**: Remind customers of upcoming appointments

**Setup:**
1. Import lead list with appointment details
2. Configure calling hours (9am-7pm)
3. Set 2 retries, 4 hours apart
4. Goal variable: `confirmed = true`

**Pre-call Variables:**
```json
{
  "customer_name": "John Smith",
  "appointment_date": "2024-03-15",
  "appointment_time": "2:00 PM",
  "service_type": "Oil Change"
}
```

**Prompt Excerpt:**
```text
Hello {customer_name}, this is a reminder from Auto Service about
your appointment on {appointment_date} at {appointment_time} for
a {service_type}. Can you confirm you'll be attending?
```

---

## Next Steps

- [Assistants](/docs/assistants/overview) - Configure outbound assistants
- [Post-Call Variables](/docs/calls/insights) - Track campaign outcomes
- [Webhooks](/docs/webhooks/post-call) - Sync results to your CRM
