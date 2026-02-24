---
sidebar_position: 7
---

# Call Insights

Deep dive into post-call variables and conversation analytics.

## What Are Post-Call Variables?

Post-call variables are data points extracted from the conversation after it ends. The AI analyzes the entire transcript to populate these fields.

### Default Variables

| Variable | Type | Description |
|----------|------|-------------|
| `status` | boolean | Whether the call was successful |
| `summary` | string | Brief summary of the conversation |

### Custom Variables

Define custom variables based on your use case:

#### Variable Types

| Type | Use Case | Example |
|------|----------|---------|
| **String** | Free-text responses | `objection_reason` |
| **Number** | Quantitative data | `products_discussed` |
| **Boolean** | Yes/No outcomes | `meeting_scheduled` |
| **Date** | Date values | `callback_date` |
| **Enum** | Predefined options | `interest_level` |

#### Example Configuration

```json
{
  "variables": [
    {
      "name": "lead_qualified",
      "type": "boolean",
      "description": "Whether the lead meets qualification criteria"
    },
    {
      "name": "interest_level",
      "type": "enum",
      "options": ["hot", "warm", "cold"],
      "description": "Lead's level of interest"
    },
    {
      "name": "budget_discussed",
      "type": "boolean",
      "description": "Whether budget was mentioned"
    },
    {
      "name": "next_step",
      "type": "string",
      "description": "Agreed next action"
    },
    {
      "name": "callback_date",
      "type": "date",
      "description": "Scheduled callback date"
    }
  ]
}
```

---

## Configuring Variables

### In Assistant Settings

1. Open assistant configuration
2. Navigate to **Variables** section
3. Add or edit post-call variables

![Post-Call Variables Config](/img/post-call-variables.png)

### Best Practices

:::tip Prompt Instructions
Include explicit instructions in your prompt for extracting variables:

```text
After the conversation, extract:
- Whether the lead is qualified (lead_qualified)
- Their interest level: hot, warm, or cold (interest_level)
- Any agreed next step (next_step)
```
:::

### Variable Naming

- Use snake_case: `meeting_scheduled`, not `meetingScheduled`
- Be descriptive: `callback_date`, not `cbd`
- Keep it consistent across assistants

---

## Using Variable Data

### In Webhooks

Variables are included in webhook payloads:

```json
{
  "call_id": "call_abc123",
  "phone": "+1234567890",
  "duration": 180,
  "status": "completed",
  "variables": {
    "lead_qualified": true,
    "interest_level": "hot",
    "next_step": "Schedule demo for Friday",
    "callback_date": "2024-03-15"
  },
  "transcript": "...",
  "recording_url": "https://..."
}
```

### In Campaigns

Use variables to determine campaign logic:

- Retry until `lead_qualified` = true
- Skip leads where `interest_level` = "cold"
- Schedule callbacks based on `callback_date`

### In Custom Dashboards

Build analytics widgets using variable data:
- Count calls where `meeting_scheduled` = true
- Average `products_discussed` by assistant
- Distribution of `interest_level` values

---

## Insights Dashboard

### Variable Analytics

View aggregated insights across all calls:

| Insight | Description |
|---------|-------------|
| **Qualification Rate** | % of calls where lead was qualified |
| **Interest Distribution** | Breakdown of hot/warm/cold leads |
| **Meeting Rate** | % of calls resulting in scheduled meetings |
| **Common Objections** | Most frequent objection reasons |

### Filtering

Filter insights by:
- Date range
- Assistant
- Campaign
- Phone number
- Variable values

### Trending

Track how variables change over time:
- Is qualification rate improving?
- Are meetings increasing week over week?
- Which objections are becoming more common?

---

## Example Use Cases

### Sales Qualification

**Variables:**
```json
{
  "lead_qualified": "boolean",
  "interest_level": "enum [hot, warm, cold]",
  "budget_range": "string",
  "decision_maker": "boolean",
  "timeline": "string"
}
```

**Insights:**
- Qualification rate by assistant
- Most common disqualification reasons
- Budget distribution of qualified leads

### Appointment Scheduling

**Variables:**
```json
{
  "appointment_scheduled": "boolean",
  "appointment_date": "date",
  "appointment_time": "string",
  "appointment_type": "enum [in_person, phone, video]"
}
```

**Insights:**
- Scheduling success rate
- Preferred appointment types
- No-show prediction factors

### Customer Support

**Variables:**
```json
{
  "issue_resolved": "boolean",
  "issue_category": "enum [billing, technical, shipping, other]",
  "escalation_needed": "boolean",
  "csat": "number [1-5]"
}
```

**Insights:**
- Resolution rate by category
- Common issue types
- Escalation rate trends

---

## Next Steps

- [Post-Call Webhooks](/docs/webhooks/post-call) - Send variable data to your systems
- [Custom Dashboards](/docs/dashboards/custom) - Build visualizations with variable data
- [Campaigns](/docs/campaigns/overview) - Use variables in outbound logic
