---
sidebar_position: 10
---

# WhatsApp Senders

Configure phone numbers for WhatsApp Business messaging.

## Overview

A **Sender** is a phone number registered with WhatsApp Business API that your AI assistants can use to send and receive messages.

---

## Number Types

| Type | Description | Best For |
|------|-------------|----------|
| **Platform Number** | Purchased through Aloro | Quick setup, full automation |
| **External Number** | Your existing mobile number | Keep your current number |

---

## Setting Up a Platform Number

### Step 1: Select Number

1. Go to **WhatsApp > Senders**
2. Click **Add Sender**
3. Choose **Platform Number**
4. Browse available numbers

![Select Platform Number](/img/whatsapp-platform-number.png)

### Step 2: Configure

| Field | Description |
|-------|-------------|
| **Display Name** | Business name shown to customers |
| **Business Profile** | Optional business details |

### Step 3: Verification

1. Click **Start Verification**
2. AI-assisted voice call (1-2 minutes)
3. Answer the call and follow prompts

### Step 4: Meta Connection

1. Click **Connect via Meta**
2. Complete Embedded Signup
3. **Important**: Create a NEW WhatsApp Business Account (not your existing one)

:::warning Critical Step
Always create a NEW WhatsApp Business Account during setup. Connecting an existing account can cause issues.
:::

---

## Setting Up an External Number

### Step 1: Enter Number

1. Go to **WhatsApp > Senders**
2. Click **Add Sender**
3. Choose **External Number**
4. Enter phone number in E.164 format: `+1234567890`

### Step 2: Configure

| Field | Description |
|-------|-------------|
| **Display Name** | Business name shown to customers |

### Step 3: Meta Login

1. Click **Login with Facebook**
2. Authorize the connection

### Step 4: Verification

Choose verification method:
- **SMS** - Receive 6-digit code via text
- **Voice Call** - Receive code via phone call

Enter the code to complete setup.

---

## Sender Status

| Status | Description | Action Needed |
|--------|-------------|---------------|
| 🟢 **Online** | Fully operational | None |
| 🔵 **Connecting** | Being initialized | Wait |
| 🟡 **Pending** | Awaiting verification | Complete verification |
| ⚫ **Offline** | Manually disabled | Re-enable if needed |
| 🔴 **Suspended** | Meta policy violation | Contact support |
| ❌ **Failed** | Setup failed | Retry setup |

---

## Managing Senders

### Assigning to Assistants

1. Open the sender
2. Select which assistants can use it
3. Save changes

### Quality Rating

Meta assigns quality ratings based on user feedback and blocking:

| Rating | Daily Limit | Status |
|--------|-------------|--------|
| **New Sender** | ~250 | Building reputation |
| **Low** | 1,000 | Issues detected |
| **Medium** | 10,000 | Good standing |
| **High** | 100,000+ | Excellent reputation |

### Improving Quality

- Get users to save your number
- Encourage replies to your messages
- Avoid spammy content
- Honor opt-outs quickly

---

## 24-Hour Messaging Window

### How It Works

```
Customer sends message
        ↓
24-hour window opens
        ↓
Send any free-form messages
        ↓
24 hours pass
        ↓
Must use approved templates
```

### Within the Window

- Free-form text messages
- Images and media
- Quick replies
- Full AI conversation

### After the Window

- Must use approved [Templates](/docs/whatsapp/templates)
- Customer message reopens window
- Cannot send free-form text

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Verification failed | Check number format (E.164), try different method |
| Sender suspended | Review Meta policies, contact support |
| Low quality rating | Improve content, reduce spam reports |
| Messages not sending | Check window status, verify template approval |

### Number Format

Always use E.164 format:
- ✅ `+1234567890`
- ✅ `+40721234567`
- ❌ `0721 234 567`
- ❌ `(123) 456-7890`

---

## Best Practices

### Setup

- Use a dedicated business number
- Complete business profile fully
- Keep verification codes secure

### Usage

- Respond promptly to customer messages
- Keep conversations within 24h window
- Use templates for outbound initiation
- Honor opt-out requests immediately

### Quality

- Send valuable, relevant content
- Avoid excessive messaging
- Monitor quality rating
- Address user complaints quickly

---

## Next Steps

- [WhatsApp Templates](/docs/whatsapp/templates) - Create approved message templates
- [Conversations](/docs/conversations/overview) - View WhatsApp conversation history
