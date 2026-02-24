---
sidebar_position: 12
---

# Knowledge Bases

Give your AI assistants access to your documentation and content.

## What Are Knowledge Bases?

Knowledge Bases (KBs) are collections of documents and web pages that your AI assistants can reference during conversations. This allows your assistants to:

- Answer specific questions about your products/services
- Reference company policies and procedures
- Provide accurate, up-to-date information
- Handle detailed inquiries without scripting every response

---

## How It Works

```
1. Add Content
   URLs, PDFs, documents
        ↓
2. Processing
   AI indexes and understands content
        ↓
3. Active
   Assistant searches KB during calls
        ↓
4. Response
   Answers based on your content
```

---

## Processing States

| State | Description |
|-------|-------------|
| **Empty** | No content added yet |
| **Processing** | AI is indexing content |
| **Active** | Ready for use |
| **Failed** | Processing error occurred |

---

## Creating a Knowledge Base

### Step 1: Create

1. Navigate to **Knowledge Bases**
2. Click **Create Knowledge Base**
3. Enter name and description

![Create Knowledge Base](/img/create-kb.png)

### Step 2: Add Content

#### Website URLs

Add URLs to crawl:

```
https://yourcompany.com/faq
https://yourcompany.com/products
https://yourcompany.com/policies
```

- Supports recursive crawling
- Follows links within domain
- Extracts main content

#### Documents

Upload files:
- **PDF** - Documents, manuals, guides
- **DOCX** - Word documents
- **TXT** - Plain text files

### Step 3: Processing

Click **Process** to start indexing:

- Content is chunked and embedded
- Vector search index created
- Usually completes in minutes

### Step 4: Assign to Assistant

1. Open assistant configuration
2. Navigate to **Tools** section
3. Enable Knowledge Base
4. Select your KB

---

## Integration Modes

| Mode | How It Works | Best For |
|------|-------------|----------|
| **Function Call** | Search only when AI needs it | Most use cases, faster |
| **Prompt Injection** | Search after every message | Complex reasoning needs |

:::tip Recommendation
Use **Function Call** mode for most scenarios. It's more efficient and provides lower latency.
:::

---

## Content Best Practices

### Document Structure

- Use clear headings and sections
- Include FAQs with Q&A format
- Keep paragraphs focused
- Add examples and details

### Website Content

- Ensure pages are publicly accessible
- Use descriptive page titles
- Include relevant metadata
- Keep content updated

### What to Include

✅ **Good for Knowledge Bases:**
- Product specifications
- Pricing information
- Company policies
- FAQ answers
- Service descriptions
- Process documentation

❌ **Not Recommended:**
- Personal/sensitive data
- Frequently changing information
- Large media files
- Irrelevant marketing content

---

## Managing Knowledge Bases

### Updating Content

1. Add new URLs or documents
2. Click **Reprocess**
3. Wait for indexing to complete

### Removing Content

1. Click the trash icon on items
2. Reprocess to update the index

### Monitoring Usage

- Track KB searches in call logs
- See which content is referenced
- Identify gaps in coverage

---

## Example Use Cases

### Customer Support

**Content:**
- FAQ pages
- Product manuals
- Troubleshooting guides
- Warranty information

**Assistant prompt:**
```text
You are a customer support agent. Use the knowledge base to answer
questions about products, policies, and troubleshooting. If you
can't find an answer, offer to transfer to a human agent.
```

### Sales Assistant

**Content:**
- Product catalog
- Pricing sheets
- Comparison guides
- Case studies

**Assistant prompt:**
```text
You are a sales representative. Use the knowledge base to provide
accurate product information, pricing, and comparisons. Help
qualify leads and schedule follow-ups.
```

### Healthcare Scheduling

**Content:**
- Available services
- Provider information
- Insurance accepted
- Preparation instructions

**Assistant prompt:**
```text
You are a healthcare scheduling assistant. Use the knowledge base
to answer questions about services, providers, and preparation
requirements. Help patients book appropriate appointments.
```

---

## Troubleshooting

### KB Not Returning Results

| Issue | Solution |
|-------|----------|
| Content not processed | Check processing status |
| Content irrelevant | Review and update documents |
| Query too vague | Improve prompt instructions |
| Mode mismatch | Try Prompt Injection mode |

### Slow Responses

- Reduce document count
- Use Function Call mode
- Check content relevance
- Consider chunking large documents

### Incorrect Information

- Verify source content is accurate
- Reprocess after updates
- Add clarifying content
- Use prompt instructions for guidance

---

## Limits & Considerations

- Processing time varies with content size
- Large documents are chunked automatically
- Some formatting may be lost
- Regular updates improve accuracy

---

## Next Steps

- [Assistants](/docs/assistants/overview) - Assign KBs to assistants
- [Testing](/docs/assistants/testing) - Test KB integration
