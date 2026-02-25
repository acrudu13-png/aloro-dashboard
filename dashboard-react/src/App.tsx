import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { PlaceholderPage } from './pages/PlaceholderPage';

const pageConfig: Record<string, { title: string; description?: string }> = {
  dashboard: { title: 'Dashboard', description: 'Overview of your voice AI operations' },
  calls: { title: 'Calls', description: 'View and manage call history' },
  insights: { title: 'Call Insights', description: 'Analyze call outcomes and trends' },
  campaigns: { title: 'Campaigns', description: 'Outbound campaign management' },
  assistants: { title: 'Assistants', description: 'Configure and manage voice AI agents' },
  conversations: { title: 'Conversations', description: 'WhatsApp and Web chat history' },
  'knowledge-bases': { title: 'Knowledge Bases', description: 'Manage document collections for AI context' },
  whatsapp: { title: 'WhatsApp', description: 'WhatsApp Business integration' },
  'web-widget': { title: 'Web Widget', description: 'Configure your embeddable chat/voice widget' },
  'phone-numbers': { title: 'Phone Numbers', description: 'Manage inbound and outbound phone numbers' },
  webhooks: { title: 'Webhooks', description: 'Post-call and event webhooks' },
  'custom-dashboards': { title: 'Custom Dashboards', description: 'Build custom analytics views' },
  settings: { title: 'Settings', description: 'Organization and account settings' },
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      default:
        const config = pageConfig[currentPage] || { title: currentPage };
        return <PlaceholderPage {...config} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
