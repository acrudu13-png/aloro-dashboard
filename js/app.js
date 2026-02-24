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
