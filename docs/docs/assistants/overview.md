---
sidebar_position: 3
---

# Assistants Overview

Assistants are the core of the Aloro platform. Each assistant is an AI voice agent that can handle calls, messages, and conversations.

## What is an Assistant?

An assistant is a configurable AI agent with:

- **A voice** - The sound and personality of your agent
- **A prompt** - Instructions that define behavior and knowledge
- **Tools** - Capabilities like transferring calls or booking appointments
- **Phone numbers** - One or more numbers the assistant uses

## Assistant Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Inbound** | Receives calls from customers | Customer support, information hotlines |
| **Outbound** | Makes calls to leads/customers | Sales campaigns, appointment reminders |

## Managing Assistants

### Creating an Assistant

1. Navigate to **Assistants** in the sidebar
2. Click **Create Assistant**
3. Configure the assistant (see [Configuration](/docs/assistants/configuration))
4. Save and test

![Assistants List](/img/assistants-list.png)

### Assistant Card Actions

Each assistant card shows:

- **Name and description**
- **Assigned phone numbers**
- **Quick action buttons**:
  - **Test Chat** - Text-based testing
  - **Web Call** - Browser voice call
  - **Phone Call** - Real outbound call
  - **Web Widget** - Configure embeddable widget
  - **Duplicate** - Create a copy
  - **Delete** - Remove the assistant

### Status Indicators

| Status | Description |
|--------|-------------|
| 🟢 Active | Ready to handle calls |
| 🟡 Draft | Still being configured |
| 🔴 Inactive | Not available for calls |

## Key Configuration Areas

### 1. General Settings

Basic information and phone number assignment.

### 2. Language & Model

- Primary language selection
- LLM model choice
- Temperature for creativity control

### 3. Voice Configuration

- TTS provider selection
- Voice library or custom cloning
- Filler audio and ambient sounds

### 4. Tools

Built-in and custom tools the assistant can use:
- End call
- Transfer to human
- Schedule appointments
- Custom API integrations

### 5. Variables

Data passed to or extracted from conversations:
- Pre-call variables (context before the call)
- Post-call variables (data extracted after)

### 6. Advanced Settings

- Interruption handling
- Call duration limits
- Noise cancellation
- Voicemail detection

## Next Steps

- [Configuration Details](/docs/assistants/configuration) - Deep dive into all settings
- [Testing](/docs/assistants/testing) - How to test your assistants
- [Knowledge Bases](/docs/knowledge-bases/overview) - Add documentation to your assistants
