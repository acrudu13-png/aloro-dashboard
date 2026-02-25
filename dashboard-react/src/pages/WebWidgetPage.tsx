import { useState } from 'react';
import { MessageCircle, X, Send, Palette, Settings2 } from 'lucide-react';

interface WidgetConfig {
  primaryColor: string;
  position: 'bottom-right' | 'bottom-left';
  greeting: string;
  title: string;
}

const colorPresets = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Pink', value: '#ec4899' },
];

export function WebWidgetPage() {
  const [config, setConfig] = useState<WidgetConfig>({
    primaryColor: '#3b82f6',
    position: 'bottom-right',
    greeting: 'Hi! How can I help you today?',
    title: 'Chat Support',
  });

  const [isWidgetOpen, setIsWidgetOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: config.greeting },
  ]);
  const [showCustomizer, setShowCustomizer] = useState(true);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: message }]);
    setMessage('');
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Thanks for your message! This is a demo widget. In production, I'd be connected to your voice AI assistant." 
      }]);
    }, 1000);
  };

  const getEmbedCode = () => {
    return `<script src="https://cdn.aloro.ai/widget.js"></script>
<script>
  AloroWidget.init({
    orgId: 'your-org-id',
    assistantId: 'your-assistant-id',
    primaryColor: '${config.primaryColor}',
    position: '${config.position}',
    greeting: '${config.greeting}',
    title: '${config.title}'
  });
</script>`;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-800">Web Widget</h1>
        <p className="text-sm text-slate-500 mt-0.5">Configure and preview your embeddable chat widget</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customization Panel */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Settings2 className="w-4 h-4" />
              Widget Configuration
            </h2>
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="text-xs text-accent-600 hover:underline"
            >
              {showCustomizer ? 'Hide' : 'Show'}
            </button>
          </div>

          {showCustomizer && (
            <div className="p-4 space-y-5">
              {/* Primary Color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Primary Color
                </label>
                <div className="flex gap-2">
                  {colorPresets.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setConfig(c => ({ ...c, primaryColor: color.value }))}
                      className={`w-8 h-8 rounded-lg border-2 transition ${
                        config.primaryColor === color.value
                          ? 'border-slate-800 scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={e => setConfig(c => ({ ...c, primaryColor: e.target.value }))}
                    className="w-8 h-8 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Position
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      checked={config.position === 'bottom-right'}
                      onChange={() => setConfig(c => ({ ...c, position: 'bottom-right' }))}
                      className="w-4 h-4 text-accent-500"
                    />
                    <span className="text-sm text-slate-600">Bottom Right</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="position"
                      checked={config.position === 'bottom-left'}
                      onChange={() => setConfig(c => ({ ...c, position: 'bottom-left' }))}
                      className="w-4 h-4 text-accent-500"
                    />
                    <span className="text-sm text-slate-600">Bottom Left</span>
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Widget Title
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={e => setConfig(c => ({ ...c, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              {/* Greeting */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Greeting Message
                </label>
                <textarea
                  value={config.greeting}
                  onChange={e => setConfig(c => ({ ...c, greeting: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Embed Code */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Embed Code
            </h2>
          </div>
          <div className="p-4">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs overflow-x-auto font-mono">
              {getEmbedCode()}
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(getEmbedCode())}
              className="mt-3 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>

      {/* Demo Widget - positioned fixed */}
      {isWidgetOpen && (
        <div
          className={`fixed bottom-6 ${config.position === 'bottom-right' ? 'right-6' : 'left-6'} w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in`}
          style={{ maxWidth: 'calc(100vw - 3rem)' }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{config.title}</span>
            </div>
            <button
              onClick={() => setIsWidgetOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-sm'
                      : 'bg-white text-slate-700 rounded-bl-sm border border-slate-200'
                  }`}
                  style={msg.role === 'user' ? { backgroundColor: config.primaryColor } : {}}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-full text-white transition hover:opacity-90"
                style={{ backgroundColor: config.primaryColor }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Widget Toggle Button (when closed) */}
      {!isWidgetOpen && (
        <button
          onClick={() => setIsWidgetOpen(true)}
          className={`fixed bottom-6 ${config.position === 'bottom-right' ? 'right-6' : 'left-6'} w-14 h-14 rounded-full text-white shadow-lg hover:scale-105 transition z-50 flex items-center justify-center`}
          style={{ backgroundColor: config.primaryColor }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
