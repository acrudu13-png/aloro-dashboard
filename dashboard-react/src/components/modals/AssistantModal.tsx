import { useState } from 'react';
import { X, Bot, Wrench, Settings2, Phone, User, MessageSquare } from 'lucide-react';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  assistantId?: string | null;
}

type TabKey = 'general' | 'tools' | 'advanced';

const ttsProviders = [
  { id: 'cartesia', name: 'Cartesia' },
  { id: 'minimax', name: 'Minimax' },
  { id: 'elevenlabs', name: 'ElevenLabs' },
];

const voicesByProvider: Record<string, string[]> = {
  cartesia: ['Luna', 'Mason', 'Sofia', 'Atlas', 'River', 'Olive'],
  minimax: ['Emma', 'James', 'Olivia', 'William', 'Ava', 'Benjamin'],
  elevenlabs: ['Rachel', 'Domi', 'Bella', 'Antoni', 'Elli', 'Josh'],
};

const webhooks = [
  { id: 'none', name: 'None' },
  { id: 'wh-1', name: 'Post-call Analytics' },
  { id: 'wh-2', name: 'CRM Sync' },
  { id: 'wh-3', name: 'Slack Notification' },
];

export function AssistantModal({ isOpen, onClose, assistantId }: AssistantModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  
  // General tab state
  const [whoSpeaksFirst, setWhoSpeaksFirst] = useState<'agent' | 'customer'>('agent');
  const [initialMessage, setInitialMessage] = useState('Hello! This is an automated call from Telerenta regarding your account.');
  const [prompt, setPrompt] = useState(`You are a professional debt collection assistant. Your goal is to:
- Politely remind the customer of their outstanding balance
- Negotiate a payment arrangement if needed
- Extract promise-to-pay dates when possible
- Escalate to human agent if the customer requests it or becomes hostile

Always remain calm and professional. Never make threats or use aggressive language.`);
  const [ttsProvider, setTtsProvider] = useState('cartesia');
  const [selectedVoice, setSelectedVoice] = useState('Luna');

  // Tools tab state
  const [coldTransferEnabled, setColdTransferEnabled] = useState(true);
  const [whenToTransfer, setWhenToTransfer] = useState('Transfer the call when the customer asks for a real assistant');
  const [transferNumber, setTransferNumber] = useState('+40 744 123 456');
  const [endCallEnabled, setEndCallEnabled] = useState(true);
  const [whenToEnd, setWhenToEnd] = useState('End the call when the customer hangs up or becomes abusive');
  const [dtmfEnabled, setDtmfEnabled] = useState(false);
  const [dtmfPrompt, setDtmfPrompt] = useState('Press 1 to confirm your payment date, or press 2 to speak with an agent');

  // Advanced tab state
  const [postCallWebhook, setPostCallWebhook] = useState('wh-1');
  const [reengagementMessage, setReengagementMessage] = useState('Hi {name}, we tried to reach you about your account. Please call us back at your earliest convenience.');

  if (!isOpen) return null;

  const tabs: { key: TabKey; label: string; icon: typeof Bot }[] = [
    { key: 'general', label: 'General', icon: Bot },
    { key: 'tools', label: 'Tools', icon: Wrench },
    { key: 'advanced', label: 'Advanced', icon: Settings2 },
  ];

  const isNew = !assistantId;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            {isNew ? 'Create Assistant' : 'Edit Assistant'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex px-6">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition -mb-px ${
                  activeTab === tab.key
                    ? 'border-accent-500 text-accent-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Assistant Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Assistant Name
                </label>
                <input
                  type="text"
                  defaultValue="Debt Collection"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              {/* Who Speaks First */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Who speaks first?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="whoSpeaksFirst"
                      checked={whoSpeaksFirst === 'agent'}
                      onChange={() => setWhoSpeaksFirst('agent')}
                      className="w-4 h-4 text-accent-500"
                    />
                    <Bot className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">Agent</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="whoSpeaksFirst"
                      checked={whoSpeaksFirst === 'customer'}
                      onChange={() => setWhoSpeaksFirst('customer')}
                      className="w-4 h-4 text-accent-500"
                    />
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">Customer</span>
                  </label>
                </div>
              </div>

              {/* Initial Message (if Agent speaks first) */}
              {whoSpeaksFirst === 'agent' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Initial Message
                  </label>
                  <textarea
                    value={initialMessage}
                    onChange={e => setInitialMessage(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                  />
                </div>
              )}

              {/* Prompt Editor */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  System Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 font-mono resize-y"
                  style={{ minHeight: '150px' }}
                />
                <p className="text-xs text-slate-400 mt-1">Define the assistant's behavior and goals</p>
              </div>

              {/* TTS Provider */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  TTS Provider
                </label>
                <select
                  value={ttsProvider}
                  onChange={e => {
                    setTtsProvider(e.target.value);
                    setSelectedVoice(voicesByProvider[e.target.value][0]);
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                >
                  {ttsProviders.map(provider => (
                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                  ))}
                </select>
              </div>

              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Voice
                </label>
                <select
                  value={selectedVoice}
                  onChange={e => setSelectedVoice(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                >
                  {voicesByProvider[ttsProvider].map(voice => (
                    <option key={voice} value={voice}>{voice}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="space-y-6">
              {/* Cold Transfer */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">Cold Transfer</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={coldTransferEnabled}
                      onChange={e => setColdTransferEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>
                {coldTransferEnabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">When to transfer</label>
                      <textarea
                        value={whenToTransfer}
                        onChange={e => setWhenToTransfer(e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Transfer Number</label>
                      <input
                        type="text"
                        value={transferNumber}
                        onChange={e => setTransferNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* End Call */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">End Call</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={endCallEnabled}
                      onChange={e => setEndCallEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>
                {endCallEnabled && (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">When to end</label>
                    <textarea
                      value={whenToEnd}
                      onChange={e => setWhenToEnd(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none bg-white"
                    />
                  </div>
                )}
              </div>

              {/* DTMF */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">DTMF (Keypad Input)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dtmfEnabled}
                      onChange={e => setDtmfEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>
                {dtmfEnabled && (
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">DTMF Prompt</label>
                    <textarea
                      value={dtmfPrompt}
                      onChange={e => setDtmfPrompt(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none bg-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              {/* Post-call Webhook */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Post-call Webhook
                </label>
                <select
                  value={postCallWebhook}
                  onChange={e => setPostCallWebhook(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white"
                >
                  {webhooks.map(wh => (
                    <option key={wh.id} value={wh.id}>{wh.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">Trigger a webhook after each call completes</p>
              </div>

              {/* Re-engagement Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Re-engagement Text Message
                </label>
                <textarea
                  value={reengagementMessage}
                  onChange={e => setReengagementMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Sent when call is unanswered. Use {'{name}'} for customer name placeholder.
                </p>
              </div>

              {/* Additional Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Max Call Duration (min)
                  </label>
                  <input
                    type="number"
                    defaultValue={10}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Silence Timeout (sec)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg text-sm font-medium transition"
          >
            {isNew ? 'Create Assistant' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
