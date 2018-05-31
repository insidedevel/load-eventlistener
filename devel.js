(function (w) {
    "use strict";
 
	/** @class expression 
      * @name dev_mediascreen
	  * @desc media information on window sizes
	  */
const dev_mediascreen = class dev_screen {
	/** @function  expression 
      * @name dev_mediasize()
	  * @desc returns media size
      * @return window size json obj
	  */
	dev_mediasize() {

	var dev_objmediasize = { "maxx":"","maxy":"", "x":"","y":"" }
	dev_objmediasize.maxx = window.screen.width;
	dev_objmediasize.maxy = window.screen.height;
	dev_objmediasize.x = window.outerWidth;
	dev_objmediasize.y = window.outerHeight;
	return(dev_objmediasize);
	}
}

	/** @class expression
      * @name dev_socketconnect
	  * @desc socket functions using socket.io class
	  */
const dev_socketconnect = class dev_socket {
	/** @function 
      * @name dev_connect()
	  * @desc connects to websocket.
      * @return socket object
      */
  dev_connect() {
		var socket;
	    var connectstring = '192.168.2.14:3000';
		socket = io.connect(connectstring);
		socket.on('disconnect', () => {
			socket.open();
		});		
	
		return socket;
	}
	/** @function 
      * @name dev_sendsocket()
	  * @desc sends json string to socket event.
      */
	dev_sendsocket(objsocket,socketevt,json_msg) {
		var dev_objsocket = objsocket;
		var dev_jsonmsg = json_msg;
		var dev_socketevt = socketevt;
		// sends data

	dev_objsocket.emit(dev_socketevt, dev_jsonmsg);
	
	}

};
    /**
     * @function loadDeferredStyles
     * @desc inline CSS Delivery 
     * @listens
     * @type load
     * 
     * @depend socket io
     * @added dev_mediascreen dev_socketconnect classes to loadDeferredStyles function
     * {@link https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent}
     */
    /* defferredstyles */
	
    var loadDeferredStyles = function () {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
// dev_mediascreen dev_socketconnect classes
		let dev_mediainst = new dev_mediascreen();
		var dev_objmediascreen = dev_mediainst.dev_mediasize();
var dev_jsonmsg = '{ "maxx":"' + dev_objmediascreen.maxx + '" , "maxy":"' + dev_objmediascreen.maxy + '" , "x":"' + dev_objmediascreen.x + '" , "y":"' + dev_objmediascreen.y + '", "type":"png" ,"action" : [' +
'{ "content":"logo" },' +
'{ "content":"logo2" },' +
'{ "content":"logo3" } ]}';
	
		let dev_connectinst = new dev_socketconnect();
		var dev_objsocket = dev_connectinst.dev_connect();
		var dev_objsocketr = dev_connectinst.dev_sendsocket(dev_objsocket, 'header images', dev_jsonmsg);
	// END dev_mediascreen dev_socketconnect 	
    };

    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    if (raf) raf(function () {
        window.setTimeout(loadDeferredStyles, 0);

    });
    else window.addEventListener("load", loadDeferredStyles);

    /**
     * @function
     * @name loadCSS
     * @desc A function for loading CSS asynchronously [c]2017  
     * @copyright [c]2017 Filament Group, Inc. MIT License
     * {@link https://github.com/filamentgroup/loadCSS/blob/master/README.md}
     */
    /* exported loadCSS */
    var loadCSS = function (href, before, media) {
        // Arguments explained:
        // `href` [REQUIRED] is the URL for your CSS file.
        // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
        // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
        // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
        var doc = w.document;
        var ss = doc.createElement("link");
        var ref;
        if (before) {
            ref = before;
        } else {
            var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
            ref = refs[refs.length - 1];
        }

        var sheets = doc.styleSheets;
        ss.rel = "stylesheet";
        ss.href = href;
        // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
        ss.media = "only x";

        // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
        function ready(cb) {
            if (doc.body) {
                return cb();
            }
            setTimeout(function () {
                ready(cb);
            });
        }
        // Inject link
        // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
        // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
        ready(function () {
            ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
        });
        // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
        var onloadcssdefined = function (cb) {
            var resolvedHref = ss.href;
            var i = sheets.length;
            while (i--) {
                if (sheets[i].href === resolvedHref) {
                    return cb();
                }
            }
            setTimeout(function () {
                onloadcssdefined(cb);
            });
        };

        function loadCB() {
            if (ss.addEventListener) {
                ss.removeEventListener("load", loadCB);
            }
            ss.media = media || "all";
        }

        // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
        if (ss.addEventListener) {
            ss.addEventListener("load", loadCB);
        }
        ss.onloadcssdefined = onloadcssdefined;
        onloadcssdefined(loadCB);
        return ss;
    };
    // commonjs
    if (typeof exports !== "undefined") {
        exports.loadCSS = loadCSS;
    } else {
        w.loadCSS = loadCSS;
    }
	
// end Load CSS

	// once loaded check if win Font face woff2
var supportsWoff2 = (function (win) {
    if (!("FontFace" in win)) {
        return false;
    } else {
        var f;
    }
    try {
        f = new win.FontFace("t", 'url( "data:application/font-woff2;charset=utf-8;base64,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" ) format( "woff2" )', {});
    } catch (err) {
        return false;
    }
    if ($(f).length) {
        f.load().catch(function () {});
        return f.status == 'loading';
    }
})(window);

// change the font use loadcss 
        var ua = window.navigator.userAgent;

        // Use WOFF2 if supported
        if (supportsWoff2) {
            loadCSS("/font/data-woff2.css");
        } else if (ua.indexOf("Android 4.") > -1 && ua.indexOf("like Gecko") > -1 && ua.indexOf("Chrome") === -1) {
            // Android's Default Browser needs TTF instead of WOFF
            loadCSS("/font/data-ttf.css");
        } else {
            // Default to WOFF
            loadCSS("/font/data-woff.css");
        }

// css & jquery on mouse over animations
$(document).ready(function () {
var element1 = $("#devlogo");
var eleCircle1 = $("#circle1");
var eleCircle2 = $("#circle2");
var eleCircle3 = $("#circle3");
var objLogo = document.getElementById("devlogo");
var objCircle1 = document.getElementById("circle1");
var objCircle2 = document.getElementById("circle2");
var objCircle3 = document.getElementById("circle3");

function animateLogo() {
  // the animation starts
  element1.toggleClass("swing animated");

  // do something when animation ends
  element1.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(e){
   // trick to execute the animation again
    $(e.target).removeClass("swing animated");
  
  });
  
}

function animateCircle1() {
  eleCircle1.toggleClass("animated");
objCircle1.style.boxShadow = "inset 0 0 50px #fff";
objCircle1.style.boxShadow = "inset 20px 0 80px #f0f";
objCircle1.style.boxShadow = "inset -20px 0 80px #0ff";
objCircle1.style.boxShadow = "inset 20px 0 300px #f0f";
   objCircle1.style.boxShadow = "inset -20px 0 300px #0ff";
  objCircle1.style.boxShadow = "0 0 50px #fff";
  objCircle1.style.boxShadow = "-10px 0 80px #f0f";
    objCircle1.style.boxShadow = "10px 0 80px #0ff";
  // the animation starts
    eleCircle1.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(e){
   
   // trick to execute the animation again
    $(e.target).removeClass("animated");
  
  });

}

function animateCircle2() {
	
  // the animation starts
  eleCircle2.toggleClass("animated");
objCircle2.style.boxShadow = "inset 0 0 50px #fff";
objCircle2.style.boxShadow = "inset 20px 0 80px #f0f";
objCircle2.style.boxShadow = "inset -20px 0 80px #0ff";
objCircle2.style.boxShadow = "inset 20px 0 300px #f0f";
   objCircle2.style.boxShadow = "inset -20px 0 300px #0ff";
  objCircle2.style.boxShadow = "0 0 50px #fff";
  objCircle2.style.boxShadow = "-10px 0 80px #f0f";
    objCircle2.style.boxShadow = "10px 0 80px #0ff";
  // the animation starts
    eleCircle2.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(e){
   
   // trick to execute the animation again
    $(e.target).removeClass("animated");
  
  });
}

function animateCircle3() {
	  // the animation starts
  eleCircle3.toggleClass("animated");
  objCircle3.style.boxShadow = "inset 0 0 50px #fff";
objCircle3.style.boxShadow = "inset 20px 0 80px #f0f";
objCircle3.style.boxShadow = "inset -20px 0 80px #0ff";
objCircle3.style.boxShadow = "inset 20px 0 300px #f0f";
   objCircle3.style.boxShadow = "inset -20px 0 300px #0ff";
  objCircle3.style.boxShadow = "0 0 50px #fff";
  objCircle3.style.boxShadow = "-10px 0 80px #f0f";
    objCircle3.style.boxShadow = "10px 0 80px #0ff";
  	
  // do something when animation ends
  eleCircle3.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(e){
   
   // trick to execute the animation again
    $(e.target).removeClass("animated");

	
  
  });
}
function animateCircle1Out() {
objCircle1.style.boxShadow = "none";
}
function animateCircle2Out() {
objCircle2.style.boxShadow = "none";
}
function animateCircle3Out() {
objCircle3.style.boxShadow = "none";
}

objLogo.onmousedown = function(){animateLogo()};
objCircle1.onmouseover = function(){animateCircle1()};

objCircle2.onmouseover = function(){animateCircle2()};
objCircle3.onmouseover = function(){animateCircle3()};
objCircle1.onmouseout = function() {animateCircle1Out()};
objCircle2.onmouseout = function() {animateCircle2Out()};
objCircle3.onmouseout = function() {animateCircle3Out()};
});
}(typeof global !== "undefined" ? global : this));


