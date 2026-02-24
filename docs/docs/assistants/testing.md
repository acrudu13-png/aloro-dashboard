---
sidebar_position: 5
---

# Testing Assistants

Before deploying your assistant, thoroughly test it using the built-in testing tools.

## Testing Methods

| Method | Speed | Cost | Best For |
|--------|-------|------|----------|
| **Test Chat** | Fastest | Lowest | Rapid iteration, prompt tuning |
| **Web Call** | Fast | Medium | Voice and flow testing |
| **Phone Call** | Real-time | Full | Final validation |

---

## Test Chat

Text-based testing for rapid iteration without voice latency.

### Accessing Test Chat

1. Open any assistant
2. Click **Test Chat** button
3. A slide-over panel appears

![Test Chat Panel](/img/test-chat-panel.png)

### Features

- **Text input** - Type messages to simulate conversation
- **Real-time responses** - See AI responses instantly
- **Variable testing** - Test pre-call variables
- **Tool execution** - See tool calls in action
- **Conversation record** - Review saved in Conversations

### Use Cases

- Prompt engineering and refinement
- Testing variable collection
- Verifying tool integrations
- Quick sanity checks

### Tips

:::tip Iteration Workflow
1. Write/modify prompt
2. Test Chat immediately
3. Iterate based on responses
4. Repeat until satisfied
:::

---

## Web Call

Browser-based voice testing with real AI responses.

### Starting a Web Call

1. Click **Web Call** button on assistant card
2. Allow microphone access when prompted
3. Speak with your assistant through your browser

![Web Call](/img/web-call.png)

### Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- Microphone access
- Stable internet connection

### What It Tests

- Voice recognition accuracy
- Response timing and latency
- Voice quality and tone
- Conversation flow

### Limitations

- Uses your account balance
- May have slight latency differences from phone calls
- Browser audio quality may differ from phone

---

## Phone Call

Real outbound call to test the complete experience.

### Making a Test Call

1. Click **Phone Call** button
2. Enter a test phone number
3. Click **Call**
4. Answer your phone and converse

![Phone Call Test](/img/phone-call-test.png)

### Use Cases

- Final validation before campaigns
- Testing with real phone audio quality
- Demonstrating to stakeholders
- Verifying caller ID display

### Best Practices

:::warning Cost Awareness
Phone calls deduct full call costs from your balance. Use Test Chat for iteration, save phone calls for final validation.
:::

**Recommended workflow:**
1. Develop and iterate with Test Chat
2. Validate voice with Web Call
3. Final test with Phone Call
4. Launch campaign or go live

---

## Testing Checklist

Before going live, verify:

### Functionality

- [ ] Greeting sounds natural
- [ ] Main use cases work correctly
- [ ] Tools execute properly (transfer, booking, etc.)
- [ ] Variables are collected/extracted
- [ ] Fallback responses handle unknown inputs

### Voice & Audio

- [ ] Voice selection matches brand
- [ ] Pronunciation is clear
- [ ] Filler audio sounds natural
- [ ] Interruption handling works
- [ ] No awkward silences

### Edge Cases

- [ ] Handles background noise
- [ ] Responds to rapid interruptions
- [ ] Gracefully handles "I don't know"
- [ ] Properly ends the call
- [ ] Voicemail detection works

### Integration

- [ ] Webhooks fire correctly
- [ ] CRM data syncs
- [ ] Post-call variables captured
- [ ] Recordings available

---

## Reviewing Conversations

All test conversations are saved in the **Conversations** section.

### What's Recorded

- Message history with timestamps
- Variables collected
- Cost and token usage
- Conversation type badge

![Conversation Review](/img/conversation-review.png)

### Using for Improvement

1. Review test conversations regularly
2. Identify patterns in failures
3. Update prompts based on issues
4. Re-test to verify improvements

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| AI responds too slowly | Switch to faster model or Speech-to-Speech mode |
| AI interrupts too much | Increase VAD sensitivity |
| AI doesn't interrupt enough | Decrease VAD sensitivity |
| Wrong pronunciation | Use diacritics or initial audio |
| Tools not executing | Check tool configuration and API access |
| Variables not captured | Verify variable schema and prompt instructions |

---

## Next Steps

- [Post-Call Webhooks](/docs/webhooks/post-call) - Send test data to your systems
- [Conversations](/docs/conversations/overview) - Review all conversation records
- [Campaigns](/docs/campaigns/overview) - Deploy at scale
