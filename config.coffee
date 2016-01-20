exports.config =
    conventions:
        ignored: [
            /-test.js$/
            /app[\\/]app-content[\\/]themes[\\/]/
            /app[\\/]app-content[\\/]docTemplate[\\/]/
        ]
    modules:
        definition: false
        wrapper: false
    files:
        stylesheets:
            joinTo:
                'css/app.css': /^app/
                'css/vendor.css': /^(?!app)/
            order:
                before: [
                    'app/app-content/app.css',
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                    'bower_components/angular-ui-tree/dist/angular-ui-tree.min.css'
                ]
        javascripts:
            joinTo:
                'js/app.js': /^app/
                'js/vendor.js': /^(?!app)/
            order:
                before: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'app/app-models/Dimensions.js',
                    'app/app-models/AbstractFile.js',
                    'app/app-models/FileImage.js',
                    'app/app-models/FileFactory.js',
                    'app/app-models/AbstractCollection.js',
                    'app/app-models/FileCollection.js',
                    'app/project.js',
                    'bower_components/angular/angular.js',
                    'bower_components/ng-file-upload/ng-file-upload.js'
                    'bower_components/ng-file-upload/ng-file-upload-shim.js',
                    'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
                    'bower_components/angular-modal-service/dst/angular-modal-service.js'
                ]
        templates:
            joinTo: 
                'js/templates.js': /.+\.jade$/
    plugins:
        jade:
            options:          
                pretty: yes
        static_jade:
            path: [ /app/ ]
            asset: "public"