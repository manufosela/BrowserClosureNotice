import BrowserClosureNotice from '../browserclosurenotice.js';

let bcn = null;
let triggerCount = 0;

// DOM elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const statusEl = document.getElementById('status');
const counterEl = document.getElementById('counter');
const platformEl = document.getElementById('platform');

// Config inputs
const modeSelect = document.getElementById('modeSelect');
const customMessageInput = document.getElementById('customMessage');
const maxTimesInput = document.getElementById('maxTimes');
const stepsTakenToCloseInput = document.getElementById('stepsTakenToClose');
const distanceNearCloseInput = document.getElementById('distanceNearClose');

// Detect platform
const isMac = navigator.userAgent.toLowerCase().includes('mac os x');
platformEl.textContent = isMac ? 'Mac OS X (close button on top-left)' : 'Windows/Linux (close button on top-right)';

// Prevent closing dialog when clicking outside
const customDialog = document.getElementById('customDialog');
customDialog.addEventListener('click', (e) => {
    if (e.target === customDialog) {
        e.preventDefault();
    }
});

// Callback function
function onClosureDetected(e) {
    triggerCount++;
    counterEl.textContent = triggerCount;

    // Update and show dialog
    const dialog = document.getElementById('customDialog');
    const dialogCount = document.getElementById('dialogCount');
    dialogCount.textContent = triggerCount;
    dialog.showModal();

    console.log(`Browser closure detected! (${triggerCount} times) - Mouse: ${e.clientX}, ${e.clientY}`);
}

// Discount callback
function applyDiscountCallback() {
    triggerCount++;
    counterEl.textContent = triggerCount;

    // Show discount message
    const discountDialog = document.getElementById('customDialog');
    const dialogCount = document.getElementById('dialogCount');
    dialogCount.textContent = '10%';

    const discountHTML = `
        <div class="dialog-content">
            <h3>🎉 Special Offer!</h3>
            <p>Don't leave! We're applying a discount for you!</p>
            <div class="count" id="dialogCount">10%</div>
            <p style="font-size: 14px; margin-bottom: 24px;">discount applied!</p>
            <button onclick="this.closest('dialog').close()">Claim Discount!</button>
        </div>
    `;
    discountDialog.innerHTML = discountHTML;
    discountDialog.showModal();

    console.log(`Discount applied! (triggered ${triggerCount} times)`);
}

// Start detection
function startDetection() {
    const mode = modeSelect.value;
    const config = {
        maxTimes: parseInt(maxTimesInput.value),
        stepsTakenToClose: parseInt(stepsTakenToCloseInput.value),
        distanceNearClose: parseInt(distanceNearCloseInput.value)
    };

    // Set callback based on mode
    if (mode === 'custom') {
        config.callback = onClosureDetected;
    } else if (mode === 'message') {
        config.dialogMessage = customMessageInput.value;
    } else if (mode === 'discount') {
        config.callback = applyDiscountCallback;
    }

    bcn = new BrowserClosureNotice(config);
    bcn.detect();

    statusEl.textContent = `Detecting (${mode} mode)...`;
    statusEl.style.color = '#4ade80';
    startBtn.disabled = true;
    stopBtn.disabled = false;

    console.log('Detection started with config:', config);
}

// Stop detection
function stopDetection() {
    if (bcn) {
        bcn.unDetect();
        bcn = null;
    }

    statusEl.textContent = 'Stopped';
    statusEl.style.color = '#fb923c';
    startBtn.disabled = false;
    stopBtn.disabled = true;

    console.log('Detection stopped');
}

// Reset counter
function resetCounter() {
    triggerCount = 0;
    counterEl.textContent = triggerCount;
    console.log('Counter reset');
}

// Event listeners
startBtn.addEventListener('click', startDetection);
stopBtn.addEventListener('click', stopDetection);
resetBtn.addEventListener('click', resetCounter);

// Auto-start on load
console.log('BrowserClosureNotice example loaded');
console.log('Click "Start Detection" to begin, or it will auto-start in 2 seconds...');

setTimeout(() => {
    startDetection();
}, 2000);
