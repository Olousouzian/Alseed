module.exports = function(config) {
    config.set({
        browers: ['PhantomJS'],
        frameworks: ['jasmine'],

        reporters: ['coverage'],
        preprocessors: {
            'app/**/!(*-test).js': ['coverage']
        },
        plugins:[
            'karma-jasmine',
            'karma-coverage',
            'karma-junit-reporter',
            'karma-phantomjs-launcher'
        ],
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-spinner/angular-spinner.js',
            'bower_components/clone.js/clone.js',
            'bower_components/ng-file-upload/ng-file-upload.js',
            'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
            'bower_components/spin.js/spin.js',
            'bower_components/spin.js/jquery.spin.js',
            'bower_components/angular-modal-service/dst/angular-modal-service.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-bootstrap-switch/dist/angular-bootstrap-switch.js',
            'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
            'bower_components/textAngular/dist/textAngular.js',
            'bower_components/textAngular/dist/textAngular-sanitize.js',
            'bower_components/textAngular/dist/textAngularSetup.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/rangy/rangy-core.js',
            'bower_components/rangy/rangy-classapplier.js',
            'bower_components/rangy/rangy-highlighter.js',
            'bower_components/rangy/rangy-selectionsaverestore.js',
            'bower_components/rangy/rangy-serializer.js',
            'bower_components/rangy/rangy-textrange.js',
            'app/project.js',
            'app/**/*.js'
        ],
        phantomjsLauncher: {
            exitOnResourceError: true
        },
        junitReporter: {
            outputDir: 'results/junit',
            outputFile: 'TESTS-xunit.xml',
            useBrowserName: false
        },
        coverageReporter: {
            dir: 'results',
            subdir: 'coverage',
            includeAllSources: true,
            reporters: [{
                type: 'cobertura'
            }, {
                type: 'lcov'
            }]
        }
    });
};
