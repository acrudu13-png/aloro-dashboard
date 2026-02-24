# Autocalls.ai Competitor Research

> Thorough analysis of Autocalls.ai platform documentation for dashboard feature ideas
> Research date: 2025-02-24
> Focus: Platform Guide (excluding API docs, Whitelabel, No-code Automation)

---

## 1. Platform Overview

Autocalls.ai is an AI voice calling platform with three core capabilities:
- **AI Assistants** - Voice agents with configurable prompts, tools, and voices
- **Campaigns** - Outbound calling automation with retry logic
- **Conversations** - Text-based chat via web widget, WhatsApp, test interface

---

## 2. AI Assistants - Core Features

### 2.1 Assistant Modes (Voice Engines)

Three modes for voice generation:

| Mode | How It Works | Latency | Best For |
|------|-------------|---------|----------|
| **Pipeline** | STT → LLM → TTS | 800-1500ms | Complex reasoning, long replies, all voices |
| **Speech-to-Speech** | Direct multimodal | 300-600ms | Fast back-and-forth, short replies |
| **Dualplex (Beta)** | Multimodal + ElevenLabs TTS | Low | Fast replies with premium/cloned voices |

**Dashboard idea:** Voice engine selector with latency/quality tradeoff visualization.

### 2.2 Voice & TTS

- **Providers:** ElevenLabs (high quality), Cartesia (fast, low latency)
- **Voice Cloning:** Upload audio samples to clone voices
  - Cartesia: 10+ seconds, single speaker
  - ElevenLabs: 1+ minute samples, max 5 min total
- **Best practices:** Clear audio, no background noise, steady delivery

**Dashboard idea:** Voice library browser with preview, cloning status indicators.

### 2.3 System Prompts & Initial Messages

- **System Prompt:** Overall instructions, tone, steps to follow
- **Initial Message:** First thing AI says (greeting)
- **Initial Audio:** Pre-recorded audio file for first impression (professional voice actor)

**Best practices:**
- Be specific with instructions
- Use example dialogues
- Handle "unknown" cases explicitly
- Keep prompts short and focused
- Use diacritics for proper pronunciation

**Dashboard idea:** 
- Prompt editor with AI-assisted suggestions
- Diff view for changes
- Template library for common use cases

### 2.4 Flow Builder (Visual Conversation Designer)

Visual drag-and-drop editor for conversation flows:

**Node Types:**
1. **Start (Green)** - Entry point, greeting message
2. **Speak (Blue)** - Pre-written exact message
3. **Prompt (Purple)** - AI instructions, flexible responses
4. **Action (Orange)** - Call forward, book appointment, custom action
5. **End (Red)** - End call or transfer

**Features:**
- Multiple outcomes per node (branching paths)
- Import/Export flows as JSON
- Template library
- Settings panel for agent personality (name, type, language, assertiveness, humor)

**Dashboard idea:** Visual flow builder with drag-and-drop nodes.

### 2.5 AI Prompt Editor

Conversational interface for editing prompts:
- Chat with AI to describe changes
- Smart suggestions for improvements
- Diff view (green=added, red=removed, blue=modified)
- Accept/reject individual changes
- Quick suggestion chips: "Make concise", "Add detail", "Improve clarity"

**Dashboard idea:** AI-assisted prompt improvement with natural language.

### 2.6 Tools & Functions

Built-in tools AI can use during calls:
- **Call Forward** - Transfer to another number
- **Book Appointment** - Calendar integration
- **Knowledge Base Search** - Query uploaded documents
- **Custom Mid-Call Tools** - API integrations

### 2.7 Custom Mid-Call Tools

API integrations that AI can call during conversations:

**Configuration:**
- Name (lowercase, underscores)
- Description (when/how to use)
- Endpoint URL (supports `{variable}` interpolation)
- HTTP Method (GET, POST, PUT, PATCH, DELETE)
- Headers (auth, content-type)
- Parameters (string, number, boolean)
- Timeout setting

**Use cases:**
- Order lookup
- Check appointment availability
- Customer verification
- Inventory checks

**Dashboard idea:** Tool configuration UI with test functionality.

### 2.8 Knowledge Bases

Document/website indexing for AI to reference:

**Sources:**
- Website scraping (URLs)
- PDF, DOCX, TXT files

**Processing states:** Empty → Processing → Active → Failed

**Integration modes:**
1. **Function Call** - Search only when needed (recommended, faster)
2. **Prompt Injection** - Search after every message (more accurate, slower)

**Dashboard idea:** Knowledge base manager with processing status, document upload.

### 2.9 Post-Call Actions

Extract structured data after calls and send to webhooks:

**Post-call Variables:**
- Default: `status` (boolean), `summary` (string)
- Custom: string, number, boolean types
- AI extracts from full transcript

**Webhook configuration:**
- URL endpoint
- Send only on completed calls (toggle)
- Include recording URL (toggle)
- Test request button

