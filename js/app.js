// Aloro Dashboard - Main Application JavaScript

let currentStep = 1;
const totalSteps = 6;

$(document).ready(function() {
    // Sidebar toggle
    $('#toggleSidebar').click(function() {
        $('body').toggleClass('sidebar-collapsed');
    });

    // Navigation
    $('.sidebar-item[data-page]').click(function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        $('.sidebar-item').removeClass('active');
        $(this).addClass('active');
        $('.page').addClass('hidden');
        $('#page-' + page).removeClass('hidden');
    });

    // Temperature slider
    $('#temperature').on('input', function() {
        $('#tempValue').text((this.value / 100).toFixed(1));
    });
});

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
