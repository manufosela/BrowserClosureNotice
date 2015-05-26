/* by @manufosela - browserclosurenotice.js - Prevention Close Browser - 20150525 - v1.1 */
/* works IE8+, FF, Chrome */
/* MIT License (MIT) Copyright (c) 2015 @manufosela */
/* It is independent of any library or framework */
BrowserClosureNotice = function(){
    "use strict";

    var BrowserClosureNotice = function( objArgs ) {
        /* OPTIONAL ARGUMENTS */
        this.stepsTakenToClose        = objArgs.stepsTakenToClose || 10;
        this.distanceNearClose        = objArgs.distanceNearClose || 100;
        this.maxTimes                 = objArgs.maxTimes || 1;
        this.callbackBrowserClosureNotice = objArgs.callback || function() { alert( "really you want to go?" ); };

        /* PARAMETERS, NOT CHANGE */
        this.oldx = 0;
        this.oldy = 0;
        this.w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.distanceWidth = ( this.isApple() ) ? this.distanceNearClose : ( this.w - this.distanceNearClose );
        this.goup = 0;
        this.godown = 0;
        this.goright = 0;
        this.goleft = 0;
        this.moreTimes = true;
        this.times = 0;
        //console.log( "W: " + this.w+" - W-distanceNearClose: " + ( this.w - this.distanceNearClose ) + " -TIMES: " + this.times );
        //document.getElementById( "data" ).innerHTML = "W: " + this.w+" - W-distanceNearClose: " + ( this.w - this.distanceNearClose ) + " -TIMES: " + this.times;
    };
    BrowserClosureNotice.prototype.detect = function() {
        var _this = this;
        if ( document.addEventListener ) { document.addEventListener( 'mousemove', function( e ) { _this.mousemovemethod( e ); } ); }
        if ( document.attachEvent ) { document.attachEvent( 'onmousemove', function( e ) { _this.mousemovemethod( e ); } ); }
        // console.log ( "detecting..." );
    };
    BrowserClosureNotice.prototype.unDetect = function() {
        var _this = this;
        if ( document.removeEventListener ) { document.removeEventListener ( 'mousemove', _this.mousemovemethod, false ); }
        if ( document.detachEvent ) { document.detachEvent ('onmousemove', _this.mousemovemethod ); }
    };
    BrowserClosureNotice.prototype.mousemovemethod = function ( e ){
        var p = this.getMousePos( e ), side, 
            isApple = this.isApple(),
            pxCond = ( isApple )?( p.x < this.distanceWidth ):( p.x > this.distanceWidth );
        if ( p.x < this.oldx )       { this.goright=0;  this.goleft++; } 
        else if ( p.x > this.oldx )  { this.goright++;  this.goleft=0; }
        if ( p.y < this.oldy )       { this.goup++;     this.godown=0; } 
        else if ( p.y > this.oldy )  { this.goup=0;     this.godown++; }
        side = ( isApple ) ? this.goleft : this.goright;
        if ( 
            ( p.y < this.distanceNearClose && this.goup >= this.stepsTakenToClose ) &&
            ( pxCond && side >= this.stepsTakenToClose ) &&
            this.moreTimes
        ) {
            // console.log( "ALERT: CLOSE BROWSER. Times " + this.times );
            this.times++;
            this.moreTimes=( this.times < this.maxTimes || this.maxTimes === 0 );
            this.unDetect();
            this.callbackBrowserClosureNotice();
        }
        this.oldx = p.x;
        this.oldy = p.y;
        //console.log( this.oldx + ", " + this.oldy + " - " + this.goup + ">="+this.stepsTakenToClose+", " + side + " >= "+this.stepsTakenToClose+" --- " + this.moreTimes );        
    };
    BrowserClosureNotice.prototype.isIE = function() {
      var myNav = navigator.userAgent.toLowerCase();
      return ( !!~myNav.indexOf( 'msie' ) ) ? parseInt( myNav.split( 'msie' )[1]) : false;
    };
    BrowserClosureNotice.prototype.isApple = function() {
      var myNav = navigator.userAgent.toLowerCase();
      return ( !!~myNav.indexOf( 'mac os x' ) );
    };
    BrowserClosureNotice.prototype.getMousePos = function( e ) {
        var tempX, tempY;
        if ( this.isIE() ) {
            tempX = event.clientX + document.body.scrollLeft;
            tempY = event.clientY + document.body.scrollTop;
        } else {
            tempX = e.clientX;
            tempY = e.clientY;
        } 
        if ( tempX < 0 ){ tempX = 0; }
        if ( tempY < 0 ){ tempY = 0; }   
        return { x:tempX, y:tempY };
    };

    return BrowserClosureNotice;
}();
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