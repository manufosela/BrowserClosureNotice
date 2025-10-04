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
const maxTimesInput = document.getElementById('maxTimes');
const stepsTakenToCloseInput = document.getElementById('stepsTakenToClose');
const distanceNearCloseInput = document.getElementById('distanceNearClose');

// Detect platform
const isMac = navigator.userAgent.toLowerCase().includes('mac os x');
platformEl.textContent = isMac ? 'Mac OS X (close button on top-left)' : 'Windows/Linux (close button on top-right)';

// Callback function
function onClosureDetected(e) {
    triggerCount++;
    counterEl.textContent = triggerCount;

    const message = `Browser closure detected! (${triggerCount} times)\n\nMouse position: ${e.clientX}, ${e.clientY}`;
    alert(message);
}

// Start detection
function startDetection() {
    const config = {
        callback: onClosureDetected,
        maxTimes: parseInt(maxTimesInput.value),
        stepsTakenToClose: parseInt(stepsTakenToCloseInput.value),
        distanceNearClose: parseInt(distanceNearCloseInput.value)
    };

    bcn = new BrowserClosureNotice(config);
    bcn.detect();

    statusEl.textContent = 'Detecting...';
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
