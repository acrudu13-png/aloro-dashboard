# Aloro Dashboard Feature Outline

Cross-referenced with `competitor-research-autocalls.md` (Autocalls.ai).

## Core Navigation
- Dashboard overview (KPIs, charts, recent calls)
- Call Insights (post-call variables analytics)
- Call Logs (filters + expandable rows)
- Campaigns (list + create)
- Assistants (list + CRUD)

## Assistant Configuration
- General settings (name, direction, description, phone numbers)
- Language & model selection (LLM + temperature)
- Voice configuration (provider + voice selection)
- Tools management (transfer, hangup, DTMF, scheduling, API, KB)
- Post-call variables schema (enum/string/number/date)
- Advanced settings (interruptions, call limits, noise cancellation)
- Filler audio toggle (from research 2.13)

## Conversations
- Conversations list page
- Source badges (Test Chat, Web Widget, WhatsApp)
- Message history + variables + cost/usage

## Test Chat / Agent Tester
- Slide-over panel for text-based testing
- Web call / phone call / test chat entry points
- Conversation record output

## Knowledge Bases
- CRUD KBs (web URLs + docs)
- Processing states (Empty → Processing → Active → Failed)
- Mode selection (function call vs prompt injection)

## WhatsApp
- Senders page (platform/external numbers)
- Sender statuses (online, connecting, pending, offline, suspended, failed)
- Templates page (create + approval statuses)
- Template editor (category, header/body/footer/buttons)

## Web Widget
- Full configuration tabs (General, Button, Header & Modal, Chat, Voice)
- Pre-chat form fields
- Embed code snippet

## Phone Numbers
- Dedicated numbers
- SIP integration
- Caller ID (outbound only)
- Availability + pricing indicators

## Post-Call Webhooks
- Webhook endpoint configuration
- Toggles (completed only, include recording)
- Test request button

## Custom Dashboards
- Widget builder (stat, chart, table)
- Drag-and-drop layout
- Filters + conditions

## Automation Platform (Future)
- Triggers (Call Ended, WhatsApp events, Schedule)
- Actions (CRM updates, send template, webhooks)

## UX Patterns
- Status badges (draft, in progress, paused, completed, failed, processing, pending)
- Slide-over panels (test chat, widget preview)
- Inline actions (duplicate, delete, test)
- Bulk operations (CSV import, export)

## Gaps to Address
- Flow Builder UI
- AI Prompt Editor UI
- Mid-call tools configuration builder
- Campaign scheduling + retry logic detail
