// Aloro Dashboard - Main Application JavaScript

let currentStep = 1;
const totalSteps = 6;

// Chart instances
let callMetricsChart = null;
let callOutcomesChart = null;

// Chart data
const chartData = [
  { name: 'Mon', callVolume: 145, outcomes: 128, talkTime: 42, answered: 138 },
  { name: 'Tue', callVolume: 198, outcomes: 175, talkTime: 58, answered: 185 },
  { name: 'Wed', callVolume: 112, outcomes: 98, talkTime: 31, answered: 105 },
  { name: 'Thu', callVolume: 223, outcomes: 201, talkTime: 67, answered: 215 },
  { name: 'Fri', callVolume: 178, outcomes: 156, talkTime: 52, answered: 168 },
  { name: 'Sat', callVolume: 89, outcomes: 78, talkTime: 24, answered: 82 },
  { name: 'Sun', callVolume: 45, outcomes: 38, talkTime: 12, answered: 40 },
];

const outcomeData = [
  { name: 'Mon', promiseToPay: 38, humanEscalation: 3, refused: 7, noResolution: 12 },
  { name: 'Tue', promiseToPay: 52, humanEscalation: 5, refused: 9, noResolution: 15 },
  { name: 'Wed', promiseToPay: 29, humanEscalation: 2, refused: 5, noResolution: 10 },
  { name: 'Thu', promiseToPay: 61, humanEscalation: 4, refused: 11, noResolution: 18 },
  { name: 'Fri', promiseToPay: 48, humanEscalation: 3, refused: 8, noResolution: 14 },
  { name: 'Sat', promiseToPay: 24, humanEscalation: 1, refused: 3, noResolution: 7 },
  { name: 'Sun', promiseToPay: 12, humanEscalation: 0, refused: 2, noResolution: 4 },
];

let activeLines = ['callVolume', 'answered'];
let activeOutcomeLines = ['promiseToPay', 'humanEscalation'];

const lineConfig = [
  { key: 'callVolume', label: 'Call Volume', color: '#3b82f6' },
  { key: 'answered', label: 'Answered Calls', color: '#10b981' },
  { key: 'talkTime', label: 'Talk Time (min)', color: '#8b5cf6' },
  { key: 'outcomes', label: 'Successful Outcomes', color: '#f59e0b' },
];

const outcomeLineConfig = [
  { key: 'promiseToPay', label: 'Promise to Pay', color: '#10b981' },
  { key: 'humanEscalation', label: 'Human Escalation', color: '#ef4444' },
  { key: 'refused', label: 'Refused/Dispute', color: '#f59e0b' },
  { key: 'noResolution', label: 'No Resolution', color: '#94a3b8' },
];

$(document).ready(function() {
    // Sidebar toggle (desktop collapse + mobile open)
    $('#toggleSidebar').click(function() {
        if (window.innerWidth < 1024) {
            // Mobile: toggle sidebar overlay
            toggleSidebar();
        } else {
            // Desktop: collapse sidebar
            $('body').toggleClass('sidebar-collapsed');
        }
    });

    // Navigation
    $('.sidebar-item[data-page]').click(function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        $('.sidebar-item').removeClass('active');
        $(this).addClass('active');
        $('.page').addClass('hidden');
        $('#page-' + page).removeClass('hidden');
        
        // Close mobile sidebar after navigation
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    });

    // Temperature slider
    $('#temperature').on('input', function() {
        $('#tempValue').text((this.value / 100).toFixed(1));
    });
});

// Mobile sidebar functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.toggle('mobile-open');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
}

function toggleCallDetails(row) {
    const details = $(row).next('.call-details');
    const icon = $(row).find('.expand-icon');
    
    if (details.hasClass('expanded')) {
        details.removeClass('expanded');
        icon.css('transform', 'rotate(0deg)');
    } else {
        details.addClass('expanded');
        icon.css('transform', 'rotate(90deg)');
    }
}

function openAssistantModal(id) {
    currentStep = 1;
    updateStepUI();
    $('#modalTitle').text(id ? 'Edit Assistant' : 'Create Assistant');
    $('#assistantModal').fadeIn();
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepUI();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepUI();
    }
}

function updateStepUI() {
    // Hide all steps
    $('.step-content').addClass('hidden');
    $('#step-' + currentStep).removeClass('hidden');

    // Update step tabs
    $('.step-tab').removeClass('text-accent-600 border-accent-500 border-b-2').addClass('text-slate-500');
    $('.step-tab[data-step="' + currentStep + '"]').removeClass('text-slate-500').addClass('text-accent-600 border-accent-500 border-b-2');

    // Update buttons
    $('#prevBtn').prop('disabled', currentStep === 1);
    
    if (currentStep === totalSteps) {
        $('#nextBtn').addClass('hidden');
        $('#saveBtn').removeClass('hidden');
    } else {
        $('#nextBtn').removeClass('hidden');
        $('#saveBtn').addClass('hidden');
    }
}

function toggleTool(card) {
    $(card).toggleClass('enabled');
    const toggle = $(card).find('.rounded-full');
    if ($(card).hasClass('enabled')) {
        toggle.removeClass('bg-slate-200').addClass('bg-accent-500');
        toggle.find('div').removeClass('left-0.5').addClass('right-0.5');
    } else {
        toggle.removeClass('bg-accent-500').addClass('bg-slate-200');
        toggle.find('div').removeClass('right-0.5').addClass('left-0.5');
    }
}

function addVariable() {
    const html = `
        <div class="variable-row flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
            <div class="flex-1 grid grid-cols-5 gap-2">
                <div>
                    <label class="block text-xs text-slate-500 mb-1">Name</label>
                    <input type="text" placeholder="variable_name" class="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-sm font-mono">
                </div>
                <div>
                    <label class="block text-xs text-slate-500 mb-1">Type</label>
                    <select class="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-sm">
                        <option>string</option>
                        <option>number</option>
                        <option>boolean</option>
                        <option>date</option>
                        <option>enum</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs text-slate-500 mb-1">Required</label>
                    <select class="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-sm">
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>
                <div class="col-span-2">
                    <label class="block text-xs text-slate-500 mb-1">Description / Enum Values</label>
                    <input type="text" placeholder="Description or comma-separated enum values" class="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-sm">
                </div>
            </div>
            <button onclick="$(this).closest('.variable-row').remove()" class="text-slate-400 hover:text-red-500 mt-5"><i class="fas fa-trash text-sm"></i></button>
        </div>
    `;
    $('#variablesList').append(html);
}

