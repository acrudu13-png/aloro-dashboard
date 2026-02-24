---
sidebar_position: 13
---

# Web Widget Configuration

Add voice and chat capabilities to your website with the Aloro Web Widget.

## Overview

The Web Widget is an embeddable component that lets visitors to your website:
- Chat with your AI assistant
- Make voice calls through their browser
- Interact with your AI without leaving your site

---

## Widget Modes

| Mode | Description | Best For |
|------|-------------|----------|
| **Voice & Chat** | Full voice and text capabilities | Complete support experience |
| **Chat Only** | Text-based interaction only | Simple Q&A, cost-conscious |
| **Voice Only** | Browser voice calls | Voice-first experience |

---

## Configuration Tabs

### General

![Widget General](/img/widget-general.png)

| Setting | Description |
|---------|-------------|
| **Widget Mode** | Voice & Chat, Chat Only, Voice Only |
| **Size** | Standard or Extra Large |
| **Position** | 8 positions (corners + edges) |
| **Primary Color** | Brand color for widget |
| **Button Style** | Toggle button appearance |
| **Auto-Open** | Open automatically on page load |

#### Size Options

| Size | Desktop | Mobile |
|------|---------|--------|
| **Standard** | Compact floating button | Compact overlay |
| **Extra Large** | Half-screen panel | Full-screen overlay |

#### Positions

```
┌──────────────────────────────────┐
│  [1]        [2]        [3]       │
│                                  │
│  [4]                    [5]      │
│                                  │
│  [6]        [7]        [8]       │
└──────────────────────────────────┘
```

---

### Button

Customize the widget toggle button:

| Setting | Description |
|---------|-------------|
| **Avatar Image** | Custom image for button |
| **Main Text** | Primary button label |
| **Sub Text** | Secondary label |
| **Tab Labels** | Voice/Chat tab names |

**Example:**
```
┌─────────────────────┐
│  [Avatar]  Chat with us
│           We're online!
└─────────────────────┘
```

---

### Header & Modal

Configure the opened widget appearance:

| Setting | Description |
|---------|-------------|
| **Header Title** | Top bar title |
| **Header Subtitle** | Top bar subtitle |
| **Modal Title** | Main conversation title |
| **Modal Description** | Welcome text |
| **Start Button Text** | Button to begin |

**Layout:**
```
┌────────────────────────────────────┐
│ Header Title              [X]      │
│ Header Subtitle                   │
├────────────────────────────────────┤
│                                    │
│       Modal Title                  │
│   Modal Description text           │
│                                    │
│    ┌─────────────────────┐        │
│    │   Start Button      │        │
│    └─────────────────────┘        │
│                                    │
└────────────────────────────────────┘
```

---

### Chat Settings

| Setting | Description |
|---------|-------------|
| **Placeholder Text** | Input field placeholder |
| **Send Button Label** | Send button text |
| **Show Function Calls** | Display tool usage |

**Example:**
```
┌────────────────────────────────────┐
│ [AI]: Hello! How can I help?      │
│                                    │
│ [User]: I need help with my order │
│                                    │
│ [AI]: I'd be happy to help...     │
│                                    │
├────────────────────────────────────┤
│ Type your message...      [Send]   │
└────────────────────────────────────┘
```

---

### Voice Settings

| Setting | Description |
|---------|-------------|
| **Microphone Selection** | Default or choose device |
| **Voice Preferences** | Assistant voice settings |

---

### Pre-Chat Form

Collect information before the conversation starts:

| Field Type | Use Case |
|------------|----------|
| **Text** | Name, email, custom info |
| **Dropdown** | Reason for contact |
| **Checkbox** | Terms agreement |

**Configuration:**

```json
{
  "fields": [
    {
      "type": "text",
      "label": "Your Name",
      "required": true,
      "variable": "customer_name"
    },
    {
      "type": "text",
      "label": "Email",
      "required": true,
      "variable": "email"
    },
    {
      "type": "dropdown",
      "label": "Reason for Contact",
      "options": ["Sales", "Support", "Billing", "Other"],
      "required": true,
      "variable": "contact_reason"
    }
  ]
}
```

**Result:**
```
┌─────────────────────────────────┐
│  Before we start...             │
│                                 │
│  Your Name: [________________]  │
│  Email: [________________]      │
│  Reason: [Dropdown ▼]           │
│                                 │
│  [Start Chat]                   │
└─────────────────────────────────┘
```

---

## Embed Code

After configuring, get your embed code:

### Step 1: Copy Code

1. Save your widget configuration
2. Click **Get Embed Code**
3. Copy the provided snippet

### Step 2: Add to Website

Place the code before `</body>` on your website:

```html
<!-- Aloro Web Widget -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['AloroWidget']=o;w[o]=w[o]||function(){
    (w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','aloro','https://widget.aloro.ai/widget.js'));
  
  aloro('init', {
    assistantId: 'YOUR_ASSISTANT_ID',
    // Additional config options
  });
</script>
<!-- End Aloro Web Widget -->
```

### WordPress Integration

For WordPress sites:

1. Go to **Appearance > Theme Editor**
2. Select **Theme Footer (footer.php)**
3. Paste code before `</body>`
4. Save changes

Or use a plugin like "Insert Headers and Footers".

---

## Advanced Configuration

### JavaScript API

Control the widget programmatically:

```javascript
// Open widget
aloro('open');

// Close widget
aloro('close');

// Toggle widget
aloro('toggle');

// Set variables
aloro('setVariables', {
  customer_id: '12345',
  page_visited: window.location.pathname
});

// Track events
aloro('onMessage', function(message) {
  console.log('New message:', message);
});
```

### Conditional Display

Show widget only on certain pages:

```javascript
// Only show on specific pages
if (window.location.pathname.includes('/support')) {
  aloro('init', { ... });
}
```

### Styling Overrides

Override default styles with CSS:

```css
/* Custom button style */
.aloro-button {
  border-radius: 50px !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
}

/* Custom colors */
.aloro-widget {
  --aloro-primary: #your-brand-color;
}
```

---

## Testing

### Preview

Use the **Preview** button to test without embedding:

1. Configure widget
2. Click **Preview**
3. Interact with the preview widget
4. Adjust settings as needed

### Testing Checklist

- [ ] Widget appears in correct position
- [ ] Button styling matches brand
- [ ] Chat/Voice works correctly
- [ ] Pre-chat form collects data
- [ ] Variables passed to assistant
- [ ] Works on mobile devices
- [ ] No JavaScript errors

---

## Best Practices

### UX

- Don't auto-open immediately (annoying)
- Use clear, welcoming text
- Keep pre-chat form short
- Position away from other widgets

### Performance

- Load widget asynchronously
- Minimize custom scripts
- Test on slow connections

### Branding

- Match colors to your site
- Use branded avatar image
- Customize all text

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Widget not appearing | Check embed code placement |
| Voice not working | Verify HTTPS (required for mic) |
| Assistant not responding | Check assistant status |
| Styling broken | Check for CSS conflicts |
| Mobile issues | Test on actual devices |

---

## Next Steps

- [Assistants](/docs/assistants/overview) - Configure the assistant for your widget
- [Conversations](/docs/conversations/overview) - View widget conversation history
