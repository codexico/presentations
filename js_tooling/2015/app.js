define([
    'common',
    'course-animations',
    'course-topBar'
], function (
    CommonScript,
    Animation,
    TopBar
) {
    'use strict';

    var bodyPageScriptMap = [
        'home',
        'account-progress',
        'course-details',
        'course-account-cancel',
        'course-home',
        'course-list',
        'course-modules',
        'course-lecture',
        'registration',
        'course-modules-pagination',
        'my-status',
        'my-courses',
        'login',
        'contact'
    ];

    // --------------------------------------------
    //      Init
    // --------------------------------------------
    function initPageScript(pageScript) {
        pageScript.init();
    }

    function requirePageScript(page) {
        require([page], initPageScript);
    }

    function initApp() {
        for (var i = 0; i < bodyPageScriptMap.length; i++) {
            if ($( 'body.page-' + bodyPageScriptMap[i])[0]) {
                requirePageScript(bodyPageScriptMap[i]);
            }
        }
    }

    function initTopBar() {
        TopBar.fix({
            el: '.ui-top-bar_fixed',
            direction: 'up'
        });
    }

    function initAnimations() {
        Animation.init();
    }
    function init() {
        initApp();
        initTopBar();
        initAnimations();
    }

    $(function () {
        init();
    });

});