function saveAssistant() {
    // In real implementation, collect all form data and save
    alert('Assistant saved successfully!');
    $('#assistantModal').fadeOut();
}

// Step tab click
$(document).on('click', '.step-tab', function() {
    currentStep = parseInt($(this).data('step'));
    updateStepUI();
});

// Widget tab click
$(document).on('click', '.widget-tab', function() {
    const tab = $(this).data('tab');
    $('.widget-tab').removeClass('text-accent-600 border-accent-500 bg-accent-50').addClass('text-slate-500');
    $(this).removeClass('text-slate-500').addClass('text-accent-600 border-accent-500 bg-accent-50');
    $('.widget-tab-content').addClass('hidden');
    $('#widget-tab-' + tab).removeClass('hidden');
});

// Test Chat Panel
function openTestChat(assistantId, assistantName) {
    $('#testChatPanel').removeClass('translate-x-full');
    $('#testChatOverlay').removeClass('hidden');
}

function closeTestChat() {
    $('#testChatPanel').addClass('translate-x-full');
    $('#testChatOverlay').addClass('hidden');
}

function sendTestMessage() {
    const input = $('#testChatInput');
    const message = input.val().trim();
    if (!message) return;

    const messagesContainer = $('#testChatMessages');

    // Add user message
    messagesContainer.append(`
        <div class="flex items-start gap-3 justify-end">
            <div class="bg-accent-500 rounded-lg p-3 max-w-[80%]">
                <p class="text-sm text-white">${message}</p>
            </div>
            <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-user text-slate-500 text-sm"></i>
            </div>
        </div>
    `);

    input.val('');
    messagesContainer.scrollTop(messagesContainer[0].scrollHeight);

    // Simulate AI response (in real implementation, this would call the API)
    setTimeout(() => {
        messagesContainer.append(`
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-accent-600 text-sm"></i>
                </div>
                <div class="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                    <p class="text-sm text-slate-700">Mulțumesc pentru mesaj! Un operator va reveni cu un răspuns în curând.</p>
                </div>
            </div>
        `);
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
    }, 1000);
}

// Enter key for test chat
$(document).on('keypress', '#testChatInput', function(e) {
    if (e.which === 13) {
        sendTestMessage();
    }
});

// Campaign Modal
function openCampaignModal() {
    $('#campaignModal').fadeIn();
}

function saveCampaign() {
    const name = $('#campaignName').val().trim();
    const assistant = $('#campaignAssistant').val();
    
    if (!name) {
        alert('Please enter a campaign name');
        return;
    }
    if (!assistant) {
        alert('Please select an assistant');
        return;
    }
    
    // In real implementation, save to API
    alert('Campaign created successfully!');
    $('#campaignModal').fadeOut();
    // Reset form
    $('#campaignName').val('');
    $('#campaignAssistant').val('');
}

// Knowledge Base Modal
function openKBModal() {
    $('#kbModal').fadeIn();
}

function saveKB() {
    // In real implementation, collect form data and save
    alert('Knowledge Base created successfully! Documents will be indexed shortly.');
    $('#kbModal').fadeOut();
}

// WhatsApp Sender Modal
function openWASenderModal() {
    $('#waSenderModal').fadeIn();
}

function saveWASender() {
    // In real implementation, collect form data and save
    alert('WhatsApp Sender added! Please verify the number to activate it.');
    $('#waSenderModal').fadeOut();
}

// WhatsApp Template Modal
function openWATemplateModal() {
    $('#waTemplateModal').fadeIn();
}

function saveWATemplate() {
    // In real implementation, collect form data and submit to Meta
    alert('Template submitted for approval! This usually takes 24-48 hours.');
    $('#waTemplateModal').fadeOut();
}

// Phone Number Modal
function openPhoneModal() {
    $('#phoneModal').fadeIn();
}

function savePhone() {
    // In real implementation, collect form data and save
    alert('Phone number added successfully!');
    $('#phoneModal').fadeOut();
}

// Webhook Modal
function openWebhookModal() {
    $('#webhookModal').fadeIn();
}

function saveWebhook() {
    // In real implementation, collect form data and save
    alert('Webhook added successfully!');
    $('#webhookModal').fadeOut();
}

// Custom Dashboard Modal
function openCustomDashboardModal() {
    alert('Custom Dashboard builder coming soon! This will include a drag-and-drop interface for building custom analytics dashboards.');
}

// ==========================================
// CUSTOMERS PAGE
// ==========================================

