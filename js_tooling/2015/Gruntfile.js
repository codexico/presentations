/*global module:true*/
module.exports = function (grunt) {
    'use strict';
    // show time report on end
    require('time-grunt')(grunt);
    // load tasks just in time
    require('jit-grunt')(grunt);


    // -------------------------------------------
    // project list of products
    // -------------------------------------------
    var products = ['common', 'cursos', 'singles'];
    var brands = ['default', 'start', 'oi', 'net'];
    var envs = ['web', 'mobile', 'all'];


    // -------------------------------------------
    // init config
    // -------------------------------------------
    var config = {};

    config.path = {
        'static': 'tlc/static',
        'js_libs': 'tlc/static/common/js',
        'fonts': 'tlc/static/common/fonts',
        'js': 'tlc/static/js',
        'babel': 'tlc/static_src/js/mobile',
        'html': 'tlc/templates',
        'css': 'tlc/static/css',
        'sass': 'tlc/static_src/sass',
        'img': 'tlc/static/img',
        'img_src': 'tlc/static_src/img'
    };


    // -------------------------------------------
    // clean => reset build
    // -------------------------------------------
    config.clean = {
        all: [
            '<%= path.css %>/*',
            '<%= path.img %>/*',
            '<%= path.js %>/mobile/main.js'
        ]
    };


    // -------------------------------------------
    // js compilation and verification
    // -------------------------------------------
    config.jshint = {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: {
            src: [
                'Gruntfile.js',
                '<%= path.js %>/web/**/*.js',
                '!<%= path.js %>/web/libs/**/*'
            ]
        }
    };

    config.eslint = {
        target: ['<%= path.babel %>/**/*']
    };

    config.browserify = {
        dev: {
            options: {
                transform: ['babelify'],
                browserifyOptions : {
                    debug: true
                }
            },
            files: {
                '<%= path.js %>/mobile/main_debug.js': '<%= path.babel %>/main.js'
            }
        },
        prod: {
            options: {
                transform: ['babelify']
            },
            files: {
                '<%= path.js %>/mobile/main.js': '<%= path.babel %>/main.js'
            }
        }
    };


    // -------------------------------------------
    // move images from src and minify
    // -------------------------------------------
    config.imagemin = {
        options: {
            optimizationLevel: 1
        }
    };

    products.forEach(function (product) {
        config.imagemin[product] = {
            files: [
                {
                    expand: true,
                    cwd: '<%= path.img_src %>/' + product + '/',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: '<%= path.img %>/' + product + '/'
                }
            ]
        };
    });


    // -------------------------------------------
    // compass => generate sprites and compile sass
    // -------------------------------------------
    config.compass = {
        options: {
            importPath : [
                '<%= path.sass %>'
            ],
            httpPath: '/',
            relativeAssets: true,
            environment: 'development',
            sourcemap: true
        }
    };

    function addCompassTask(name, spriteLoadPath, sassDir, cssDir, imagesDir, fontsDir) {
        config.compass[name] = {
            options: {
                spriteLoadPath: spriteLoadPath,
                sassDir: sassDir,
                cssDir: cssDir,
                imagesDir: imagesDir,
                fontsDir: fontsDir
            }
        };
    }

    (function addCompassTasks() {
        var name;
        var spriteLoadPath = [];
        var sassDir;
        var cssDir;
        var imagesDir;
        var fontsDir;

        products.forEach(function (product) {
            brands.forEach(function (brand) {
                envs.forEach(function (env) {
                    name = product + '_' + brand + '_' + env;
                    spriteLoadPath = [];
                    spriteLoadPath.push('<%= path.img_src %>/' + product + '/' + brand + '/' + env + '/');

                    if (product !== 'common' && brand !== 'default') {
                        spriteLoadPath.push('<%= path.img_src %>/common/default/' + env + '/');
                        spriteLoadPath.push('<%= path.img_src %>/common/' + brand + '/' + env + '/');
                    }

                    sassDir = '<%= path.sass %>/' + product + '/' + brand + '/' + env + '/';
                    cssDir = '<%= path.css %>/' + product + '/' + brand + '/' + env + '/';
                    imagesDir = '<%= path.img %>/' + product + '/' + brand + '/' + env + '/';
                    fontsDir = '<%= path.fonts %>/' + brand + '/';

                    if ( (product !== 'common' && brand !== 'default') || (product === 'common' && brand === 'default')) {
                        addCompassTask(name, spriteLoadPath, sassDir, cssDir, imagesDir, fontsDir);
                    }
                }); // envs
            }); // brands
        }); // products
    }());


    // -------------------------------------------
    // css minification
    // -------------------------------------------
    config.cssmin = {
        options: {
            relativeTo: '<%= path.static %>'
        },
        target: {
            files: [
                {
                    expand: true,
                    cwd: '<%= path.css %>',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '<%= path.css %>',
                    ext: '.min.css'
                }
            ]
        }
    };


    // -------------------------------------------
    // watch project for changes and take the necessary actions
    // -------------------------------------------
    // https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html
    // dont use livereload on sass tasks, wait for the css change
    config.watch = {
        html: {
            options: { livereload: true },
            files: [
                '<%= path.html %>/**/*.*'
            ]
        },
        css: {
            options: { livereload: true },
            files: [
                '<%= path.css %>/**/*.*'
            ]
        },
        scripts: {
            options: { livereload: true },
            files: [
                '<%= path.js %>/web/**/*'
            ],
            tasks: ['lint']
        },
        js_mobile: {
            options: { livereload: true },
            files: [
                '<%= path.js %>/mobile/main.js'
            ]
        },
        babel: {
            files: [
                '<%= path.babel %>/**/*.*'
            ],
            tasks: ['lintbabel', 'browserify']
        },
        js_libs: {
            files: [
                '<%= path.js_libs %>/**/*.*'
            ],
            tasks: ['browserify']
        },
        images: {
            options: { livereload: true },
            files: [
                '<%= path.img_src %>/**/*.*'
            ],
            tasks: ['imgs']
        }
    };

    function addWatchTask(name, files, tasks) {
        config.watch[name] = {
            files: files,
            tasks: tasks
        };
    }

    (function addWatchTasks() {
        var sassTaskName = '';
        var compassTasks = [];
        var sassFiles = [];

        // per product/brand/env
        // on change product, run compass task only for the product/brand/env
        // Ex: on change cursos/start/web -> run compass:cursos_start_web
        products.forEach(function (product) {
            brands.forEach(function (brand) {
                if (product !== 'common' && brand !== 'default') { // otherwise run per env or per brand
                    envs.forEach(function (env) {
                        sassFiles = [];
                        compassTasks = [];
                        sassTaskName = 'sass_' + product + '_' + brand + '_' + env;
                        sassFiles.push('<%= path.sass %>/' + product + '/' + brand + '/' + env + '/**/*');
                        compassTasks.push('compass:' + product + '_' + brand + '_' + env);

                        addWatchTask(sassTaskName, sassFiles, compassTasks);
                    }); // envs
                }
            }); // brands
        }); // products

        // per brand
        // on change common/brand/env, run the tasks for all products on the brand/env
        // Ex: on change common/start/web -> run compass:cursos_start_web and compass:idiomas_start_web
        brands.forEach(function (brand) {
            if (brand !== 'default') { // otherwise run per env
                envs.forEach(function (env) {
                    sassFiles = [];
                    compassTasks = [];
                    sassTaskName = 'sass_' + brand + '_' + env;
                    sassFiles.push('<%= path.sass %>/common/' + brand + '/' + env + '/**/*');
                    products.forEach(function (product) {
                        if (product !== 'common') {
                            // TODO: use concurrent
                            compassTasks.push('compass:' + product + '_' + brand + '_' + env);
                        }
                    }); // products
                    addWatchTask(sassTaskName, sassFiles, compassTasks);
                }); // envs
            }
        }); // brands

        // per env
        // on change common/default, run all tasks for the env and not the other envs
        envs.forEach(function (env) {
            sassFiles = [];
            compassTasks = [];
            sassTaskName = 'sass_' + env;
            sassFiles.push('<%= path.sass %>/common/default/' + env + '/**/*');
            compassTasks.push('concurrent:compass_' + env);

            addWatchTask(sassTaskName, sassFiles, compassTasks);
        }); // envs
    }()); // addWatchTasks


    // -------------------------------------------
    // grunt optimization, run tasks in parallel
    // -------------------------------------------
    config.concurrent = {
        options: {
            logConcurrentOutput: true
        },
        imgs_js: [
            'imgs',
            'browserify'
        ]
    };

    function addConcurrentTask(task) {
        if (task !== 'options') {
            config.concurrent.compass_all.push('compass:' + task);
        }
        if (task.indexOf('web') > -1) {
            config.concurrent.compass_web.push('compass:' + task);
        }
        if (task.indexOf('mobile') > -1) {
            config.concurrent.compass_mobile.push('compass:' + task);
        }
    }

    (function addConcurrentTasks() {
        config.concurrent.compass_all = [];
        config.concurrent.compass_web = [];
        config.concurrent.compass_mobile = [];
        for(var task in config.compass) {
            if(config.compass.hasOwnProperty(task)) {
                addConcurrentTask(task);
            }
        }
    }());


    // -------------------------------------------
    // Grunt configuration finale
    // -------------------------------------------
    grunt.initConfig(config);

    // -------------------------------------------
    // helper tasks to run only when new files are found
    // -------------------------------------------
    grunt.registerTask('lint', ['newer:jshint']);
    grunt.registerTask('lintbabel', ['newer:eslint']);
    grunt.registerTask('minify', ['newer:cssmin']);
    grunt.registerTask('imgs', ['newer:imagemin']);


    // -------------------------------------------
    // tasks
    // -------------------------------------------
    grunt.registerTask('test', ['lint', 'lintbabel']);
    grunt.registerTask('build', ['concurrent:imgs_js', 'concurrent:compass_all']);
    grunt.registerTask('prod', ['test', 'build', 'minify']);
    grunt.registerTask('deploy', ['clean', 'build', 'minify']);
    grunt.registerTask('nope', []);


    // -------------------------------------------
    // default task to run if no task is specified
    // -------------------------------------------
    grunt.registerTask('default', ['watch']);
};
