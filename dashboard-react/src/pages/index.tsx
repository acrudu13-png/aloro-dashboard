import { PlaceholderPage } from './PlaceholderPage';
import { WebWidgetPage as WebWidgetPageComponent } from './WebWidgetPage';

export function ConversationsPage() {
  return <PlaceholderPage title="Conversations" description="WhatsApp and Web chat history" />;
}

export function KnowledgeBasesPage() {
  return <PlaceholderPage title="Knowledge Bases" description="Manage document collections for AI context" />;
}

export function WebWidgetPage() {
  return <WebWidgetPageComponent />;
}

export function PhoneNumbersPage() {
  return <PlaceholderPage title="Phone Numbers" description="Manage inbound and outbound phone numbers" />;
}

export function WhatsAppPage() {
  return <PlaceholderPage title="WhatsApp" description="WhatsApp Business integration" />;
}

export function WebhooksPage() {
  return <PlaceholderPage title="Webhooks" description="Post-call and event webhooks" />;
}

export function CustomDashboardsPage() {
  return <PlaceholderPage title="Custom Dashboards" description="Build custom analytics views" />;
}

export function DocumentationPage() {
  return <PlaceholderPage title="Documentation" description="API docs and guides" />;
}