const customersData = [
  { id: '1', name: 'Maria Popescu', phone: '+40 744 123 456', email: 'maria.popescu@email.ro', totalCalls: 12, answeredCalls: 10, answerRate: 83.3, avgDuration: '4:32', lastContact: 'Feb 25, 2026', status: 'active' },
  { id: '2', name: 'Ion Ionescu', phone: '+40 756 234 567', email: 'ion.ionescu@email.ro', totalCalls: 8, answeredCalls: 6, answerRate: 75.0, avgDuration: '3:15', lastContact: 'Feb 24, 2026', status: 'callback' },
  { id: '3', name: null, phone: '+40 722 345 678', email: null, totalCalls: 5, answeredCalls: 2, answerRate: 40.0, avgDuration: '2:45', lastContact: 'Feb 23, 2026', status: 'active' },
  { id: '4', name: 'Elena Dumitrescu', phone: '+40 733 456 789', email: 'elena.d@email.ro', totalCalls: 15, answeredCalls: 14, answerRate: 93.3, avgDuration: '5:12', lastContact: 'Feb 25, 2026', status: 'completed' },
  { id: '5', name: 'Alexandru Marin', phone: '+40 744 567 890', email: 'alex.marin@email.ro', totalCalls: 3, answeredCalls: 0, answerRate: 0, avgDuration: '-', lastContact: 'Feb 20, 2026', status: 'do_not_call' },
  { id: '6', name: 'Cristina Stoica', phone: '+40 755 678 901', email: 'cristina.s@email.ro', totalCalls: 7, answeredCalls: 5, answerRate: 71.4, avgDuration: '3:48', lastContact: 'Feb 22, 2026', status: 'active' },
  { id: '7', name: null, phone: '+40 766 789 012', email: null, totalCalls: 4, answeredCalls: 3, answerRate: 75.0, avgDuration: '2:30', lastContact: 'Feb 21, 2026', status: 'callback' },
  { id: '8', name: 'Mihai Radu', phone: '+40 777 890 123', email: 'mihai.radu@email.ro', totalCalls: 9, answeredCalls: 7, answerRate: 77.8, avgDuration: '4:05', lastContact: 'Feb 24, 2026', status: 'active' },
  { id: '9', name: 'Ana Vasilescu', phone: '+40 788 901 234', email: 'ana.v@email.ro', totalCalls: 6, answeredCalls: 5, answerRate: 83.3, avgDuration: '3:22', lastContact: 'Feb 23, 2026', status: 'completed' },
  { id: '10', name: 'Dan Nicolae', phone: '+40 799 012 345', email: null, totalCalls: 2, answeredCalls: 1, answerRate: 50.0, avgDuration: '1:45', lastContact: 'Feb 19, 2026', status: 'do_not_call' },
  { id: '11', name: 'Ioana Georgescu', phone: '+40 711 123 456', email: 'ioana.g@email.ro', totalCalls: 11, answeredCalls: 9, answerRate: 81.8, avgDuration: '4:50', lastContact: 'Feb 25, 2026', status: 'active' },
  { id: '12', name: null, phone: '+40 722 234 567', email: null, totalCalls: 1, answeredCalls: 1, answerRate: 100.0, avgDuration: '5:30', lastContact: 'Feb 18, 2026', status: 'completed' },
  { id: '13', name: 'Florin Tudor', phone: '+40 733 345 678', email: 'florin.t@email.ro', totalCalls: 4, answeredCalls: 2, answerRate: 50.0, avgDuration: '2:15', lastContact: 'Feb 20, 2026', status: 'callback' },
  { id: '14', name: 'Laura Stan', phone: '+40 744 456 789', email: 'laura.stan@email.ro', totalCalls: 8, answeredCalls: 6, answerRate: 75.0, avgDuration: '3:35', lastContact: 'Feb 22, 2026', status: 'active' },
  { id: '15', name: 'Ciprian Neagu', phone: '+40 755 567 890', email: null, totalCalls: 3, answeredCalls: 2, answerRate: 66.7, avgDuration: '2:58', lastContact: 'Feb 21, 2026', status: 'active' },
];

let customersState = {
    filtered: [...customersData],
    sortKey: 'lastContact',
    sortDirection: 'desc',
    currentPage: 1,
    itemsPerPage: 10,
    activeActions: null
};

