---
sidebar_position: 2
---

# Quick Start Guide

Get your first AI assistant up and running in just a few minutes.

## Prerequisites

Before you begin, make sure you have:

- An Aloro account ([sign up here](https://aloro.ai))
- A phone number (can be purchased in the dashboard)
- Sufficient account balance for calls

## Step 1: Create an Assistant

1. Navigate to **Assistants** in the sidebar
2. Click **Create Assistant**
3. Fill in the basic information:

![Create Assistant](/img/create-assistant.png)

| Field | Description |
|-------|-------------|
| **Name** | A friendly name for your assistant |
| **Direction** | Inbound (receives calls) or Outbound (makes calls) |
| **Description** | Internal notes about the assistant's purpose |

## Step 2: Configure the Assistant

### Language & Model

Choose the language your assistant will speak and the AI model:

- **GPT-5 Mini** - Balanced performance for most use cases
- **Gemini Flash** - Minimal latency for fast conversations
- **GPT-4o** - Complex reasoning tasks

### Voice Selection

Select a voice for your assistant:

![Voice Selection](/img/voice-selection.png)

- Browse voices by provider (ElevenLabs, Cartesia)
- Filter by language and gender
- Preview voices before selecting

:::tip Voice Cloning
You can also clone a custom voice from audio samples. See [Voice Configuration](/docs/assistants/configuration#voice) for details.
:::

### System Prompt

Write instructions for your assistant:

```text
You are a helpful customer service assistant for Acme Corp.

Your responsibilities:
- Answer questions about products and services
- Help customers track orders
- Schedule callbacks for complex issues

Guidelines:
- Be friendly and professional
- Keep responses concise
- If you don't know something, offer to transfer to a human
```

## Step 3: Add a Phone Number

1. Go to **Phone Numbers** in the sidebar
2. Click **Add Number**
3. Choose a number type:
   - **Dedicated Number** - Best for most use cases
   - **Caller ID** - Use your existing number for outbound only

4. Assign the number to your assistant

## Step 4: Test Your Assistant

Before going live, test your assistant:

### Test Chat (Fastest)

1. Open your assistant
2. Click **Test Chat** button
3. Type messages to simulate a conversation
4. Review the AI's responses

![Test Chat](/img/test-chat.png)

### Web Call

1. Click **Web Call** button
2. Allow microphone access
3. Speak with your assistant through your browser

### Phone Call

1. Click **Phone Call** button
2. Enter a test phone number
3. Receive a real call from your assistant

:::warning Cost Warning
Web calls and phone calls deduct from your account balance. Test Chat is the most cost-effective way to iterate on your assistant.
:::

## Step 5: Go Live

Once you're satisfied with your assistant:

1. Ensure your phone number is active
2. For inbound: Share the number with customers
3. For outbound: Create a [Campaign](/docs/campaigns/overview) to start calling leads

## Next Steps

- **Add a Knowledge Base** - Give your assistant access to your documentation
- **Configure Webhooks** - Send call data to your CRM or database
- **Create a Campaign** - Start reaching out to leads at scale
- **Embed the Web Widget** - Add voice/chat to your website

:::info Need More Help?
Check out the detailed documentation for each feature:
- [Assistants Overview](/docs/assistants/overview)
- [Campaigns](/docs/campaigns/overview)
- [WhatsApp Integration](/docs/whatsapp/senders)
:::
