---
sidebar_position: 4
---

# Assistant Configuration

Configure every aspect of your AI assistant through the settings modal.

## General Settings

![General Settings](/img/assistant-general.png)

| Field | Description |
|-------|-------------|
| **Name** | Display name for the assistant |
| **Direction** | Inbound or Outbound |
| **Description** | Internal notes about purpose |
| **Phone Numbers** | Numbers assigned to this assistant |

### Direction Selection

- **Inbound**: Assistant receives calls. Configure greeting and initial message.
- **Outbound**: Assistant makes calls. Used in campaigns.

---

## Language & Model

### Language Selection

Choose the primary language your assistant speaks. The AI will automatically detect and respond in the caller's language.

### LLM Model Selection

| Model | Best For | Latency |
|-------|----------|---------|
| **GPT-5 Mini** | Balanced reasoning, most use cases | Medium |
| **GPT-5 Realtime** | Speech-to-Speech mode | Low |
| **GPT-4o** | Complex tasks, detailed reasoning | Higher |
| **Gemini Flash 2.0** | Minimal latency | Very Low |
| **Gemini Flash 2.5** | Fast with improved quality | Very Low |

### Temperature

Controls response creativity:

```
0.0 ───────────────────────────────────────────── 1.0
 │                                                    │
Consistent, predictable                    Creative, varied
```

- **Default**: 0.1 (stable, professional responses)
- **Higher (0.5+)**: More conversational variety
- **Lower (0.0-0.1)**: Consistent, predictable outputs

:::tip Recommendation
Start with 0.1 for most business use cases. Increase for more conversational scenarios.
:::

---

## Voice Configuration

### Voice Engine Modes

| Mode | How It Works | Latency | Best For |
|------|-------------|---------|----------|
| **Pipeline** | STT → LLM → TTS | 800-1500ms | Complex reasoning, all voices |
| **Speech-to-Speech** | Direct multimodal | 300-600ms | Fast back-and-forth |
| **Dualplex** | Multimodal + premium TTS | Low | Fast with premium voices |

### Voice Selection

Choose from built-in voices or create custom clones:

**Built-in Voices:**
- Filter by provider (ElevenLabs, Cartesia)
- Filter by language
- Filter by gender
- Preview before selecting

**Voice Cloning:**

![Voice Cloning](/img/voice-cloning.png)

| Provider | Requirements |
|----------|-------------|
| **Cartesia** | 10+ seconds, single speaker, no background noise |
| **ElevenLabs** | 1+ minute samples, max 5 minutes total |

### Filler Audio

Natural sounds during processing to eliminate dead air:

- "Hmm", "Okay", "I understand", "One moment"
- Language-aware phrases
- Keeps callers engaged during AI processing

**Categories:**
- **Positive**: "Great!", "Perfect!", "Super!"
- **Neutral**: "Okay.", "I understand.", "Got it."
- **Question**: "Right?", "How so?"

### Ambient Sound

Optional background audio for realism:
- Office environment sounds
- Adjustable volume
- None (default)

---

## Tools

### Built-in Tools

| Tool | Description |
|------|-------------|
| **End Call** | Politely wrap up and disconnect |
| **Transfer** | Route to human/department |
| **Appointment Scheduler** | Book via Cal.com, Calendly, GoHighLevel |
| **DTMF Input** | Send keypad inputs for IVR |

### Custom Mid-Call Tools

Create API integrations callable during conversations:

![Mid-Call Tools](/img/mid-call-tools.png)

**Configuration:**
```json
{
  "name": "check_order_status",
  "description": "Check the status of a customer's order",
  "endpoint": "https://api.example.com/orders/{order_id}",
  "method": "GET",
  "headers": {
    "Authorization": "Bearer YOUR_API_KEY"
  },
  "parameters": [
    {
      "name": "order_id",
      "type": "string",
      "required": true
    }
  ]
}
```

**Testing:** Built-in test button with auto-generated dummy data.

---

## Variables

### Pre-Call Variables

Data passed before the call starts:

**Usage in prompts:**
```text
Hello {customer_name}, thank you for calling about your {account_type} account.
```

**Sources:**
- Manual entry
- CSV import
- CRM integration
- Automation platform

### Post-Call Variables

Data extracted after the call ends:

**Default variables:**
- `status` (boolean) - Call success
- `summary` (string) - Call summary

**Custom variables:**

| Type | Example |
|------|---------|
| **String** | `interest_level`: "hot", "warm", "cold" |
| **Number** | `products_discussed`: 3 |
| **Boolean** | `meeting_scheduled`: true |
| **Date** | `callback_date`: "2024-03-15" |
| **Enum** | `outcome`: ["qualified", "not_qualified", "callback"] |

**Example configuration:**

```json
{
  "post_call_variables": [
    {
      "name": "meeting_scheduled",
      "type": "boolean",
      "description": "Whether a meeting was booked"
    },
    {
      "name": "interest_level",
      "type": "enum",
      "options": ["hot", "warm", "cold"],
      "description": "Lead interest level"
    },
    {
      "name": "objection_reason",
      "type": "string",
      "description": "Main objection if not interested"
    }
  ]
}
```

---

## Advanced Settings

### Voice Activity Detection (VAD)

Controls interruption sensitivity:

| Setting | Effect |
|---------|--------|
| **High sensitivity** | Less interruption, more pauses |
| **Low sensitivity** | May talk over user |

### Duration Settings

| Setting | Range | Default |
|---------|-------|---------|
| **Max Call Duration** | 20-1200s | 600s (10 min) |
| **Max Silence Duration** | 1-120s | 40s |
| **Re-engagement Interval** | 7-600s | 30s |
| **Ringing Time** | 1-60s | 30s |

### Audio Enhancement

| Feature | Description |
|---------|-------------|
| **Noise Cancellation** | Filters caller background noise |
| **End Call on Voicemail** | Detect voicemail and hang up |
| **Record Calls** | Enable/disable call recording |

### Initial Message

The first thing your assistant says:

```text
Hello! Thank you for calling. How can I help you today?
```

:::tip Pronunciation Tips
Use diacritics for better pronunciation. Keep the message 5-10 seconds long.
:::

### Initial Audio (Optional)

Pre-recorded MP3/WAV file instead of TTS:
- Professional voice actor recording
- Perfect pronunciation
- Best combined with voice cloning from same voice

---

## Who Speaks First

Configure who initiates the conversation:

| Option | Behavior |
|--------|----------|
| **AI Assistant** | Starts with greeting (default) |
| **Customer** | AI waits for caller to speak first |

---

## Next Steps

- [Testing Your Assistant](/docs/assistants/testing)
- [Knowledge Bases](/docs/knowledge-bases/overview)
- [Webhooks](/docs/webhooks/post-call)