const statusConfig = {
  active: { label: 'Active', class: 'bg-green-100 text-green-700' },
  do_not_call: { label: 'Do Not Call', class: 'bg-red-100 text-red-700' },
  callback: { label: 'Call Back', class: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completed', class: 'bg-blue-100 text-blue-700' }
};

function filterCustomers() {
    const query = $('#customerSearch').val().toLowerCase();
    customersState.filtered = customersData.filter(c => {
        return c.phone.toLowerCase().includes(query) ||
               (c.name?.toLowerCase().includes(query) ?? false) ||
               (c.email?.toLowerCase().includes(query) ?? false);
    });
    customersState.currentPage = 1;
    renderCustomersTable();
}

function sortCustomers(key) {
    if (customersState.sortKey === key) {
        customersState.sortDirection = customersState.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        customersState.sortKey = key;
        customersState.sortDirection = 'asc';
    }
    
    customersState.filtered.sort((a, b) => {
        let aVal = a[key] ?? '';
        let bVal = b[key] ?? '';
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        if (aVal < bVal) return customersState.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return customersState.sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    renderCustomersTable();
}

function renderCustomersTable() {
    const { filtered, currentPage, itemsPerPage } = customersState;
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    
    let html = '';
    paginated.forEach(c => {
        const initials = c.name ? c.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?';
        const status = statusConfig[c.status];
        
        html += `
            <tr class="border-t border-slate-50 hover:bg-slate-50">
                <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                            <span class="text-xs font-medium text-slate-600">${c.name ? initials : '<i class="fas fa-user text-slate-400 text-sm"></i>'}</span>
                        </div>
                        <span class="text-sm text-slate-700">${c.name ?? '<span class="text-slate-400 italic">Unknown</span>'}</span>
                    </div>
                </td>
                <td class="py-3 px-4">
                    <div class="flex items-center gap-1.5 text-sm text-slate-600">
                        <i class="fas fa-phone text-slate-400 text-xs"></i>
                        ${c.phone}
                    </div>
                </td>
                <td class="py-3 px-4">
                    ${c.email ? `<div class="flex items-center gap-1.5 text-sm text-slate-600"><i class="fas fa-envelope text-slate-400 text-xs"></i>${c.email}</div>` : '<span class="text-slate-300">-</span>'}
                </td>
                <td class="py-3 px-4 text-sm text-slate-600">${c.totalCalls}</td>
                <td class="py-3 px-4 text-sm text-slate-600">${c.answeredCalls}</td>
                <td class="py-3 px-4">
                    <span class="text-sm font-medium ${c.answerRate >= 80 ? 'text-green-600' : c.answerRate >= 50 ? 'text-amber-600' : 'text-red-500'}">
                        ${c.answerRate.toFixed(1)}%
                    </span>
                </td>
                <td class="py-3 px-4 text-sm text-slate-600">${c.avgDuration}</td>
                <td class="py-3 px-4 text-sm text-slate-500">${c.lastContact}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-0.5 text-xs font-medium rounded ${status.class}">${status.label}</span>
                </td>
                <td class="py-3 px-4 relative">
                    <button onclick="toggleCustomerActions('${c.id}')" class="p-1 text-slate-400 hover:text-slate-600">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <div id="customer-actions-${c.id}" class="absolute right-4 top-full mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-10 ${customersState.activeActions === c.id ? '' : 'hidden'}">
                        <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <i class="fas fa-phone"></i> Call Now
                        </button>
                        <button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <i class="fas fa-clock"></i> Schedule Call
                        </button>
                        ${c.status !== 'do_not_call' 
                            ? `<button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><i class="fas fa-ban"></i> Do Not Call</button>`
                            : `<button class="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50"><i class="fas fa-check-circle"></i> Reactivate</button>`
                        }
                    </div>
                </td>
            </tr>
        `;
    });
    
    if (paginated.length === 0) {
        html = '<tr><td colspan="10" class="py-10 text-center text-slate-500">No customers found</td></tr>';
    }
    
    $('#customersTableBody').html(html);
    $('#customersCount').text(`${filtered.length} customers in database`);
    
    // Pagination
    const end = Math.min(start + itemsPerPage, filtered.length);
    $('#customersPaginationInfo').text(`Showing ${start + 1} to ${end} of ${filtered.length}`);
    
    let paginationHtml = `
        <button onclick="customersGoToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} 
            class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button onclick="customersGoToPage(${i})" 
                class="w-8 h-8 rounded text-sm font-medium transition ${currentPage === i ? 'bg-accent-500 text-white' : 'text-slate-600 hover:bg-slate-100'}">
                ${i}
            </button>
        `;
    }
    
    paginationHtml += `
        <button onclick="customersGoToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} 
            class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    $('#customersPaginationButtons').html(paginationHtml);
}

function customersGoToPage(page) {
    const totalPages = Math.ceil(customersState.filtered.length / customersState.itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        customersState.currentPage = page;
        renderCustomersTable();
    }
}

function toggleCustomerActions(id) {
    if (customersState.activeActions === id) {
        customersState.activeActions = null;
    } else {
        customersState.activeActions = id;
    }
    renderCustomersTable();
}

function exportCustomers() {
    const headers = ['Name', 'Phone', 'Email', 'Total Calls', 'Answered', 'Answer Rate', 'Avg Duration', 'Last Contact', 'Status'];
    const rows = customersState.filtered.map(c => [
        c.name ?? '', c.phone, c.email ?? '', c.totalCalls, c.answeredCalls,
        `${c.answerRate}%`, c.avgDuration, c.lastContact, c.status
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
}

// ==========================================
// PROMPT SNIPPETS PAGE
// ==========================================

let snippetsData = [
  { id: '1', name: 'company_info', content: 'Telerenta.ro is Romania\'s leading device rental platform, offering flexible rental plans for smartphones, tablets, and laptops. We\'ve been serving customers since 2019 with over 50,000 satisfied clients nationwide.', category: 'company', lastUpdated: 'Feb 20, 2026', usageCount: 5 },
  { id: '2', name: 'payment_instructions', content: 'To make a payment, please visit telerenta.ro/plata and enter your contract number. You can pay by card, bank transfer, or at any PayPoint location. Payment is typically processed within 24 hours.', category: 'instructions', lastUpdated: 'Feb 18, 2026', usageCount: 3 },
  { id: '3', name: 'legal_disclaimer', content: 'This call may be recorded for quality assurance and training purposes. By continuing this conversation, you acknowledge that you have been informed of the recording. Your personal data will be processed in accordance with GDPR regulations.', category: 'legal', lastUpdated: 'Feb 15, 2026', usageCount: 8 },
  { id: '4', name: 'hours_of_operation', content: 'Our customer service team is available Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 2:00 PM. We are closed on Sundays and public holidays.', category: 'company', lastUpdated: 'Feb 10, 2026', usageCount: 4 },
  { id: '5', name: 'late_fee_policy', content: 'A late payment fee of 5% of the outstanding amount is applied after the due date. Additional fees may apply for payments more than 30 days overdue. Please contact us if you\'re experiencing payment difficulties.', category: 'legal', lastUpdated: 'Feb 12, 2026', usageCount: 2 },
  { id: '6', name: 'return_instructions', content: 'To return your device, please ensure it\'s in good condition with all accessories. Schedule a pickup at telerenta.ro/return or visit any of our 12 drop-off locations across Romania. A return confirmation will be sent within 48 hours.', category: 'instructions', lastUpdated: 'Feb 22, 2026', usageCount: 2 },
  { id: '7', name: 'upgrade_options', content: 'You may be eligible to upgrade to a newer device model. Check available options in your account dashboard or ask your agent about current upgrade promotions and any applicable fees.', category: 'custom', lastUpdated: 'Feb 24, 2026', usageCount: 1 },
  { id: '8', name: 'contact_info', content: 'You can reach us by phone at 0800 123 456 (toll-free), by email at suport@telerenta.ro, or via WhatsApp at +40 744 123 456. Our website is www.telerenta.ro.', category: 'company', lastUpdated: 'Feb 8, 2026', usageCount: 6 },
];

let snippetsState = {
    filtered: [...snippetsData],
    categoryFilter: 'all',
    editingId: null,
    deleteConfirmId: null,
    copiedId: null
};

const categoryConfig = {
    company: { label: 'Company', class: 'bg-blue-100 text-blue-700' },
    legal: { label: 'Legal', class: 'bg-amber-100 text-amber-700' },
    instructions: { label: 'Instructions', class: 'bg-green-100 text-green-700' },
    custom: { label: 'Custom', class: 'bg-slate-100 text-slate-700' }
};

function filterSnippets() {
    const query = $('#snippetSearch').val().toLowerCase();
    const category = snippetsState.categoryFilter;
    
    snippetsState.filtered = snippetsData.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(query) || s.content.toLowerCase().includes(query);
        const matchesCategory = category === 'all' || s.category === category;
        return matchesSearch && matchesCategory;
    });
    
    renderSnippetsList();
}

function filterSnippetsByCategory(category) {
    snippetsState.categoryFilter = category;
    $('#snippetCategoryLabel').text(category === 'all' ? 'All Categories' : categoryConfig[category].label);
    $('#snippetCategoryDropdown').addClass('hidden');
    filterSnippets();
}

function toggleSnippetCategoryDropdown() {
    $('#snippetCategoryDropdown').toggleClass('hidden');
}

function renderSnippetsList() {
    const { filtered, deleteConfirmId, copiedId } = snippetsState;
    
    if (filtered.length === 0) {
        $('#snippetsList').html(`
            <div class="p-10 text-center">
                <div class="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i class="fas fa-file-code text-slate-400 text-xl"></i>
                </div>
                <h3 class="text-base font-semibold text-slate-800 mb-1">No snippets found</h3>
                <p class="text-sm text-slate-500 mb-5">Try adjusting your filters or create a new snippet</p>
                <button onclick="openSnippetModal()" class="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                    Create Snippet
                </button>
            </div>
        `);
        return;
    }
    
    let html = '<div class="divide-y divide-slate-100">';
    filtered.forEach(s => {
        const cat = categoryConfig[s.category];
        html += `
            <div class="p-4 hover:bg-slate-50 transition group">
                <div class="flex items-start gap-4">
                    <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-file-code text-accent-600"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <code class="text-sm font-mono font-medium text-accent-600 bg-accent-50 px-2 py-0.5 rounded">{{${s.name}}}</code>
                            <span class="px-2 py-0.5 text-xs font-medium rounded ${cat.class}">${cat.label}</span>
                        </div>
                        <p class="text-sm text-slate-600 line-clamp-2 mb-2">${s.content}</p>
                        <div class="flex items-center gap-4 text-xs text-slate-400">
                            <span>Updated ${s.lastUpdated}</span>
                            <span>•</span>
                            <span>${s.usageCount} agent${s.usageCount !== 1 ? 's' : ''} using</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button onclick="copySnippet('${s.id}', '${s.name}')" class="p-2 text-slate-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition" title="Copy snippet name">
                            <i class="fas fa-${copiedId === s.id ? 'check text-green-500' : 'copy'}"></i>
                        </button>
                        <button onclick="openSnippetModal('${s.id}')" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${deleteConfirmId === s.id ? `
                            <button onclick="deleteSnippet('${s.id}')" class="p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition" title="Confirm delete">
                                <i class="fas fa-check"></i>
                            </button>
                            <button onclick="cancelDeleteSnippet()" class="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-lg transition" title="Cancel">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : `
                            <button onclick="confirmDeleteSnippet('${s.id}')" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    $('#snippetsList').html(html);
}

function openSnippetModal(id = null) {
    snippetsState.editingId = id;
    
    if (id) {
        const snippet = snippetsData.find(s => s.id === id);
        $('#snippetModalTitle').text('Edit Snippet');
        $('#snippetName').val(snippet.name);
        $('#snippetCategory').val(snippet.category);
        $('#snippetContent').val(snippet.content);
        $('#snippetSaveBtn').text('Save Changes');
    } else {
        $('#snippetModalTitle').text('Create Snippet');
        $('#snippetName').val('');
        $('#snippetCategory').val('custom');
        $('#snippetContent').val('');
        $('#snippetSaveBtn').text('Create Snippet');
    }
    
    updateSnippetPreview();
    $('#snippetModal').fadeIn();
}

function updateSnippetPreview() {
    const content = $('#snippetContent').val();
    const name = $('#snippetName').val().toLowerCase().replace(/\s+/g, '_').replace(/[{}]/g, '');
    $('#snippetContentPreview').html(content || '<span class="text-slate-400 italic">Content will appear here...</span>');
    $('#snippetPreviewName').text('{{' + (name || 'snippet_name') + '}}');
}

$('#snippetName, #snippetContent').on('input', updateSnippetPreview);

function copySnippetName() {
    const name = $('#snippetName').val().toLowerCase().replace(/\s+/g, '_').replace(/[{}]/g, '');
    navigator.clipboard.writeText('{{' + name + '}}');
    $('#snippetCopyIcon').removeClass('fa-copy').addClass('fa-check text-green-500');
    setTimeout(() => $('#snippetCopyIcon').removeClass('fa-check text-green-500').addClass('fa-copy'), 2000);
}

function copySnippet(id, name) {
    navigator.clipboard.writeText('{{' + name + '}}');
    snippetsState.copiedId = id;
    renderSnippetsList();
    setTimeout(() => {
        snippetsState.copiedId = null;
        renderSnippetsList();
    }, 2000);
}

function saveSnippet() {
    const name = $('#snippetName').val().toLowerCase().replace(/\s+/g, '_').replace(/[{}]/g, '');
    const category = $('#snippetCategory').val();
    const content = $('#snippetContent').val();
    
    if (!name || !content) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (snippetsState.editingId) {
        const idx = snippetsData.findIndex(s => s.id === snippetsState.editingId);
        if (idx !== -1) {
            snippetsData[idx] = { ...snippetsData[idx], name, category, content, lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
        }
    } else {
        snippetsData.push({
            id: Date.now().toString(),
            name, category, content,
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            usageCount: 0
        });
    }
    
    $('#snippetModal').fadeOut();
    filterSnippets();
}

function confirmDeleteSnippet(id) {
    snippetsState.deleteConfirmId = id;
    renderSnippetsList();
}

function cancelDeleteSnippet() {
    snippetsState.deleteConfirmId = null;
    renderSnippetsList();
}

function deleteSnippet(id) {
    snippetsData = snippetsData.filter(s => s.id !== id);
    snippetsState.deleteConfirmId = null;
    filterSnippets();
}

// Initialize tables when document is ready
$(document).ready(function() {
    renderCustomersTable();
    renderSnippetsList();
    initCharts();
    initPerformanceMetricsChart();
});

// Initialize Chart.js charts
function initCharts() {
    const labels = chartData.map(d => d.name);
    
    // Call Metrics Chart
    const metricsCtx = document.getElementById('callMetricsChart');
    if (metricsCtx) {
        callMetricsChart = new Chart(metricsCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: lineConfig
                    .filter(l => activeLines.includes(l.key))
                    .map(l => ({
                        label: l.label,
                        data: chartData.map(d => d[l.key]),
                        borderColor: l.color,
                        backgroundColor: l.color + '20',
                        borderWidth: 2,
                        tension: 0.3,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                    }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: { display: true, position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 15 } },
                    tooltip: { backgroundColor: '#fff', titleColor: '#334155', bodyColor: '#64748b', borderColor: '#e2e8f0', borderWidth: 1, padding: 12, cornerRadius: 8 }
                },
                scales: {
                    x: { grid: { color: '#e2e8f0', drawBorder: false }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: '#e2e8f0', drawBorder: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }
    
    // Call Outcomes Chart
    const outcomesCtx = document.getElementById('callOutcomesChart');
    if (outcomesCtx) {
        callOutcomesChart = new Chart(outcomesCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: outcomeLineConfig
                    .filter(l => activeOutcomeLines.includes(l.key))
                    .map(l => ({
                        label: l.label,
                        data: outcomeData.map(d => d[l.key]),
                        borderColor: l.color,
                        backgroundColor: l.color + '20',
                        borderWidth: 2,
                        tension: 0.3,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        fill: false,
                    }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false, mode: 'index' },
                plugins: {
                    legend: { display: true, position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 15 } },
                    tooltip: { backgroundColor: '#fff', titleColor: '#334155', bodyColor: '#64748b', borderColor: '#e2e8f0', borderWidth: 1, padding: 12, cornerRadius: 8 }
                },
                scales: {
                    x: { grid: { color: '#e2e8f0', drawBorder: false }, ticks: { color: '#94a3b8' } },
                    y: { grid: { color: '#e2e8f0', drawBorder: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }
}

function toggleChartLine(key) {
    if (activeLines.includes(key)) {
        if (activeLines.length > 1) {
            activeLines = activeLines.filter(k => k !== key);
        }
    } else {
        activeLines.push(key);
    }
    updateChartToggles();
    updateCallMetricsChart();
}

function toggleOutcomeLine(key) {
    if (activeOutcomeLines.includes(key)) {
        if (activeOutcomeLines.length > 1) {
            activeOutcomeLines = activeOutcomeLines.filter(k => k !== key);
        }
    } else {
        activeOutcomeLines.push(key);
    }
    updateOutcomeToggles();
    updateCallOutcomesChart();
}

function updateChartToggles() {
    $('#chartToggles button').each(function() {
        const line = $(this).data('line');
        const config = lineConfig.find(l => l.key === line);
        if (activeLines.includes(line)) {
            $(this).removeClass('border border-slate-200 text-slate-600 hover:bg-slate-50').addClass('text-white').css('background-color', config.color);
        } else {
            $(this).addClass('border border-slate-200 text-slate-600 hover:bg-slate-50').removeClass('text-white').css('background-color', '');
        }
    });
}

function updateOutcomeToggles() {
    $('#outcomeToggles button').each(function() {
        const line = $(this).data('line');
        const config = outcomeLineConfig.find(l => l.key === line);
        if (activeOutcomeLines.includes(line)) {
            $(this).removeClass('border border-slate-200 text-slate-600 hover:bg-slate-50').addClass('text-white').css('background-color', config.color);
        } else {
            $(this).addClass('border border-slate-200 text-slate-600 hover:bg-slate-50').removeClass('text-white').css('background-color', '');
        }
    });
}

function updateCallMetricsChart() {
    if (!callMetricsChart) return;
    callMetricsChart.data.datasets = lineConfig
        .filter(l => activeLines.includes(l.key))
        .map(l => ({
            label: l.label,
            data: chartData.map(d => d[l.key]),
            borderColor: l.color,
            backgroundColor: l.color + '20',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: false,
        }));
    callMetricsChart.update();
}

function updateCallOutcomesChart() {
    if (!callOutcomesChart) return;
    callOutcomesChart.data.datasets = outcomeLineConfig
        .filter(l => activeOutcomeLines.includes(l.key))
        .map(l => ({
            label: l.label,
            data: outcomeData.map(d => d[l.key]),
            borderColor: l.color,
            backgroundColor: l.color + '20',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: false,
        }));
    callOutcomesChart.update();
}

// ==========================================
// INSIGHTS PAGE (Performance Metrics)
// ==========================================

let performanceMetricsChart = null;
let activeInsightsMetrics = ['llmTTFT', 'e2eLatency'];
let insightsTimeFrame = '7d';
let insightsSelectedAssistant = 'all';

const performanceData = [
  { name: 'Feb 12', llmTTFT: 0.8, ttsTTFB: 0.3, e2eLatency: 1.2, tokensPerCall: 245, cachedPercent: 35 },
  { name: 'Feb 13', llmTTFT: 0.7, ttsTTFB: 0.28, e2eLatency: 1.1, tokensPerCall: 252, cachedPercent: 38 },
  { name: 'Feb 14', llmTTFT: 0.9, ttsTTFB: 0.32, e2eLatency: 1.3, tokensPerCall: 268, cachedPercent: 32 },
  { name: 'Feb 15', llmTTFT: 0.75, ttsTTFB: 0.25, e2eLatency: 1.05, tokensPerCall: 238, cachedPercent: 42 },
  { name: 'Feb 16', llmTTFT: 0.85, ttsTTFB: 0.29, e2eLatency: 1.25, tokensPerCall: 255, cachedPercent: 36 },
  { name: 'Feb 17', llmTTFT: 0.65, ttsTTFB: 0.22, e2eLatency: 0.95, tokensPerCall: 228, cachedPercent: 45 },
  { name: 'Feb 18', llmTTFT: 0.78, ttsTTFB: 0.27, e2eLatency: 1.15, tokensPerCall: 242, cachedPercent: 40 },
  { name: 'Feb 19', llmTTFT: 0.82, ttsTTFB: 0.31, e2eLatency: 1.22, tokensPerCall: 261, cachedPercent: 34 },
  { name: 'Feb 20', llmTTFT: 0.72, ttsTTFB: 0.26, e2eLatency: 1.08, tokensPerCall: 248, cachedPercent: 39 },
  { name: 'Feb 21', llmTTFT: 0.68, ttsTTFB: 0.24, e2eLatency: 1.0, tokensPerCall: 235, cachedPercent: 44 },
  { name: 'Feb 22', llmTTFT: 0.88, ttsTTFB: 0.33, e2eLatency: 1.28, tokensPerCall: 272, cachedPercent: 30 },
  { name: 'Feb 23', llmTTFT: 0.76, ttsTTFB: 0.28, e2eLatency: 1.12, tokensPerCall: 250, cachedPercent: 37 },
  { name: 'Feb 24', llmTTFT: 0.71, ttsTTFB: 0.25, e2eLatency: 1.02, tokensPerCall: 240, cachedPercent: 41 },
  { name: 'Feb 25', llmTTFT: 0.74, ttsTTFB: 0.26, e2eLatency: 1.06, tokensPerCall: 245, cachedPercent: 43 },
];

const insightsMetricConfig = [
  { key: 'llmTTFT', label: 'Avg LLM TTFT', color: '#3b82f6' },
  { key: 'ttsTTFB', label: 'Avg TTS TTFB', color: '#10b981' },
  { key: 'e2eLatency', label: 'Avg E2E Latency', color: '#8b5cf6' },
  { key: 'tokensPerCall', label: 'Avg Tokens/Call', color: '#f59e0b' },
  { key: 'cachedPercent', label: 'Cached Tokens %', color: '#ef4444' },
];

function initPerformanceMetricsChart() {
    const ctx = document.getElementById('performanceMetricsChart');
    if (!ctx) return;
    
    const labels = performanceData.slice(-7).map(d => d.name);
    
    performanceMetricsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: insightsMetricConfig
                .filter(m => activeInsightsMetrics.includes(m.key))
                .map(m => ({
                    label: m.label,
                    data: performanceData.slice(-7).map(d => d[m.key]),
                    borderColor: m.color,
                    backgroundColor: m.color + '20',
                    borderWidth: 2,
                    tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    fill: false,
                }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: { display: true, position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, padding: 15 } },
                tooltip: { backgroundColor: '#fff', titleColor: '#334155', bodyColor: '#64748b', borderColor: '#e2e8f0', borderWidth: 1, padding: 12, cornerRadius: 8 }
            },
            scales: {
                x: { grid: { color: '#e2e8f0', drawBorder: false }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: '#e2e8f0', drawBorder: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}

function toggleInsightsMetric(key) {
    if (activeInsightsMetrics.includes(key)) {
        if (activeInsightsMetrics.length > 1) {
            activeInsightsMetrics = activeInsightsMetrics.filter(k => k !== key);
        }
    } else {
        activeInsightsMetrics.push(key);
    }
    updateInsightsMetricToggles();
    updatePerformanceMetricsChart();
}

function updateInsightsMetricToggles() {
    $('#metricsToggles button').each(function() {
        const metric = $(this).data('metric');
        const config = insightsMetricConfig.find(m => m.key === metric);
        if (activeInsightsMetrics.includes(metric)) {
            $(this).removeClass('border border-slate-200 text-slate-600 hover:bg-slate-50').addClass('text-white').css('background-color', config.color);
        } else {
            $(this).addClass('border border-slate-200 text-slate-600 hover:bg-slate-50').removeClass('text-white').css('background-color', '');
        }
    });
}

function updatePerformanceMetricsChart() {
    if (!performanceMetricsChart) return;
    performanceMetricsChart.data.datasets = insightsMetricConfig
        .filter(m => activeInsightsMetrics.includes(m.key))
        .map(m => ({
            label: m.label,
            data: performanceData.slice(-7).map(d => d[m.key]),
            borderColor: m.color,
            backgroundColor: m.color + '20',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5,
            fill: false,
        }));
    performanceMetricsChart.update();
}

function setTimeFrame(frame) {
    insightsTimeFrame = frame;
    $('#timeFrameSelector button').each(function() {
        if ($(this).data('frame') === frame) {
            $(this).addClass('bg-accent-500 text-white').removeClass('text-slate-600 hover:bg-slate-50');
        } else {
            $(this).removeClass('bg-accent-500 text-white').addClass('text-slate-600 hover:bg-slate-50');
        }
    });
}

function toggleInsightsDropdown() {
    $('#insightsDropdown').toggleClass('hidden');
}

function selectInsightsAssistant(id, name) {
    insightsSelectedAssistant = id;
    $('#insightsAssistantLabel').text(name);
    $('#insightsDropdown').addClass('hidden');
    $('#insightsDropdown button').each(function() {
        if ($(this).attr('onclick')?.includes(`'${id}'`)) {
            $(this).addClass('text-accent-600 bg-accent-50').removeClass('text-slate-700');
        } else {
            $(this).removeClass('text-accent-600 bg-accent-50').addClass('text-slate-700');
        }
    });
}

// ==========================================
// WEB WIDGET PAGE
// ==========================================

let widgetConfig = {
    primaryColor: '#3b82f6',
    position: 'bottom-right',
    title: 'Voice Assistant',
    greeting: "Hello! I'm your AI assistant. Click the call button to start a voice conversation.",
    showTranscript: true
};

let widgetCallState = 'idle'; // idle, connecting, connected, ended
let widgetCallDuration = 0;
let widgetCallTimer = null;
let widgetMuted = false;
let widgetTranscript = [];

function setWidgetColor(color) {
    widgetConfig.primaryColor = color;
    $('#widgetColorPicker').val(color);
    $('#colorPresets button').each(function() {
        if ($(this).data('color') === color) {
            $(this).addClass('border-slate-800 scale-110').removeClass('border-transparent');
        } else if ($(this).data('color')) {
            $(this).removeClass('border-slate-800 scale-110').addClass('border-transparent');
        }
    });
    updateWidgetPreview();
    updateEmbedCode();
}

function setWidgetPosition(position) {
    widgetConfig.position = position;
    const preview = $('#widgetPreview');
    const toggleBtn = $('#widgetToggleBtn');
    if (position === 'bottom-left') {
        preview.removeClass('right-6').addClass('left-6');
        toggleBtn.removeClass('right-6').addClass('left-6');
    } else {
        preview.removeClass('left-6').addClass('right-6');
        toggleBtn.removeClass('left-6').addClass('right-6');
    }
    updateEmbedCode();
}

function updateWidgetConfig() {
    widgetConfig.title = $('#widgetTitle').val();
    widgetConfig.greeting = $('#widgetGreeting').val();
    widgetConfig.showTranscript = $('#widgetShowTranscript').is(':checked');
    updateWidgetPreview();
    updateEmbedCode();
}

function updateWidgetPreview() {
    const color = widgetConfig.primaryColor;
    $('#widgetHeader, #widgetCallBtn, #widgetToggleBtn').css('background-color', color);
    $('#widgetPreviewTitle').text(widgetConfig.title);
    $('#widgetConnecting > div').first().css('background-color', color + '33');
    $('#widgetConnecting .animate-ping').css('background-color', color);
    
    if (widgetConfig.showTranscript && widgetCallState !== 'idle') {
        $('#widgetTranscript').removeClass('hidden');
    } else {
        $('#widgetTranscript').addClass('hidden');
    }
}

function updateEmbedCode() {
    const code = `<script src="https://cdn.aloro.ai/widget.js"><\/script>
<script>
  AloroVoice.init({
    orgId: 'your-org-id',
    assistantId: 'your-assistant-id',
    primaryColor: '${widgetConfig.primaryColor}',
    position: '${widgetConfig.position}',
    greeting: '${widgetConfig.greeting.replace(/'/g, "\\'")}',
    title: '${widgetConfig.title}',
    showTranscript: ${widgetConfig.showTranscript}
  });
<\/script>`;
    $('#widgetEmbedCode').text(code);
}

function copyWidgetEmbedCode() {
    const code = $('#widgetEmbedCode').text();
    navigator.clipboard.writeText(code);
    const btn = $('#copyEmbedBtn');
    btn.find('i').removeClass('fa-copy').addClass('fa-check text-green-500');
    btn.find('span').text('Copied!');
    setTimeout(() => {
        btn.find('i').removeClass('fa-check text-green-500').addClass('fa-copy');
        btn.find('span').text('Copy to Clipboard');
    }, 2000);
}

function closeWidgetPreview() {
    $('#widgetPreview').addClass('hidden');
    $('#widgetToggleBtn').removeClass('hidden');
}

function openWidgetPreview() {
    $('#widgetPreview').removeClass('hidden');
    $('#widgetToggleBtn').addClass('hidden');
}

function startWidgetCall() {
    widgetCallState = 'connecting';
    $('#widgetIdle').addClass('hidden');
    $('#widgetConnecting').removeClass('hidden');
    
    setTimeout(() => {
        widgetCallState = 'connected';
        widgetCallDuration = 0;
        widgetTranscript = [{ speaker: 'agent', text: "Hi! Thanks for calling. How can I help you today?", time: '0:00' }];
        
        $('#widgetConnecting').addClass('hidden');
        $('#widgetConnected').removeClass('hidden');
        
        if (widgetConfig.showTranscript) {
            $('#widgetTranscript').removeClass('hidden');
            renderTranscript();
        }
        
        initAudioVisualizer();
        widgetCallTimer = setInterval(() => {
            widgetCallDuration++;
            $('#callDuration').text(formatCallDuration(widgetCallDuration));
        }, 1000);
    }, 1500);
}

function endWidgetCall() {
    widgetCallState = 'ended';
    clearInterval(widgetCallTimer);
    
    $('#widgetConnected').addClass('hidden');
    $('#widgetIdle').removeClass('hidden');
    $('#widgetTranscript').addClass('hidden');
    
    widgetCallState = 'idle';
    widgetCallDuration = 0;
    widgetTranscript = [];
}

function resetWidgetDemo() {
    clearInterval(widgetCallTimer);
    widgetCallState = 'idle';
    widgetCallDuration = 0;
    widgetMuted = false;
    widgetTranscript = [];
    
    $('#widgetIdle').removeClass('hidden');
    $('#widgetConnecting, #widgetConnected, #widgetTranscript').addClass('hidden');
    $('#widgetMuteBtn').removeClass('bg-red-100 text-red-500').addClass('bg-slate-200 text-slate-600');
    $('#widgetMuteBtn i').removeClass('fa-microphone-slash').addClass('fa-microphone');
    $('#callDuration').text('0:00');
}

function toggleWidgetMute() {
    widgetMuted = !widgetMuted;
    const btn = $('#widgetMuteBtn');
    if (widgetMuted) {
        btn.addClass('bg-red-100 text-red-500').removeClass('bg-slate-200 text-slate-600');
        btn.find('i').removeClass('fa-microphone').addClass('fa-microphone-slash');
        $('#callStatus').text('Muted');
    } else {
        btn.removeClass('bg-red-100 text-red-500').addClass('bg-slate-200 text-slate-600');
        btn.find('i').removeClass('fa-microphone-slash').addClass('fa-microphone');
        $('#callStatus').text('Listening...');
    }
}

function formatCallDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function renderTranscript() {
    let html = '';
    widgetTranscript.forEach(msg => {
        const align = msg.speaker === 'user' ? 'text-right' : 'text-left';
        const bg = msg.speaker === 'user' ? 'bg-slate-200 text-slate-700' : 'bg-white border border-slate-200 text-slate-600';
        html += `<div class="${align}"><span class="inline-block px-2 py-1 rounded ${bg}">${msg.text}</span></div>`;
    });
    $('#transcriptMessages').html(html);
}

function initAudioVisualizer() {
    let html = '';
    for (let i = 0; i < 12; i++) {
        html += `<div class="w-1.5 rounded-full transition-all duration-100" style="background-color: ${widgetConfig.primaryColor}; height: 20px;"></div>`;
    }
    $('#audioVisualizer').html(html);
    
    // Animate bars
    setInterval(() => {
        if (widgetCallState === 'connected' && !widgetMuted) {
            $('#audioVisualizer div').each(function() {
                const height = 20 + Math.random() * 30;
                $(this).css('height', height + 'px');
            });
        }
    }, 100);
}

// Close dropdowns when clicking outside
$(document).on('click', function(e) {
    if (!$(e.target).closest('#snippetCategoryDropdown, button[onclick="toggleSnippetCategoryDropdown()"]').length) {
        $('#snippetCategoryDropdown').addClass('hidden');
    }
    if (!$(e.target).closest('[id^="customer-actions-"], button[onclick^="toggleCustomerActions"]').length) {
        if (customersState.activeActions) {
            customersState.activeActions = null;
            renderCustomersTable();
        }
    }
});
