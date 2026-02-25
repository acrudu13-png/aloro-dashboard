import { createHashRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { CallsPage } from './pages/CallsPage';
import { InsightsPage } from './pages/InsightsPage';
import { AssistantsPage } from './pages/AssistantsPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { CustomersPage } from './pages/CustomersPage';
import { PromptSnippetsPage } from './pages/PromptSnippetsPage';
import {
  ConversationsPage,
  KnowledgeBasesPage,
  WebWidgetPage,
  PhoneNumbersPage,
  WhatsAppPage,
  WebhooksPage,
  CustomDashboardsPage,
  DocumentationPage,
} from './pages';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'calls',
        element: <CallsPage />,
      },
      {
        path: 'insights',
        element: <InsightsPage />,
      },
      {
        path: 'campaigns',
        element: <CampaignsPage />,
      },
      {
        path: 'assistants',
        element: <AssistantsPage />,
      },
      {
        path: 'conversations',
        element: <ConversationsPage />,
      },
      {
        path: 'customers',
        element: <CustomersPage />,
      },
      {
        path: 'knowledge-bases',
        element: <KnowledgeBasesPage />,
      },
      {
        path: 'prompt-snippets',
        element: <PromptSnippetsPage />,
      },
      {
        path: 'web-widget',
        element: <WebWidgetPage />,
      },
      {
        path: 'phone-numbers',
        element: <PhoneNumbersPage />,
      },
      {
        path: 'whatsapp',
        element: <WhatsAppPage />,
      },
      {
        path: 'webhooks',
        element: <WebhooksPage />,
      },
      {
        path: 'custom-dashboards',
        element: <CustomDashboardsPage />,
      },
      {
        path: 'documentation',
        element: <DocumentationPage />,
      },
    ],
  },
]);
