# BrowserClosureNotice Example

This is a development example to test the BrowserClosureNotice library with a live server.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (usually `http://localhost:5173`)

## Usage

The example includes:
- Interactive UI to start/stop detection
- Configurable parameters (maxTimes, stepsTakenToClose, distanceNearClose)
- Real-time counter of detection triggers
- Platform detection (Mac vs Windows/Linux)

## How to test

1. The detection starts automatically after 2 seconds
2. Move your mouse toward the browser's close button:
   - **Windows/Linux**: Top-right corner
   - **Mac OS X**: Top-left corner
3. When the trajectory is detected, you'll see an alert
4. Adjust the configuration parameters and click "Start Detection" to test different settings

## Configuration Parameters

- **maxTimes**: Number of times to trigger callback (0 = unlimited)
- **stepsTakenToClose**: Number of pixels of trajectory toward close button (default: 20)
- **distanceNearClose**: Distance in pixels from edge to start detection (default: 250)
