# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrowserClosureNotice is a standalone JavaScript library that detects when the user's mouse is moving toward the browser's close button and executes a callback function. It works by tracking mouse trajectory toward the upper-right corner (upper-left on Mac OS X).

## Architecture

This is a simple, single-file JavaScript library with no dependencies or build system:

- **browserclosurenotice.js**: Main source file containing the `BrowserClosureNotice` class
- **browserclosurenotice.min.js**: Minified version for production
- **demo.html**: Usage demonstration

### Core Class: BrowserClosureNotice

The library implements a constructor function pattern that tracks mouse movements and detects specific patterns:

**Configuration Parameters:**
- `callback`: Function executed when close trajectory is detected (default: alert)
- `maxTimes`: Number of times to trigger callback (default: 1; 0 = unlimited)
- `distanceNearClose`: Pixel distance from edge to start detection (default: 100)
- `stepsTakenToClose`: Number of pixels in trajectory toward close button (default: 10)

**Key Methods:**
- `detect()`: Start mouse tracking (adds event listeners)
- `unDetect()`: Stop mouse tracking (removes event listeners)
- `mousemovemethod()`: Core detection logic tracking trajectory patterns
- `isApple()`: Detects Mac OS X for left vs right edge detection
- `getMousePos()`: Cross-browser mouse position with IE8+ support

**Detection Logic (browserclosurenotice.js:40-63):**
The library tracks four directional counters (`goup`, `godown`, `goright`, `goleft`) to determine mouse trajectory. It triggers the callback when:
1. Mouse is within `distanceNearClose` pixels from top edge
2. Mouse has moved upward for at least `stepsTakenToClose` pixels
3. Mouse has moved toward the close button side (right on Windows/Linux, left on Mac) for at least `stepsTakenToClose` pixels

## Browser Support

IE8+, Firefox, Chrome (using both addEventListener and attachEvent for legacy IE support)

## Development Notes

- No build system, package.json, or npm scripts
- Edit browserclosurenotice.js directly
- Manually minify to browserclosurenotice.min.js if making changes
- Test using demo.html in a browser
