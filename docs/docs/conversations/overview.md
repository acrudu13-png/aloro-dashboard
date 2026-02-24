---
sidebar_position: 9
---

# Conversations Overview

Track and manage all text-based interactions across channels.

## What Are Conversations?

Conversations are text-based interactions with your AI assistants, tracked separately from voice calls. They come from multiple sources:

| Source | Badge Color | Description |
|--------|-------------|-------------|
| **Test Chat** | 🟠 Orange | Testing via dashboard |
| **Web Widget** | 🟣 Purple | Website chat/voice widget |
| **WhatsApp** | 🟢 Green | WhatsApp Business messages |

---

## Conversations List

![Conversations List](/img/conversations-list.png)

### List Information

Each conversation shows:

| Field | Description |
|-------|-------------|
| **Source Badge** | Where the conversation originated |
| **Contact** | Phone number (WhatsApp) or identifier |
| **Assistant** | Which assistant handled it |
| **Last Message** | Preview of most recent exchange |
| **Messages** | Total message count |
| **Timestamp** | When the conversation occurred |

### Filtering

Filter conversations by:
- **Source** - Test Chat, Web Widget, WhatsApp
- **Assistant** - Specific assistant
- **Date range** - Today, last 7 days, custom
- **Status** - Active, ended

---

## Conversation Details

Click any conversation to view full details.

### Message History

Complete transcript with timestamps:

```
[10:30:15] User: Hi, I need help with my order
[10:30:18] AI: Hello! I'd be happy to help. What's your order number?
[10:30:45] User: It's ORD-12345
[10:30:52] AI: Let me check that for you...
[10:31:05] AI: Your order is currently in transit and should arrive tomorrow.
```

### Variables Collected

Pre-chat and extracted variables:

| Variable | Source | Value |
|----------|--------|-------|
| `customer_name` | Pre-chat form | John Smith |
| `order_id` | Extracted | ORD-12345 |
| `issue_resolved` | Post-conversation | true |

### Usage & Cost

- **Tokens used** - Total input/output tokens
- **Cost** - Credits consumed
- **Duration** - Conversation length

---

## WhatsApp Conversations

### 24-Hour Messaging Window

WhatsApp has strict rules about business messaging:

| Window Status | What You Can Do |
|---------------|-----------------|
| **Within 24h** | Send any free-form message |
| **After 24h** | Must use approved template |

The window opens when the customer sends a message.

### Media Support

| Media Type | Handling |
|------------|----------|
| **Images** | Analyzed with Vision AI |
| **Voice Notes** | Transcribed to text |
| **Documents** | Stored as attachments |

### Quality Rating

Your sender quality affects daily messaging limits:

| Quality | Daily Limit |
|---------|-------------|
| New Sender | ~250 |
| Low | 1,000 |
| Medium | 10,000 |
| High | 100,000+ |

---

## Web Widget Conversations

### Pre-Chat Form

If enabled, collect information before the conversation:

```
┌─────────────────────────────────┐
│  Before we start...             │
│                                 │
│  Name: [________________]       │
│  Email: [________________]      │
│  Reason for contact:            │
│  [Dropdown selection]           │
│                                 │
│  [Start Chat]                   │
└─────────────────────────────────┘
```

### Conversation Modes

| Mode | Description |
|------|-------------|
| **Voice & Chat** | User can switch between modes |
| **Chat Only** | Text-based only |
| **Voice Only** | Browser voice call |

---

## Test Chat Conversations

Test chat conversations are saved for review:

- Same AI logic as production
- Useful for prompt iteration
- Lower cost than voice testing
- Variables collected and displayed

---

## Using Conversation Data

### For Improvement

1. Review conversations regularly
2. Identify common questions/issues
3. Update prompts based on patterns
4. Add knowledge base content for gaps

### For Analytics

- Most common topics
- Resolution rates
- Peak conversation times
- Assistant performance comparison

### For Training

- Export conversations for team review
- Use as examples in prompt refinement
- Identify successful interaction patterns

---

## Related Topics

- [Web Widget Configuration](/docs/web-widget/configuration) - Set up your website widget
- [WhatsApp Senders](/docs/whatsapp/senders) - Configure WhatsApp Business
- [Assistants](/docs/assistants/overview) - Manage AI assistants