**Payload includes:**
- Call info (id, phone, duration, status)
- Extracted variables
- Transcript (timestamped + formatted)
- Recording URL
- Campaign/lead data (if applicable)

**Dashboard idea:** Variable schema editor, webhook config, test button.

### 2.10 Filler Audio

Natural sounds ("hmm", "one moment") during processing:
- Eliminates dead air
- Keeps callers engaged
- Best combined with fast engine mode

**Dashboard idea:** Toggle for filler audio, combine with latency settings.

### 2.11 Web Widget

Embeddable widget for websites:

**Modes:**
- Voice & Chat (hybrid)
- Chat Only
- Voice Only

**Configuration:**
- Position (8 options)
- Size (standard / extra large)
- Primary color
- Toggle button style (animated / simple)
- Auto-open on page load
- Custom avatar
- Pre-chat form
- Voice settings tab (mic selection)

**Dashboard idea:** Widget builder with live preview, embed code generator.

### 2.12 Testing

**Three testing methods:**
1. **Web Call** - Browser-based voice testing (deducts balance)
2. **Phone Call** - Real phone test (outbound)
3. **Test Chat** - Text-based for rapid iteration

**Dashboard idea:** Quick test buttons, test history.

---

## 3. Campaigns - Outbound Automation

### 3.1 Campaign Structure

**Components:**
- Lead management (primary + secondary contacts)
- Scheduling control (hours, days)
- Retry logic (attempts, intervals)
- Goal tracking (completion variables)

**Campaign Status:** Draft → In Progress → Paused → Completed

### 3.2 Lead Management

**Lead sources:**
- CSV import
- Manual entry
- Integration import (GoHighLevel, Google Sheets)

**Lead types:**
- Primary leads
- Secondary contacts (backup numbers)

**Lead status tracking:**
- Created → Scheduled → Processing → Completed → Rescheduled → Max Retries

### 3.3 Scheduling

