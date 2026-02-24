# Autocalls.ai Competitor Research (Comprehensive)

> Thorough analysis of Autocalls.ai platform documentation for dashboard feature ideas
> Research date: 2026-02-24
> Focus: Platform Guide (excluding API docs, Whitelabel)

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [AI Assistants](#2-ai-assistants)
3. [Campaigns](#3-campaigns)
4. [WhatsApp Integration](#4-whatsapp-integration)
5. [Conversations](#5-conversations)
6. [Custom Dashboards](#6-custom-dashboards)
7. [Phone Numbers](#7-phone-numbers)
8. [Automation Platform](#8-automation-platform)
9. [Conversation Design](#9-conversation-design)
10. [UX Patterns](#10-ux-patterns)
11. [Feature Ideas for Aloro](#11-feature-ideas-for-aloro-dashboard)
12. [Terminology](#12-terminology-reference)

---

## 1. Platform Overview

Autocalls.ai is an AI voice + messaging platform with:

| Capability | Description |
|------------|-------------|
| **AI Assistants** | Voice agents with configurable prompts, tools, voices |
| **Campaigns** | Outbound calling automation with retry logic |
| **Conversations** | Text chat via web widget, WhatsApp, test interface |
| **WhatsApp** | Business messaging with template support |
| **Custom Dashboards** | Widget-based analytics builder |
| **Automation Platform** | No-code workflow automation |

---

## 2. AI Assistants

### 2.1 Assistant Types

- **Inbound** - Receives calls from customers
- **Outbound** - Makes calls to leads/customers

### 2.2 Voice Engine Modes

| Mode | How It Works | Latency | Best For |
|------|-------------|---------|----------|
| **Pipeline** | STT → LLM → TTS | 800-1500ms | Complex reasoning, long replies, all voices |
| **Speech-to-Speech** | Direct multimodal | 300-600ms | Fast back-and-forth, short replies |
| **Dualplex (Beta)** | Multimodal + ElevenLabs TTS | Low | Fast replies with premium/cloned voices |

**Mode selection UI:** Dropdown in assistant settings with descriptions

### 2.3 Voice Selection & Cloning

**TTS Providers:**
- **ElevenLabs** - High-quality voices, cloning support
- **Cartesia** - Fast, low-latency synthesis

**Voice options:**
1. Built-in voice library (by provider, language, gender)
2. Voice cloning from audio samples
   - Cartesia: 10+ seconds, single speaker, no noise
   - ElevenLabs: 1+ minute samples, max 5 min total
3. Request from ElevenLabs public library

**Cloning UI:** Modal with provider selection → language → name → record/upload → processing status

### 2.4 System Prompt Configuration

**Editing interfaces:**
1. **Classic Editor** - Textarea with manual editing
2. **AI Prompt Editor** - Conversational editing with AI
3. **Flow Builder** - Visual drag-and-drop nodes

### 2.5 AI Prompt Editor (Chat-based)

Conversational interface for editing prompts without manual text editing:

**Features:**
- Chat panel to describe changes in natural language
- AI suggests modifications
- Diff view with color coding:
  - Green = added
  - Red = removed
  - Blue = modified
- Accept/reject individual changes
- Bulk accept/reject all
- Quick suggestion chips:
  - "Make it more concise"
  - "Add more detail"
  - "Improve clarity"
  - "Add instructions"

**Variable management:**
- Pre-call variables tab
- Post-call fields tab
- Add/remove fields inline

**Template library:**
- Start from scratch
- Continue with existing
- Start with template (Sales, Support, Scheduling, Surveys, Lead Qualification)

### 2.6 Flow Builder (Visual Designer)

Visual drag-and-drop conversation flow editor:

**Interface:**
- Canvas area (center) - drag nodes, connect paths
- Bottom toolbar - Auto Layout, Duplicate, Delete, Add Node
- Settings panel (right) - agent personality, variables

**Node Types:**

| Node | Color | Purpose |
|------|-------|---------|
| **Start** | Green | Entry point, greeting message |
| **Speak** | Blue | Pre-written exact message |
| **Prompt** | Purple | AI instructions, flexible responses |
| **Action** | Orange | Call forward, book appointment, custom tool |
| **End** | Red | End call or transfer |

**Outcomes (branching):**
- Each Speak/Prompt node can have multiple outcomes
- Different paths based on customer response
- Visual branching connections

**Settings panel:**
- Agent name, type, language
- Assertiveness level
- Humor level
- Variables (pre-call data)
- Post-call fields

**Import/Export:** JSON format for sharing flows

### 2.7 Built-in Tools

| Tool | Description |
|------|-------------|
| **End Call** | Politely wrap up conversation |
| **Transfer** | Route to human/department (standard or SIP URI) |
| **Appointment Scheduler** | Book with Cal.com, Calendly, GoHighLevel |
| **DTMF Input** | Send keypad inputs for IVR navigation |

### 2.8 Custom Mid-Call Tools

Create API integrations callable during conversations:

**Configuration:**
- Name (lowercase, underscores)
- Description (when/how AI should use)
- Endpoint URL (supports `{variable}` interpolation)
- HTTP Method (GET, POST, PUT, PATCH, DELETE)
- Headers (auth, content-type)
- Parameters (string, number, boolean)
- Timeout setting

**Testing:** Built-in test button with auto-generated dummy data

**Examples:**
- `check_order_status` - Order lookup
- `check_availability` - Appointment slots
- `verify_customer` - CRM verification

### 2.9 Knowledge Bases

Document/website indexing for AI reference:

**Content sources:**
- Website scraping (URLs)
- PDF, DOCX, TXT files

**Processing states:**
- Empty → Processing → Active → Failed

**Integration modes:**
1. **Function Call** (recommended) - Search only when needed
2. **Prompt Injection** - Search after every message (slower)

**UI:** List view with status badges, document count, actions

### 2.10 Post-Call Actions

**Post-call Variables:**
- Default: `status` (boolean), `summary` (string)
- Custom: string, number, boolean types
- AI extracts from full transcript

**Variable examples:**
- `meeting_scheduled` (boolean)
- `interest_level` (string: hot/warm/cold)
- `callback_time` (string)
- `objection_reason` (string)

**Webhook configuration:**
- URL endpoint
- Send only on completed calls (toggle)
- Include recording URL (toggle)
- Test request button

**Webhook payload includes:**
- Call info (id, phone, duration, status)
- Extracted variables
- Transcript (timestamped + formatted)
- Recording URL
- Campaign/lead data (if applicable)

### 2.11 Call Variables (Pre-call)

Variables passed before the call starts:

**Usage:** Reference in prompts with `{variable_name}` syntax

**Examples:**
- `{customer_name}` - Personalization
- `{email}` - Calendar integrations
- `{account_type}` - Tailored responses
- `{company}` - Business context

**Data sources:**
- Manual entry
- CSV import
- CRM sync (GoHighLevel, Google Sheets)
- Automation platform

### 2.12 Call Flow Settings

**Who speaks first:**
- AI Assistant (default) - Starts with greeting
- Customer - AI waits for caller

**Initial Message:**
- Text greeting read by TTS
- Use diacritics for pronunciation
- Keep 5-10 seconds

**Initial Audio (optional):**
- Pre-recorded MP3/WAV file
- Professional voice actor
- Perfect pronunciation
- Best combined with voice cloning from same voice

### 2.13 Filler Audio

Natural sounds during processing:
- "hmm", "okay", "I understand", "one moment"
- Language-aware phrases
- Eliminates dead air
- Keeps callers engaged

**Categories:**
- Positive: "Great!", "Perfect!", "Super!"
- Negative: "Hmm.", "I see.", "Okay."
- Question: "Right?", "Really?", "How so?"
- Neutral: "Okay.", "I understand.", "Got it."

### 2.14 Ambient Sound

Optional background audio:
- None (default)
- Office environment sounds
- Volume control

### 2.15 Audio Enhancement

**Noise Cancellation:**
- Filters caller background noise
- Toggle on/off

**End Call on Voicemail:**
- Detect voicemail and hang up
- Optional voicemail message before ending

**Record Calls:**
- Toggle recording on/off

### 2.16 Advanced Settings

**LLM Model Selection:**
| Model | Best For |
|-------|----------|
| GPT-5 Mini | Pipeline mode, balanced reasoning |
| GPT-5 Realtime | Speech-to-Speech, Dualplex |
| GPT-4o | Complex tasks (higher latency) |
| Gemini Flash 2.0/2.5 | Minimal latency |

**LLM Temperature:**
- Range: 0.0 - 1.0
- Default: 0.1
- Lower = stable, predictable
- Higher = creative, varied

**Duration Settings:**
| Setting | Range | Default |
|---------|-------|---------|
| Re-engagement Interval | 7-600s | 30s |
| Re-engagement Prompt | Custom text | "Are you still there?" |
| Max Call Duration | 20-1200s | 600s (10 min) |
| Max Silence Duration | 1-120s | 40s |
| Ringing Time | 1-60s | 30s |

### 2.17 Testing Methods

| Method | Description | Cost |
|--------|-------------|------|
| **Web Call** | Browser-based voice testing | Deducts balance |
| **Phone Call** | Real outbound test call | Deducts balance |
| **Test Chat** | Text-based rapid iteration | Lower cost |

**Test Chat features:**
- Slide-over panel interface
- Text-based interaction
- Same AI logic as voice calls
- Tests variable collection
- Tests tool execution
- Creates conversation records for review

### 2.18 Web Widget

Embeddable widget for websites:

**Modes:**
- Voice & Chat (hybrid)
- Chat Only
- Voice Only

**Size options:**
- Standard (compact floating)
- Extra Large (half-screen desktop, full-screen mobile)

**Position:** 8 options (corners + center edges)

**Configuration tabs:**

1. **General**
   - Widget mode
   - Size
   - Position
   - Primary color
   - Toggle button size/style
   - Auto-open on page load

2. **Button**
   - Custom avatar image
   - Button main text
   - Button sub text
   - Tab labels (Voice/Chat)

3. **Header & Modal**
   - Header title/subtitle
   - Modal title
   - Start button text
   - Modal description

4. **Chat Settings**
   - Placeholder text
   - Send button label
   - Show/hide function calls

5. **Voice Settings**
   - Microphone selection
   - Voice preferences

**Pre-chat Form:**
- Collect variables before conversation
- Custom fields

---

## 3. Campaigns

### 3.1 Campaign Overview

Automated outbound calling to multiple leads:

**Components:**
- Lead management (primary + secondary contacts)
- Scheduling control (hours, days)
- Retry logic (attempts, intervals)
- Goal tracking (completion variables)

**Campaign Status:**
| Status | Description |
|--------|-------------|
| Draft | Being configured |
| In Progress | Actively calling |
| Paused | Temporarily stopped |
| Completed | All leads contacted |

### 3.2 Campaign Setup

**Prerequisites:**
- AI assistant configured for outbound
- Phone number assigned
- Sufficient account balance
- Leads ready

**Configuration:**
1. Campaign name
2. Select AI assistant
3. Set schedule (hours, days, timezone)
4. Configure retry logic
5. Add leads

### 3.3 Scheduling

**Allowed calling hours:**
- Start time (default: 00:00)
- End time (default: 23:59)
- Uses assistant's timezone

**Allowed days:**
- Monday-Sunday (select individual)
- Presets: Business only (Mon-Fri)

### 3.4 Retry Logic

| Setting | Options | Default |
|---------|---------|---------|
| Max retries | 1-5 | 3 |
| Retry interval | 10-4320 minutes | 60 |
| Retry on voicemail | Yes/No | - |
| Retry until goal completed | Boolean variable | - |

### 3.5 Lead Management

**Lead sources:**
- Manual entry
- CSV import
- Integration import (GoHighLevel, Google Sheets)

**Lead types:**
- Primary leads
- Secondary contacts (backup numbers)

**Lead status:**
| Status | Description |
|--------|-------------|
| Created | Ready to call |
| Scheduled | Queued for next attempt |
| Processing | Currently being called |
| Completed | Successfully contacted |
| Rescheduled | Scheduled for retry |
| Max Retries | Reached max attempts |

**Manual status changes:**
- Set to "Created" - Reset to call again
- Set to "Completed" - Stop calling

### 3.6 Campaign Monitoring

**Real-time metrics:**
- Calls in progress
- Calls completed
- Leads remaining
- Next call time

**Call results:**
- Initiated, Ringing, In Progress, Completed
- Busy, Unanswered, Failed

---

## 4. WhatsApp Integration

### 4.1 Overview

WhatsApp Business API integration for AI-powered messaging:

**Capabilities:**
- Receive messages → AI auto-responds
- Send template messages (business-initiated)
- 24-hour messaging window rules
- Image analysis (Vision)
- Voice message transcription

### 4.2 WhatsApp Senders

Phone numbers registered for WhatsApp Business:

**Number types:**
1. **Platform Numbers** - Purchased through platform, auto-verification
2. **External Numbers** - Your own mobile, SMS/voice verification

**Setup (Platform Number):**
1. Select available number
2. Enter display name
3. Add business profile (optional)
4. Start verification (AI-assisted voice, 1-2 min)
5. Connect via Meta Embedded Signup
6. Create NEW WhatsApp Business Account (critical!)

**Setup (External Number):**
1. Enter phone number (E.164 format)
2. Enter display name
3. Login with Facebook
4. Create new WhatsApp Business Account
5. Verify via SMS or voice call (6-digit code)

**Sender Status:**
| Status | Description |
|--------|-------------|
| Online | Fully operational |
| Connecting | Being initialized |
| Pending | Awaiting verification |
| Offline | Manually disabled |
| Suspended | Meta policy violation |
| Failed | Setup failed |

### 4.3 Message Templates

Pre-approved formats for business-initiated messages:

**Categories:**
| Category | Use Case | Approval Time |
|----------|----------|---------------|
| Utility | Order confirmations, shipping, appointments | Minutes |
| Marketing | Promotions, announcements | Hours to 24h |
| Authentication | OTP, verification codes | Minutes |
| Voice Call Request | Request permission to call | Instant |

**Template structure:**
- Header (optional) - Text or media
- Body (required) - Main message with `{{1}}`, `{{2}}` variables
- Footer (optional) - Up to 60 characters
- Buttons (optional) - Quick Reply, Call to Action, Voice Call Request

**Approval process:**
1. Create template
2. Submit for approval
3. Meta review (minutes to 24 hours)
4. Status: Draft → Pending → Approved/Rejected

**Common rejection reasons:**
- Promotional content in Utility templates
- Missing/unclear variable samples
- Aggressive language
- URL shorteners (bit.ly, etc.)
- Wrong category selection
- Restricted content (alcohol, gambling, etc.)

**Editing limitation:** Cannot edit approved templates - must create new version

### 4.4 24-Hour Messaging Window

- Customer messages you → 24-hour window opens
- Within window: Send any free-form message
- After window: Must use approved template

**Quality rating affects limits:**
| Quality | Daily Limit |
|---------|-------------|
| New Sender | ~250 |
| Low | 1,000 |
| Medium | 10,000 |
| High | 100,000+ |

### 4.5 WhatsApp Automation

**Triggers:**
- WhatsApp Message Received
- WhatsApp Conversation Started
- Conversation Ended

**Actions:**
- Send WhatsApp Template Message
- Send WhatsApp Message (free-form, 24h window)
- Generate AI Reply (for custom integrations)

**Example workflows:**
1. Post-call follow-up → Send template based on call outcome
2. Lead qualification via WhatsApp
3. Appointment reminders on schedule

---

## 5. Conversations

### 5.1 Overview

Text-based interactions tracked separately from phone calls:

**Sources:**
| Source | Badge Color |
|--------|-------------|
| Test Chat | Orange |
| Web Widget | Purple |
| WhatsApp | Green |

### 5.2 Conversation Data

Each conversation includes:
- Message history with timestamps
- Variables collected (pre-chat + extracted)
- Cost and token usage
- Conversation type badge
- Customer identifier (phone for WhatsApp)

### 5.3 WhatsApp Conversations

- Follows 24-hour messaging window rules
- Customer phone number tracked
- Voice notes auto-transcribed
- Images analyzed with Vision AI
- All media stored as attachments

---

## 6. Custom Dashboards

### 6.1 Overview

Drag-and-drop analytics builder with three widget types:

| Widget | Purpose |
|--------|---------|
| Stat | Single metric with optional comparison |
| Chart | 8 chart types for trends |
| Table | Detailed records with sorting |

### 6.2 Creating Dashboards

1. Click "Create Custom Dashboard"
2. Enter name, choose icon
3. Unlock to customize
4. Add widgets (presets or custom)
5. Drag to arrange
6. Save and lock

### 6.3 Stat Widgets

**Configuration:**

**Step 1 - Basics:**
- Widget name (internal)
- Data table (calls, leads, campaigns, assistants, phone_numbers, sms)
- Aggregation (COUNT, SUM, AVG, MAX, MIN)
- Column (for aggregations)

**Step 2 - Display:**
- Label (required)
- Description
- Color (primary, success, warning, danger, info, gray)
- Show mini chart (daily trend)
- Compare with previous period (percentage change)
- Date range
- Conditions (filters)

**Examples:**
- Total Calls (COUNT, 30 days)
- Average Duration (AVG duration, mini chart)
- Appointments Booked (COUNT where status=completed AND appointment_booked=true)

### 6.4 Chart Widgets

**Chart types:**
| Type | Use For | Requires |
|------|---------|----------|
| Line | Trends over time | Group By Period |
| Bar | Category/time comparison | Group By OR Group By Period |
| Area | Filled trends | Group By Period |
| Pie | Proportions | Group By |
| Donut | Pie with center hole | Group By |
| Polar Area | Magnitude via radius | Group By |
| Radar | Multi-axis comparison | Group By |
| Radial Bar | Progress percentage | Conditions |

**Configuration:**

**Step 1 - Basics:**
- Same as Stat widgets
- Chart type selection

**Step 2 - Display:**
- Label, description, color
- Date range
- Group By (categorical) OR Group By Period (hour/day/week/month)
- Conditions

**Step 3 - Advanced:**
- Show grid lines
- Show legend
- Show tooltips
- Show data labels
- Show toolbar (zoom/download)
- Line curve (smooth/straight/stepline)
- Line width (1-10px)
- Chart height (200-800px)

**Radial Bar special:**
- Calculate as Percentage (conditions met / total × 100)
- Show footer with numbers ("150 achieved / 1,000 total")
- Start/End angle
- Hollow size (0-100%)
- Dash array (dashed pattern)
- Gradient colors

### 6.5 Table Widgets

**Configuration:**
- Data source
- Campaign filter (enables variable columns)
- Assistant filter (enables evaluation columns)
- Column selection (basic, relationships, evaluation, variables)
- Sort by, sort direction
- Rows per page (1-100)
- Date range
- Conditions

**Interactive features:**
- Clickable rows (link to detail)
- Live date filter
- Status filter (multi-select)
- Text truncation with tooltip

### 6.6 Filtering System

**Date ranges:**
- Today, Yesterday
- Last 7/14/30/60/90 days
- Last 6 months, Last year

**Conditions:**
- Multiple AND filters
- Field, operator, value
- Supports evaluation fields (post-call variables)

### 6.7 Layout Best Practices

- Stats: 3-4 columns (fit 3-4 per row)
- Charts: 6-12 columns
- Tables: 12 columns (full width)
- KPIs at top
- Group related metrics
- Tables at bottom

### 6.8 Preset Widgets

21 ready-made widgets marked with emoji:
- 📊 Stats
- 📈 Charts
- 📋 Tables

---

## 7. Phone Numbers

### 7.1 Number Types

| Type | Inbound | Outbound | Monthly Fee |
|------|---------|----------|-------------|
| **Dedicated** | ✅ | ✅ | From $3.99/mo |
| **SIP Integration** | ✅ | ✅ | $0.00045/min (AI bridging) |
| **Caller ID** | ❌ | ✅ | Per-minute rates |

### 7.2 Choosing Type

- Need inbound + no VOIP → Dedicated number
- Have PBX/VOIP → SIP integration
- Outbound only with existing number → Caller ID

---

## 8. Automation Platform

### 8.1 Overview

No-code workflow automation with triggers and actions:

**Flow structure:**
```
Trigger → Actions
```

### 8.2 Triggers

**Call-based:**
1. **Call Ended** - Post-conversation automation
2. **Inbound Call Variable Injection** - Pre-call context enrichment

**WhatsApp:**
- Message Received
- Conversation Started
- Conversation Ended

**Other:**
- Schedule Trigger
- Webhook Trigger
- Service-specific events

### 8.3 Actions

**Hubspot:**
- Update contact records
- Create new contacts
- Sync conversation insights

**Campaign Management:**
- Add leads to campaigns
- Schedule follow-up calls
- Manage priorities

**External:**
- Send emails
- Update spreadsheets
- Trigger webhooks
- Custom integrations

### 8.4 Example Workflows

**Intelligent CRM Update:**
```
Trigger: AI Call Ended
↓
Process Conversation Insights
↓
Update Hubspot Contact
↓
Schedule Next AI Interaction
```

**Smart Inbound Handling:**
```
Trigger: Inbound Call to AI
↓
Lookup Customer in Hubspot
↓
Return Enriched Context
↓
AI Personalizes Conversation
```

---

## 9. Conversation Design

### 9.1 Prompt Writing

**Best practices:**
- Be specific about purpose, tone, steps
- Use example dialogues
- Handle "unknown" cases explicitly
- Keep prompts short and focused
- Periodically review transcripts

### 9.2 System Prompt vs Initial Message

| Element | Purpose |
|---------|---------|
| System Prompt | Overall instructions, context, behavior |
| Initial Message | First thing AI says (greeting) |

### 9.3 Handling Interruptions

**Voice Activity Detection (VAD):**
- High sensitivity = less interruption, more pauses
- Low sensitivity = may talk over user

**Best practices:**
- Encourage shorter responses in prompt
- Use filler audio
- Adjust speech speed

### 9.4 Language Support

- Primary language selection
- Secondary languages (multilingual support)
- AI detects spoken language and responds accordingly
- Filler phrases auto-set per language

---

## 10. UX Patterns

### 10.1 Navigation Structure

```
- Assistants (list + create)
  - [Assistant Name]
    - Settings (tabbed)
    - Flow Builder (tab)
    - AI Prompt Editor (button)
    - Web Widget (button)
    - Test (button)
- Campaigns (list + create)
- Conversations (list)
- Calls (list)
- Custom Dashboards (list + create)
- Phone Numbers (list + create)
- Knowledge Bases (list + create)
- Mid-Call Tools (list + create)
- WhatsApp Senders (list + create)
- WhatsApp Templates (list + create)
```

### 10.2 Status Badges

| Status | Color |
|--------|-------|
| Draft | Gray |
| In Progress | Blue |
| Paused | Orange |
| Completed | Green |
| Failed | Red |
| Processing | Spinning |
| Pending | Yellow |

### 10.3 Quick Actions

- Inline status changes
- Test buttons near configuration
- Duplicate/delete in lists
- "Speak with assistant" button

### 10.4 Real-time Indicators

- Processing status (spinning animation)
- Active/inactive toggles
- Last activity timestamps
- Call counts in nav badges

### 10.5 Bulk Operations

- CSV import for leads
- Multi-select for batch actions
- Export data
- Integration imports (GoHighLevel, Google Sheets)

### 10.6 Form Patterns

**Tabbed settings:**
- General
- Prompt & Tools
- Post-call Actions

**Accordion sections:**
- Collapsible detailed options
- Step-by-step wizards

**Slide-over panels:**
- Test Chat
- Widget preview

---

## 11. Feature Ideas for Aloro Dashboard

### High Priority (Core)

| Feature | Description |
|---------|-------------|
| Assistants list + CRUD | Central entity management |
| Assistant settings | Name, voice, prompt, tools |
| Calls list | Status, duration, phone, transcript |
| Real-time stats | Total calls, success rate, avg duration |
| Campaigns list + CRUD | Outbound operations |

### Medium Priority

| Feature | Description |
|---------|-------------|
| Custom dashboard builder | Drag-and-drop widgets |
| Knowledge base manager | Upload documents, status |
| Test chat interface | Quick iteration |
| Web widget builder | Embed code generator |
| Post-call variables | Schema configuration |
| WhatsApp integration | Business messaging |

### Lower Priority (Advanced)

| Feature | Description |
|---------|-------------|
| Flow Builder | Visual conversation designer |
| AI Prompt Editor | Conversational prompt improvement |
| Mid-call tools | Custom API integrations |
| Phone number management | Purchase, SIP, Caller ID |
| Automation workflows | No-code triggers/actions |

### Aloro-Specific Ideas

| Feature | Use Case |
|---------|----------|
| Telerenta metrics | Device returns, debt collection status |
| Sales agent performance | Call outcomes, appointments booked |
| Multi-language | Romanian + English support |
| Debt collection scripts | Specialized prompt templates |
| Device tracking | Rental status dashboard |

---

## 12. Terminology Reference

| Term | Description |
|------|-------------|
| Assistant | AI voice agent configuration |
| Campaign | Outbound calling automation |
| Lead | Contact to call in campaign |
| Post-call Variables | Data extracted after call ends |
| Pre-call Variables | Data passed before call starts |
| Flow Builder | Visual conversation designer |
| AI Prompt Editor | Chat-based prompt editing |
| Mid-Call Tool | API integration callable during conversation |
| Knowledge Base | Document/website index for AI reference |
| Web Widget | Embeddable chat/voice widget |
| Pipeline Mode | STT → LLM → TTS voice generation |
| Speech-to-Speech | Direct multimodal voice generation |
| Dualplex | Hybrid: multimodal + ElevenLabs TTS |
| Filler Audio | Natural sounds during processing |
| VAD | Voice Activity Detection |
| WhatsApp Sender | Phone number for WhatsApp Business |
| Template Message | Pre-approved message format |
| 24-Hour Window | Free-form messaging period |

---

## 13. UI Components Reference

### From Their Docs

- Flow Builder canvas with color-coded nodes
- AI Prompt Editor with diff view
- Custom Dashboard with drag-and-drop
- Campaign monitoring table with status badges
- Widget configuration tabs
- Knowledge base processing states
- WhatsApp template editor
- Test Chat slide-over panel
- Web Widget live preview

### Component Patterns

**Lists:**
- Search + filter bar
- Status badges
- Quick actions (edit, duplicate, delete)
- Pagination

**Forms:**
- Tabbed sections
- Accordion groups
- Inline help text
- Validation messages

**Widgets:**
- Stat cards with mini charts
- Charts with tooltips/legends
- Tables with sortable columns
- Filter dropdowns

**Modals:**
- Wizard flows
- Confirmation dialogs
- Preview panels

---

*Research compiled for Aloro Dashboard development*
*Last updated: 2026-02-24*
