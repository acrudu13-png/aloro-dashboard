// @ts-check

/**
 * Aloro Documentation Sidebar Configuration
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/quickstart',
      ],
    },
    {
      type: 'category',
      label: 'Assistants',
      items: [
        'assistants/overview',
        'assistants/configuration',
        'assistants/testing',
      ],
    },
    {
      type: 'category',
      label: 'Calls',
      items: [
        'calls/overview',
        'calls/insights',
      ],
    },
    {
      type: 'category',
      label: 'Campaigns',
      items: [
        'campaigns/overview',
      ],
    },
    {
      type: 'category',
      label: 'Conversations',
      items: [
        'conversations/overview',
      ],
    },
    {
      type: 'category',
      label: 'WhatsApp',
      items: [
        'whatsapp/senders',
        'whatsapp/templates',
      ],
    },
    {
      type: 'category',
      label: 'Knowledge Bases',
      items: [
        'knowledge-bases/overview',
      ],
    },
    {
      type: 'category',
      label: 'Web Widget',
      items: [
        'web-widget/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Phone Numbers',
      items: [
        'phone-numbers/overview',
      ],
    },
    {
      type: 'category',
      label: 'Webhooks',
      items: [
        'webhooks/post-call',
      ],
    },
    {
      type: 'category',
      label: 'Dashboards',
      items: [
        'dashboards/custom',
      ],
    },
    'glossary',
  ],
};

export default sidebars;