- Allowed calling hours (start/end time)
- Allowed days of week
- Timezone support (uses assistant's timezone)

### 3.4 Retry Logic

- Max retries: 1-5 (default: 3)
- Retry interval: 10-4320 minutes (default: 60)
- Retry on voicemail: Yes/No
- Retry until goal completed: Uses post-call boolean variable

### 3.5 Campaign Monitoring

**Real-time metrics:**
- Calls in progress
- Calls completed
- Leads remaining
- Next call time

**Call results:**
- Initiated, Ringing, In Progress, Completed
- Busy, Unanswered, Failed

**Dashboard idea:** Campaign dashboard with real-time progress, lead status table.

---

## 4. Conversations - Text Interactions

**Conversation sources:**
- Web Widget
- WhatsApp Business
- Test Chat

**Conversation types (badges):**
- Test (Orange)
- Web Widget (Purple)
- WhatsApp (Green)

**Tracked data:**
- Message history
- Variables collected (pre-chat + extracted)
- Cost and token usage
- Session timestamps
- Customer identifier

**Dashboard idea:** Conversation list with filters by type, date, status.

---

## 5. Custom Dashboards

### 5.1 Overview

Drag-and-drop dashboard builder with widgets:
- **Stat Widgets** - Single metrics with optional comparison
- **Chart Widgets** - 8 chart types
- **Table Widgets** - Detailed records with sorting

### 5.2 Stat Widgets

**Configuration:**
- Data source (calls, leads, campaigns, assistants, phone_numbers, sms)
- Aggregation (COUNT, SUM, AVG, MAX, MIN)
- Column (for aggregations)
- Label, description, color
- Show mini chart (daily trend)
- Compare with previous period
- Date range
- Conditions (filters)

### 5.3 Chart Widgets

**Chart types:**
1. Line - Trends over time
2. Bar - Category comparison
3. Area - Filled trend
4. Pie - Proportions
5. Donut - Pie with center hole
6. Polar Area - Magnitude via radius
7. Radar - Multi-variable comparison
8. Radial Bar - Circular progress indicator

**Options:**
- Group By (categorical) OR Group By Period (hour/day/week/month)
- Grid lines, legend, tooltips, data labels
- Line curve (smooth/straight/stepline)
- Chart height (200-800px)
- Gradient (radialBar only)

**Radial Bar special features:**
- Calculate as Percentage (conditions met / total × 100)
- Show footer with numbers
- Start/End angle
- Hollow size, dash array

### 5.4 Table Widgets

**Configuration:**
- Data source selection
- Campaign filter (enables variable columns)
- Assistant filter (enables evaluation columns)
- Column selection (basic, relationships, evaluation, variables)
- Sort by, sort direction
- Rows per page (1-100)
- Date range
- Conditions

**Interactive features:**
- Clickable rows (link to detail page)
- Live date filter
- Status filter (multi-select)
- Text truncation with tooltip

### 5.5 Filtering System

**Date ranges:** Today, Yesterday, Last 7/14/30/60/90 days, Last 6 months, Last year

**Conditions:** Multiple AND filters
- Field, operator, value
- Supports evaluation fields (post-call variables)

### 5.6 Layout

- Edit mode: Unlock → Drag → Resize → Save → Lock
- Widget sizing: Stats 3-4 cols, Charts 6-12 cols, Tables 12 cols
- Best practice: KPIs at top, related metrics grouped, tables at bottom

**Dashboard ideas:**
- Custom dashboard builder
- Preset widgets for common metrics
- Drag-and-drop layout editor
- Save multiple dashboards with icons

---

## 6. Phone Numbers

**Types:**
1. **Dedicated Numbers** - Rented from platform, inbound + outbound
2. **SIP Integration** - Connect existing VOIP/PBX
3. **Caller ID** - Verified outbound only, shows existing number

**Dashboard idea:** Phone number manager with type indicators, verification status.

---

## 7. Conversation Design Best Practices

### 7.1 Prompt Writing

- Be specific about purpose, tone, steps
- Use example dialogues
- Handle "unknown" cases explicitly
- Keep it short and focused
- Periodically review transcripts

### 7.2 Handling Interruptions

- **Voice Activity Detection (VAD):** Controls when AI responds
  - High sensitivity = less interruption, more pauses
  - Low sensitivity = may talk over user
- **Speech speed & filler usage:** Natural vs robotic
- **Encourage shorter responses** in prompt to reduce collision

---

## 8. Key UX Patterns to Adopt

### 8.1 Navigation Structure

```
- Assistants (list + create)
  - [Assistant Name] (edit page)
    - Settings (tab)
    - Flow Builder (tab)
    - AI Prompt Editor (tab)
    - Web Widget (button)
    - Test (button)
- Campaigns (list + create)
- Conversations (list)
- Calls (list)
- Custom Dashboards (list + create)
- Phone Numbers (list + create)
- Knowledge Bases (list + create)
- Mid-Call Tools (list + create)
```

### 8.2 Status Badges

Color-coded badges for quick scanning:
- Draft (gray)
- In Progress (blue)
- Paused (orange)
- Completed (green)
- Failed (red)

### 8.3 Quick Actions

- Inline status changes
- Test buttons near configuration
- Duplicate/delete in lists

### 8.4 Real-time Indicators

- Processing status (spinning)
- Active/inactive toggles
- Last activity timestamps

### 8.5 Bulk Operations

- Import from CSV
- Multi-select for batch actions
- Export data

---

## 9. Feature Prioritization for Aloro Dashboard

### High Priority (Core)
1. **Assistants list + CRUD** - Central entity
2. **Assistant settings page** - Name, voice, prompt, tools
3. **Calls list** - Recent calls with status, duration, phone
4. **Real-time stats** - Total calls, success rate, avg duration
5. **Campaigns list + CRUD** - For outbound operations

### Medium Priority
6. **Custom dashboard builder** - Drag-and-drop widgets
7. **Knowledge base manager** - Upload documents, status
8. **Test chat interface** - Quick iteration
9. **Web widget builder** - Embed code generator
10. **Post-call variables editor** - Schema configuration

### Lower Priority (Advanced)
11. **Flow Builder** - Visual conversation designer
12. **AI Prompt Editor** - Conversational prompt improvement
13. **Mid-call tools manager** - Custom API integrations
14. **Phone number management** - Purchase, SIP, Caller ID

---

## 10. Terminology Reference

| Autocalls Term | Description |
|----------------|-------------|
| Assistant | AI voice agent configuration |
| Campaign | Outbound calling automation |
| Lead | Contact to call in campaign |
| Post-call Variables | Data extracted after call ends |
| Flow Builder | Visual conversation designer |
| Mid-Call Tool | API integration callable during conversation |
| Knowledge Base | Document/website index for AI reference |
| Web Widget | Embeddable chat/voice widget |
| Pipeline Mode | STT → LLM → TTS voice generation |
| Speech-to-Speech | Direct multimodal voice generation |
| Dualplex | Hybrid: multimodal + ElevenLabs TTS |
| Filler Audio | Natural sounds during processing |
| VAD | Voice Activity Detection |

---

## 11. Integration Ideas for Aloro

### From Their Platform
1. **Assistant modes** - Let users choose latency vs quality
2. **Flow Builder** - Visual script designer
3. **Custom dashboards** - Widget-based analytics
4. **Post-call variables** - Structured data extraction
5. **Knowledge bases** - Document indexing
6. **Mid-call tools** - Real-time API calls

### Unique to Aloro Context
1. **Telerenta-specific metrics** - Device returns, debt collection
2. **Sales agent performance** - Call outcomes, appointments
3. **Multi-language support** - Romanian + English
4. **WhatsApp integration** - Already on roadmap?

---

## 12. Screenshots to Reference

Key UI patterns from their docs:
- Flow Builder canvas with nodes
- AI Prompt Editor with diff view
- Custom Dashboard with widgets
- Campaign monitoring table
- Widget configuration tabs
- Knowledge base processing states

---

*Research compiled for Aloro Dashboard development*
