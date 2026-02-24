---
sidebar_position: 14
---

# Phone Numbers Overview

Manage phone numbers for your AI assistants.

## Number Types

| Type | Inbound | Outbound | Monthly Fee | Best For |
|------|---------|----------|-------------|----------|
| **Dedicated** | ✅ | ✅ | From $3.99/mo | Full-featured use |
| **SIP Integration** | ✅ | ✅ | $0.00045/min | Existing PBX/VOIP |
| **Caller ID** | ❌ | ✅ | Per-minute | Outbound only |

---

## Dedicated Numbers

Full-featured phone numbers purchased through Aloro.

### Features

- ✅ Receive inbound calls
- ✅ Make outbound calls
- ✅ SMS capable (select numbers)
- ✅ WhatsApp compatible

### Purchasing a Number

1. Navigate to **Phone Numbers**
2. Click **Add Number**
3. Select **Dedicated Number**
4. Browse available numbers

![Browse Numbers](/img/browse-numbers.png)

### Selection Criteria

| Filter | Description |
|--------|-------------|
| **Country** | Select country code |
| **Type** | Local, Toll-free, Mobile |
| **Features** | SMS, Voice, WhatsApp |
| **Pattern** | Search for specific digits |

### Pricing

| Type | Starting Price |
|------|----------------|
| **Local** | $3.99/month |
| **Toll-free** | $5.99/month |
| **Mobile** | $4.99/month |

:::note Availability
Number availability and pricing vary by country and type. Some premium numbers cost more.
:::

---

## SIP Integration

Connect your existing PBX or VOIP system.

### How It Works

```
Incoming Call → SIP System → Aloro AI → Response → Back to SIP
```

### Benefits

- Use existing phone infrastructure
- No new number needed
- Lower per-minute cost
- Keep current phone system

### Setup

1. Navigate to **Phone Numbers**
2. Click **Add Number**
3. Select **SIP Integration**
4. Enter your SIP details:

| Field | Description |
|-------|-------------|
| **SIP URI** | Your SIP endpoint |
| **Username** | SIP authentication user |
| **Password** | SIP authentication password |

### Requirements

- SIP-compatible PBX or VOIP provider
- Public IP or SIP trunk
- Proper firewall configuration

---

## Caller ID

Use your existing phone number for outbound calls only.

### How It Works

- Aloro makes calls using your number as caller ID
- Recipients see your business number
- Inbound calls go to your existing system

### Setup

1. Navigate to **Phone Numbers**
2. Click **Add Number**
3. Select **Caller ID**
4. Enter your phone number
5. Verify ownership (SMS or call)

### Verification

| Method | Process |
|--------|---------|
| **SMS** | Receive code via text |
| **Voice Call** | Receive automated call with code |

Enter the verification code to confirm ownership.

### Limitations

- ❌ Cannot receive calls through Aloro
- ❌ No SMS functionality
- ❌ WhatsApp not available
- ✅ Only for outbound calls

---

## Assigning Numbers to Assistants

### Single Assignment

1. Open the phone number
2. Select **Assigned Assistant**
3. Choose from dropdown
4. Save changes

### Multiple Assistants

A number can only be assigned to one assistant at a time. To use the same number for multiple purposes:

- Use different assistants for different campaigns
- Route based on time of day
- Use a single assistant with multiple capabilities

---

## Number Management

### Status Indicators

| Status | Description |
|--------|-------------|
| 🟢 **Active** | Ready for use |
| 🟡 **Pending** | Setup in progress |
| 🔴 **Inactive** | Disabled or expired |

### Actions

| Action | Description |
|--------|-------------|
| **Edit** | Change settings |
| **Transfer** | Move to different assistant |
| **Release** | Remove from account |

:::warning Releasing Numbers
Released numbers cannot be recovered. Make sure to update any published contact information.
:::

---

## Availability & Pricing

### Number Search

When browsing numbers, you'll see:

| Indicator | Meaning |
|-----------|---------|
| ✅ Available | Ready to purchase |
| ⏳ Limited | Few remaining |
| ❌ Unavailable | Already taken |

### Cost Display

- Monthly fee shown upfront
- Per-minute rates vary by destination
- SMS rates displayed separately

---

## International Numbers

### Supported Countries

Aloro offers numbers in many countries. Popular options include:

| Region | Countries |
|--------|-----------|
| **North America** | US, Canada, Mexico |
| **Europe** | UK, Germany, France, Spain, Italy, Romania |
| **Asia-Pacific** | Australia, Japan, Singapore |

### Considerations

- Some countries require local business registration
- Verification may take longer
- Pricing varies significantly

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Number not working | Check assignment to assistant |
| Cannot receive calls | Verify inbound is enabled |
| Caller ID not verified | Retry verification process |
| SIP not connecting | Check firewall and credentials |
| International restrictions | Verify country requirements |

### Audio Quality

For best call quality:
- Use dedicated numbers over SIP when possible
- Ensure stable internet connection
- Monitor call logs for issues

---

## Best Practices

### Choosing a Number

- Use local numbers for regional presence
- Use toll-free for national businesses
- Consider memorable patterns

### Managing Numbers

- Keep numbers assigned to active assistants
- Monitor usage and costs
- Release unused numbers to save costs

### Compliance

- Follow local regulations
- Maintain proper caller ID
- Honor do-not-call requests

---

## Next Steps

- [Assistants](/docs/assistants/overview) - Assign numbers to assistants
- [Campaigns](/docs/campaigns/overview) - Use numbers in outbound campaigns
- [WhatsApp Senders](/docs/whatsapp/senders) - Enable WhatsApp on numbers
