/* by @manufosela - browserclosurenotice.js - Prevention Close Browser - v2.0 */
/* ES6 version - Modern browsers only */
/* MIT License (MIT) Copyright (c) 2015 @manufosela */
/* It is independent of any library or framework */

class BrowserClosureNotice {
    constructor(objArgs = {}) {
        /* OPTIONAL ARGUMENTS */
        this.stepsTakenToClose = objArgs.stepsTakenToClose || 10;
        this.distanceNearClose = objArgs.distanceNearClose || 100;
        this.maxTimes = (typeof objArgs.maxTimes !== "undefined" && !!~objArgs.maxTimes) ? objArgs.maxTimes : 1;
        this.dialogMessage = objArgs.dialogMessage || null;
        this.callbackBrowserClosureNotice = objArgs.callback || this._defaultCallback.bind(this);

        /* PARAMETERS, NOT CHANGE */
        this.oldx = 0;
        this.oldy = 0;
        this.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.distanceWidth = this.isApple() ? this.distanceNearClose : (this.w - this.distanceNearClose);
        this.goup = 0;
        this.godown = 0;
        this.goright = 0;
        this.goleft = 0;
        this.moreTimes = true;
        this.times = 0;

        // Bind mousemovemethod to preserve context
        this.mousemovemethod = this.mousemovemethod.bind(this);
    }

    detect() {
        document.addEventListener('mousemove', this.mousemovemethod);
    }

    unDetect() {
        document.removeEventListener('mousemove', this.mousemovemethod, false);
    }

    mousemovemethod(e) {
        const p = this.getMousePos(e);
        const isApple = this.isApple();
        const pxCond = isApple ? (p.x < this.distanceWidth) : (p.x > this.distanceWidth);

        if (p.x < this.oldx) {
            this.goright = 0;
            this.goleft++;
        } else if (p.x > this.oldx) {
            this.goright++;
            this.goleft = 0;
        }

        if (p.y < this.oldy) {
            this.goup++;
            this.godown = 0;
        } else if (p.y > this.oldy) {
            this.goup = 0;
            this.godown++;
        }

        const side = isApple ? this.goleft : this.goright;

        if (
            (p.y < this.distanceNearClose && this.goup >= this.stepsTakenToClose) &&
            (pxCond && side >= this.stepsTakenToClose) &&
            this.moreTimes
        ) {
            this.times++;
            this.moreTimes = (this.times < this.maxTimes || this.maxTimes === 0);
            if (!this.moreTimes) {
                this.unDetect();
            }
            this.callbackBrowserClosureNotice(e);
        }

        this.oldx = p.x;
        this.oldy = p.y;
    }

    isApple() {
        const myNav = navigator.userAgent.toLowerCase();
        return (!!~myNav.indexOf('mac os x'));
    }

    getMousePos(e) {
        let tempX = e.clientX;
        let tempY = e.clientY;

        if (tempX < 0) tempX = 0;
        if (tempY < 0) tempY = 0;

        return { x: tempX, y: tempY };
    }

    _defaultCallback() {
        // Create dialog if it doesn't exist
        let dialog = document.getElementById('bcn-dialog');
        if (!dialog) {
            dialog = document.createElement('dialog');
            dialog.id = 'bcn-dialog';

            // Prevent closing when clicking outside
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    e.preventDefault();
                }
            });

            document.body.appendChild(dialog);
        }

        // Set or update dialog content
        const message = this.dialogMessage || "Are you sure you want to close this page?";
        dialog.innerHTML = `
            <style>
                #bcn-dialog {
                    border: none;
                    border-radius: 12px;
                    padding: 0;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    max-width: 400px;
                }
                #bcn-dialog::backdrop {
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    cursor: not-allowed;
                }
                #bcn-dialog-content {
                    padding: 24px;
                }
                #bcn-dialog h3 {
                    margin: 0 0 12px 0;
                    font-size: 20px;
                    color: #333;
                }
                #bcn-dialog p {
                    margin: 0 0 20px 0;
                    color: #666;
                    line-height: 1.5;
                }
                #bcn-dialog button {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 600;
                }
                #bcn-dialog button:hover {
                    background: #5568d3;
                }
            </style>
            <div id="bcn-dialog-content">
                <h3>👋 Leaving so soon?</h3>
                <p>${message}</p>
                <button onclick="this.closest('dialog').close()">Got it</button>
            </div>
        `;

        dialog.showModal();
    }
}

export default BrowserClosureNotice;

/*
The MIT License (MIT)
Copyright (c) 2015 @manufosela
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
