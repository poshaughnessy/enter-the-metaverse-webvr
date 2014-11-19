(function() {

    var SLIDE_BROWSER_LOGOS = 9,
        SLIDE_TECH_LOGOS_WEBGL = 6,
        SLIDE_TECH_LOGOS_CSS3 = 15,
        highContrastMode = false;

    init();

    function init() {

        setupUserEvents();

        setupSlideEvents();

    }

    function setupUserEvents() {

        document.addEventListener('keydown', onKeyDown, false);

    }

    function setupSlideEvents() {

        Reveal.addEventListener('slidechanged', onSlideChanged);
        Reveal.addEventListener("fragmentshown", onSlideChanged);
        Reveal.addEventListener("fragmenthidden", onSlideChanged);

    }

    /**
     * TODO refactor me!
     */
    function onSlideChanged() {

        // Slide-specific animations...

        var slideNumber = Reveal.getIndices().h;
        var fragmentNumber = Reveal.getIndices().f || 0;

        if( slideNumber == SLIDE_BROWSER_LOGOS ) {

            // wait a moment to ensure it takes effect (in case we loaded this slide first)
            setTimeout(function() {
                document.getElementById('ff-logo').classList.add( 'animate' );
                document.getElementById('chrome-logo').classList.add( 'animate' );
            }, 50);

        } else {

            document.getElementById('ff-logo').classList.remove( 'animate' );
            document.getElementById('chrome-logo').classList.remove( 'animate' );

        }

        if( slideNumber == SLIDE_TECH_LOGOS_WEBGL ) {

            if( fragmentNumber == 0 ) {
                // wait a moment to ensure it takes effect (in case we loaded this slide first)
                setTimeout(function() {
                    document.getElementById('webgl-logo').classList.add( 'grow' );
                    document.getElementById('css3-logo').classList.add( 'fade' );
                }, 50);
            }

        } else {

            document.getElementById('webgl-logo').classList.remove( 'grow' );
            document.getElementById('css3-logo').classList.remove( 'fade' );

        }

        if( slideNumber == SLIDE_TECH_LOGOS_CSS3 ) {

            if( fragmentNumber == 0 ) {
                // wait a moment to ensure it takes effect (in case we loaded this slide first)
                setTimeout(function() {
                    document.getElementById('webgl-logo2').classList.add( 'fade' );
                    document.getElementById('css3-logo2').classList.add( 'grow' );
                }, 50);
            }

        } else {

            document.getElementById('webgl-logo2').classList.remove( 'fade' );
            document.getElementById('css3-logo2').classList.remove( 'grow' );

        }

    }

    function onKeyDown(e) {

        switch( e.keyCode ) {

            case 70: // f
                toggleFullScreen();
                break;

            case 72: // h
                toggleHighContrast();
                break;

        }

    }

    function toggleFullScreen() {

        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

    }

    function toggleHighContrast() {

        var bodyEl = document.getElementsByTagName('body')[0];

        if( !highContrastMode ) {
            bodyEl.classList.add('high-contrast');
        } else {
            bodyEl.classList.remove('high-contrast');
        }

        highContrastMode = !highContrastMode;

    }

})();