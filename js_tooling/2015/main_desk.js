(function () {
    'use strict';

    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


(function() {
    'use strict';
    // --------------------------------------------
    //      PATHS
    // --------------------------------------------
    var _base = '/static/common/js/';

    //      Config
    // --------------------------------------------
    require.config({
        paths: {
            'app': 'app',

            //      Pages
            // --------------------------------------------
            'home': 'pages/home',
            'account-progress': 'pages/status360',
            'registration': 'pages/registration',
            'course-modules': 'pages/courseAV_modules',
            'course-lecture': 'pages/courseAV_lecture',
            'login': 'pages/login',
            'contact': 'pages/contact',

            //      Courses
            // --------------------------------------------
            'course-home'   : 'courses/pages/home',
            'course-list' : 'courses/pages/list',
            'course-details': 'courses/course-details',
            'course-account-cancel'  : 'courses/course-cancel',
            'my-courses'  : 'courses/pages/account-my-courses',

            //   Macros
            // --------------------------------------------
            'course-item': 'courses/macros/course-item',

            //   Modules
            // --------------------------------------------
            'common': 'modules/common',
            'loading': 'courses/modules/loading',
            'course-animations': 'courses/modules/animations',
            'course-topBar': 'courses/modules/top-bar',
            'course-carousel': 'courses/modules/course-carousel',
            'pagination': 'courses/modules/course-module-pagination',
            'lectures-list': 'courses/modules/lectures-list',

            //      Libs
            // --------------------------------------------
            'jquery': _base + 'lib/jquery/jquery-1.11.1.min',
            'easing': _base + 'lib/jquery/jquery.easing.1.3',
            'easydropdown': _base + 'lib/jquery/jquery.easydropdown.2.1.4',
            'cycle2': _base + 'lib/jquery/jquery.cycle2.min',
            'cycle2.carousel': _base + 'lib/jquery/jquery.cycle2.carousel',
            'jquery.placeholder': _base + 'polyfills/jquery.placeholder.min',
            'pie': _base + 'polyfills/PIE',
            'excanvas': _base + 'lib/jQuery-Knob/excanvas.compiled',
            'jqknob': _base + 'lib/jQuery-Knob/jquery.knob.min',
            'raphael' : _base + 'lib/raphael.min',
            'mediaelement': _base + 'lib/mediaelement/mediaelement-and-player.min',
            'fancybox': _base + 'lib/fancybox/jquery.fancybox.pack',
            'nicescroll': 'libs/jquery.nicescroll-master/jquery.nicescroll',
            'throttle-debounce': 'libs/jquery-throttle-debounce-master/jquery.ba-throttle-debounce',
            'waitforimages': _base + 'lib/waitForImages/jquery.waitforimages.min',
            'autoellipsis': _base + 'lib/jquery.autoellipsis-1.0.10.min',
            'mask': _base + 'lib/mask/jquery.mask.min'
        },
        shim: {
            //      Libs
            // --------------------------------------------
            'app': ['jquery'],
            'jquery' : {
                exports : '$'
            },
            'easing': ['jquery'],
            'raphael' : {
                deps : ['jquery'],
                exports : 'Raphael'
            },
            'excanvas': ['jquery'],
            'easydropdown': ['jquery'],
            'cycle2': ['jquery', 'easing'],
            'cycle2.carousel': ['cycle2'],
            'jquery.placeholder': ['jquery'],
            'fancybox': ['jquery'],
            'jqknob': ['jquery'],
            'mediaelement': ['jquery'],
            'nicescroll': ['jquery'],
            'pie': ['jquery'],
            'polyfills' : ['jquery'],
            'autoellipsis' : ['jquery'],
            'waitforimages' : ['jquery']
        }
    });

    //      Start
    // --------------------------------------------
    require(['app']);

}());
