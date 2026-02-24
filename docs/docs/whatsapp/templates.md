---
sidebar_position: 11
---

# WhatsApp Templates

Create and manage approved message templates for WhatsApp Business.

## What Are Templates?

Templates are pre-approved message formats required for:
- Starting new conversations (outside 24h window)
- Business-initiated messaging
- Ensuring compliance with WhatsApp policies

---

## Template Categories

| Category | Use Case | Approval Time |
|----------|----------|---------------|
| **Utility** | Order confirmations, shipping updates, appointments | Minutes |
| **Marketing** | Promotions, announcements, offers | Hours to 24h |
| **Authentication** | OTP codes, verification messages | Minutes |
| **Voice Call Request** | Request permission to call | Instant |

:::warning Category Selection
Using the wrong category can lead to rejection. Marketing templates have stricter review.
:::

---

## Template Structure

A template consists of:

### Header (Optional)

- **Text** - Short title or emphasis
- **Media** - Image, video, or document

### Body (Required)

The main message content. Use variables for personalization:

```
Hi {{1}}, your order {{2}} has shipped!
Expected delivery: {{3}}
```

### Footer (Optional)

- Up to 60 characters
- Often used for branding or disclaimers

### Buttons (Optional)

| Type | Description |
|------|-------------|
| **Quick Reply** | Pre-defined response buttons |
| **Call to Action** | URL or phone call buttons |
| **Voice Call Request** | Request a call from your AI |

---

## Creating a Template

### Step 1: Basic Info

1. Go to **WhatsApp > Templates**
2. Click **Create Template**
3. Fill in details:

| Field | Description |
|-------|-------------|
| **Name** | Internal identifier (lowercase, underscores) |
| **Category** | Utility, Marketing, Authentication, Voice Call |
| **Language** | Template language |

### Step 2: Content

#### Header

Choose type:
- **None** - No header
- **Text** - Short text header
- **Image/Video/Document** - Media header

#### Body

Write your message with variables:

```
Hello {{1}},

Your appointment on {{2}} at {{3}} has been confirmed.

Reply CANCEL to reschedule.
```

:::tip Variable Format
Use `{{1}}`, `{{2}}`, etc. for variables. Number them sequentially.
:::

#### Footer

Add optional footer text:

```
Acme Corp - We're here to help
```

#### Buttons

Add interactive elements:

**Quick Reply:**
```
[Confirm] [Reschedule] [Cancel]
```

**Call to Action:**
```
[Track Order] → https://example.com/track/{{1}}
```

### Step 3: Submit for Approval

1. Review your template
2. Click **Submit for Approval**
3. Wait for Meta review

---

## Approval Status

| Status | Description |
|--------|-------------|
| **Draft** | Not yet submitted |
| **Pending** | Under Meta review |
| **Approved** | Ready to use |
| **Rejected** | Review failed |

---

## Common Rejection Reasons

| Reason | Solution |
|--------|----------|
| Promotional content in Utility | Move to Marketing category |
| Missing variable samples | Provide clear sample values |
| Aggressive language | Use neutral, professional tone |
| URL shorteners | Use full URLs instead |
| Wrong category | Select appropriate category |
| Restricted content | Remove references to alcohol, gambling, etc. |

### Examples

#### ❌ Rejected (Utility with promotional content)

```
Header: EXCLUSIVE OFFER!
Body: Hi {{1}}, get 50% OFF your next order! Use code SAVE50. Shop now!
```
*Problem: Promotional content in Utility category*

#### ✅ Approved (Marketing)

```
Header: Special Offer for You
Body: Hi {{1}}, enjoy 50% off your next purchase! Use code SAVE50 at checkout. Valid until {{2}}.
Footer: Acme Store
```
*Correct category, clear variables*

---

## Using Templates

### Via Automation

Send templates through the automation platform:

1. **Trigger**: Call ended, schedule, etc.
2. **Action**: Send WhatsApp Template
3. **Map variables**: Pass data to template

### Variable Mapping

```json
{
  "template": "appointment_reminder",
  "variables": {
    "1": "John",
    "2": "March 15",
    "3": "2:00 PM"
  }
}
```

### After Sending

- Track delivery status
- Monitor if customer replies
- 24h window opens on reply

---

## Editing Templates

:::warning Limitation
You cannot edit approved templates. To make changes:
1. Create a new template
2. Wait for approval
3. Update your automation to use the new template
:::

---

## Template Examples

### Appointment Reminder (Utility)

```
Header: Appointment Reminder
Body: Hi {{1}}, this is a reminder of your {{2}} appointment on {{3}} at {{4}}.

Please reply CONFIRM to confirm or RESCHEDULE to change.
Footer: Acme Medical Clinic
Buttons: [CONFIRM] [RESCHEDULE]
```

### Order Confirmation (Utility)

```
Body: Your order #{{1}} has been confirmed!

Items: {{2}}
Total: {{3}}

Track your order: {{4}}
Footer: Thank you for shopping with us!
```

### Promotional (Marketing)

```
Header: 🎉 Limited Time Offer!
Body: Hi {{1}},

{{2}} is now {{3}}% off!

Offer ends {{4}}. Don't miss out!
Footer: Unsubscribe: Reply STOP
Buttons: [Shop Now] → https://shop.example.com/sale
```

### Verification Code (Authentication)

```
Body: Your verification code is {{1}}.

This code expires in {{2}} minutes.
Footer: Don't share this code
```

---

## Best Practices

### Content

- Keep messages clear and concise
- Use variables for personalization
- Include clear call-to-action
- Add opt-out for marketing

### Approval

- Choose correct category
- Provide realistic variable samples
- Avoid prohibited content
- Test before bulk sending

### Usage

- Monitor delivery rates
- Track customer responses
- Keep templates updated
- Remove unused templates

---

## Next Steps

- [WhatsApp Senders](/docs/whatsapp/senders) - Set up your phone numbers
- [Conversations](/docs/conversations/overview) - View WhatsApp conversations
