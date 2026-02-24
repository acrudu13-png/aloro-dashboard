---
sidebar_position: 17
---

# Glossary

Key terms and concepts used throughout the Aloro platform.

## A

### AI Assistant
A configurable AI voice agent that handles calls and conversations. Each assistant has a voice, prompt, tools, and phone numbers.

### Ambient Sound
Optional background audio (e.g., office sounds) that plays during AI processing to create a more natural experience.

### Aggregation
Statistical calculation applied to data (COUNT, SUM, AVG, MAX, MIN) for dashboard widgets.

---

## B

### Built-in Tools
Pre-configured capabilities available to all assistants:
- End Call
- Transfer
- Appointment Scheduler
- DTMF Input

---

## C

### Campaign
Automated outbound calling operation that contacts a list of leads using an AI assistant with configurable scheduling and retry logic.

### Caller ID
A phone number type that uses your existing number for outbound calls only. Recipients see your number, but inbound calls go to your existing system.

### Conversation
Text-based interaction tracked separately from voice calls. Sources include Test Chat, Web Widget, and WhatsApp.

### Custom Mid-Call Tool
API integration that can be invoked by the AI during a conversation to fetch data or perform actions.

---

## D

### Dedicated Number
A full-featured phone number purchased through Aloro that supports both inbound and outbound calls.

### Direction
Whether an assistant handles **Inbound** (receives calls) or **Outbound** (makes calls) conversations.

### Dualplex
Hybrid voice engine mode combining multimodal processing with ElevenLabs TTS for low latency and premium voice quality.

### DTMF
Dual-Tone Multi-Frequency signaling. Keypad inputs used to navigate IVR systems.

---

## E

### E.164 Format
International phone number format: `+1234567890`. Always use this format for phone numbers in Aloro.

---

## F

### Filler Audio
Natural sounds ("hmm", "okay", "I understand") played during AI processing to eliminate dead air and keep callers engaged.

### Flow Builder
Visual drag-and-drop interface for designing conversation flows with nodes and branching paths.

### Function Call Mode
Knowledge Base integration mode where the AI searches only when needed. More efficient and faster.

---

## G

### Goal Variable
A post-call variable used to determine campaign success. Campaigns can retry until a goal variable is true.

---

## H

No terms starting with H.

---

## I

### Initial Message
The first thing an AI assistant says when a call connects.

### Initial Audio
Pre-recorded audio file played instead of TTS for the greeting. Provides perfect pronunciation.

---

## K

### Knowledge Base (KB)
A collection of documents and web pages indexed for AI reference during conversations.

---

## L

### Lead
A contact to be called in a campaign. Leads have status (Created, Scheduled, Processing, Completed, etc.) and can have pre-call variables.

### LLM
Large Language Model. The AI model that processes language and generates responses (e.g., GPT-5, Gemini Flash).

---

## M

### Mid-Call Tool
See Custom Mid-Call Tool.

---

## N

### Node
A component in the Flow Builder:
- **Start** (green) - Entry point
- **Speak** (blue) - Pre-written message
- **Prompt** (purple) - AI instructions
- **Action** (orange) - Tools/integrations
- **End** (red) - Call conclusion

---

## P

### Pipeline Mode
Standard voice engine mode: Speech-to-Text → LLM → Text-to-Speech. 800-1500ms latency.

### Post-Call Variables
Data extracted from the conversation after it ends. Includes default fields (status, summary) and custom fields.

### Pre-Call Variables
Data passed to the assistant before the call starts, used for personalization with `{variable_name}` syntax.

### Prompt
Instructions that define the AI assistant's behavior, knowledge, and conversation style.

### Prompt Injection Mode
Knowledge Base integration mode where content is searched after every message. Slower but more thorough.

---

## Q

No terms starting with Q.

---

## R

### Retry Logic
Campaign configuration determining how many times to retry failed calls and the interval between attempts.

---

## S

### Sender
A phone number registered for WhatsApp Business messaging.

### SIP Integration
Connection to existing PBX/VOIP systems for using your current phone infrastructure with Aloro.

### Speech-to-Speech
Direct multimodal voice engine mode with 300-600ms latency. Best for fast back-and-forth conversations.

### Status Badge
Visual indicator showing the state of items (Draft, In Progress, Paused, Completed, Failed, Processing, Pending).

### System Prompt
The core instructions that define the AI assistant's behavior and capabilities.

---

## T

### Temperature
LLM setting controlling response creativity. Range 0.0-1.0. Lower = more predictable, higher = more creative.

### Template
Pre-approved WhatsApp message format required for business-initiated messaging outside the 24-hour window.

### Test Chat
Text-based testing interface for rapid assistant iteration without voice latency.

### 24-Hour Window
WhatsApp messaging rule: after a customer messages you, you have 24 hours to send free-form messages. After that, templates are required.

---

## V

### VAD (Voice Activity Detection)
Technology that detects when a person is speaking. Affects interruption sensitivity.

### Voice Cloning
Creating a custom voice from audio samples. Available for ElevenLabs and Cartesia providers.

### Voice Engine
The technology stack for voice processing: Pipeline, Speech-to-Speech, or Dualplex modes.

---

## W

### Web Widget
Embeddable component for websites providing voice and/or chat capabilities.

### Webhook
HTTP callback that sends call data to external systems after conversations end.

---

## Numbers

### 24-Hour Window
See "T" section above.

---

## Common Abbreviations

| Abbreviation | Full Term |
|--------------|-----------|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| CRM | Customer Relationship Management |
| CSV | Comma-Separated Values |
| DTMF | Dual-Tone Multi-Frequency |
| FAQ | Frequently Asked Questions |
| IVR | Interactive Voice Response |
| KB | Knowledge Base |
| LLM | Large Language Model |
| PBX | Private Branch Exchange |
| SIP | Session Initiation Protocol |
| SMS | Short Message Service |
| STT | Speech-to-Text |
| TTS | Text-to-Speech |
| VAD | Voice Activity Detection |
| VOIP | Voice over Internet Protocol |

---

## Related Resources

- [Quick Start Guide](/docs/getting-started/quickstart) - Get started quickly
- [Assistants Overview](/docs/assistants/overview) - Core concepts
- [API Documentation](#) - Technical reference
