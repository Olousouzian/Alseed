(function () {
    'use strict';
    /**
     * @memberof app
     * @ngdoc Controller
     * @name project
     * @param ngRoute manages route on app
     * @param ngCookies manages cookie on app
     * @param angularSpinner manages to display spinner
     * @param infinite-scroll manages scroll
     * @param angularModalservice manages to display modal
     * @param ui.tree manages to display tree
     * @param textAngular manages to display editor
     * @param frapontillo.bootstrap-switch
     * @param ui.bootstrap
     * @param ngMockE2E manages to mock app
     * @param {module} app.media manages to use mock on media service
     * @param {module} app.auth manages to use mock on authentification service
     * @param {module} app.cache
     * @param {module} app.flash
     * @param {module} app.image
     * @param {module} app.trees manages to use mock on tree service
     * @param {module} app.message manages to use mock on message service
     * @param {module} app.news manages to use mock on news service
     * @param {module} app.navigation manages to use mock on navigation service
     * @param {module} app.push manages to use mock on push service
     * @param {module} app.request manages to use mock on request service
     * @param {module} app.search manages to use mock on search service
     * @param {module} app.theme manages to use mock on theme service
     * @param {module} app.translate manages to use mock on translate service
     * @param {module} app.upload manages to use mock on upload service
     * @param {module} app.user manages to use mock on user service
     * @description
     *      Implementation of app controller.
     *      Initialize
     *          constant language (english),
     *          charge translate file,
     *          look if user is login due to cookie.
     *      Initialize
     *          route and ng mock to intercept and simulate response from API.
     */
    angular
        .module('app', [
            'ngRoute', 
            'ngCookies', 
            'angularSpinner',
            'infinite-scroll', 
            'angularModalService',
            'ui.tree',
            'textAngular',
            'frapontillo.bootstrap-switch',
            'ui.bootstrap',
            'ngMockE2E',
            'app.media',
            'app.auth',
            'app.cache',
            'app.flash',
            'app.trees',
            'app.message',
            'app.news',
            'app.navigation',
            'app.push',
            'app.request',
            'app.search',
            'app.theme',
            'app.translate',
            'app.upload',
            'app.user'
        ])
        .config(config)
        .run(run);

    // Define constants
    angular
        .module('app')
        .constant('LANGUAGE', {
            DEFAULT: 'en_US'
        })
        .constant('API', {
            DEFAULT_VERSION: '1.0'
        });

    config.$inject = ['$routeProvider', '$provide'];
    function config($routeProvider, $provide) {
        var provide = $provide;

        $routeProvider

            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home-view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login-view.html',
                controllerAs: 'vm'
            })

            .when('/forget', {
                controller: 'ForgetController',
                templateUrl: 'forget/forget-view.html',
                controllerAs: 'vm'
            })

            .when('/news', {
                controller: 'NewsController',
                templateUrl: 'news/news-view.html',
                controllerAs: 'vm'
            })

            .when('/news/add', {
                controller: 'NewsAddController',
                templateUrl: 'news/news-add-view.html',
                controllerAs: 'vm'
            })

            .when('/news/:id', {
                controller: 'NewsEditController',
                templateUrl: 'news/news-edit-view.html',
                controllerAs: 'vm'
            })

            .when('/images', {
                controller: 'ImageController',
                templateUrl: 'image/image-view.html',
                controllerAs: 'vm'
            })

            .when('/navigation', {
                controller: 'NavigationController',
                templateUrl: 'navigation/navigation-view.html',
                controllerAs: 'vm'
            })

            .when('/timeline', {
                controller: 'TimelineController',
                templateUrl: 'timeline/timeline-view.html',
                controllerAs: 'vm'
            })

            .when('/inspirations', {
                controller: 'InspirationsController',
                templateUrl: 'inspirations/inspirations-view.html',
                controllerAs: 'vm'
            })

            .when('/tree', {
                controller: 'TreesController',
                templateUrl: 'tree/tree-view.html',
                controllerAs: 'vm'
            })

            .when('/demo', {
                controller: 'DemoController',
                templateUrl: 'demo/demo.view.html',
                controllerAs: 'vm'
            })
            .when('/terms', {
                controller: 'TermsController',
                templateUrl: 'terms/terms-view.html',
                controllerAs: 'vm'
            })
            .when('/reporting', {
                controller: 'ReportingController',
                templateUrl: 'reporting/reporting-view.html',
                controllerAs: 'vm'
            })
            .when('/message', {
                controller: 'MessageController',
                templateUrl: 'message/message-view.html',
                controllerAs: 'vm'
            })
            .when('/message/add', {
                controller: 'MessageAddController',
                templateUrl: 'message/message-add-view.html',
                controllerAs: 'vm'
            })
            .when('/message/:id', {
                controller: 'MessageEditController',
                templateUrl: 'message/message-edit-view.html',
                controllerAs: 'vm'
            })
            .when('/not-found', {
                controller: 'NotFoundController',
                templateUrl: 'notFound/notFound-view.html',
                controllerAs: 'vm'
            })

            //.otherwise({ redirectTo: '/not-found' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', '$httpBackend', 'TranslateService', 'ModalService'];
    function run($rootScope, $location, $cookieStore, $http, $httpBackend, TranslateService, ModalService) {

        var _preventNavigation = false;
        var _preventNavigationUrl = null;
        var search = {
            service: "Médiathèque",
            results: [{
                "id": "0",
                "name": "image1",
                "weight": "1",
                "url": "upload/reload.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            }]
        };
        var file = {
            "files": [
                {
                    "id" : "1",
                    "name" : "image0",
                    "weight" :"1k",
                    "url" : "upload/image.png",
                    "extension" : "png",
                    "fileType" : "image",
                    "dimensions" : {
                        "width" : "100",
                        "height": "200"
                    }
                },{
                    "id" : "2",
                    "name" : "image0",
                    "weight" :"1k",
                    "url" : "upload/image.png",
                    "extension" : "png",
                    "fileType" : "image",
                    "dimensions" : {
                        "width" : "100",
                        "height": "200"
                    }
                }
            ]
        };
        var treesInfo = [
            {
                "id": 1,
                "label": "Quizzes",
                "childs": [
                    {
                        "id": 2,
                        "label": "Quizz numéro 1",
                        "childs": []
                    },
                    {
                        "id": 3,
                        "label": "Quizz numéro 2",
                        "childs": []
                    }
                ]
            },
            {
                "id": 4,
                "label": "Inspirations",
                "childs": []
            }
        ];
        var msg = [{
            'id' : '0',
            'title' : 'titre1',
            'name': 'name1',
            'date': '01/01/2015'
        },
            {
                'id' : '1',
                'title' : 'titre1',
                'name': 'name2',
                'date': '01/01/2015'
            },
            {
                'id' : '2',
                'title' : 'titre1',
                'name': 'name3',
                'date': '01/01/2015'
            },
            {
                'id' : '3',
                'title' : 'titre1',
                'name': 'name4',
                'date': '01/01/2015'
            },
            {
                'id' : '4',
                'title' : 'titre1',
                'name': 'name5',
                'date': '01/01/2015'
            }
        ];
        var nav =[
            {
                "id": "1",
                "label": "Navigation",
                "readonly": true
            },
            {
                "id": "2",
                "label": "Learnings"
            },
            {
                "id": "3",
                "label": "Inspirations"
            },
            {
                "id": "4",
                "label": "Actus Marques"
            }
        ];
        var news = [{
            id: "1",
            title: "Lorem Ipsum",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            created_at: "1451644932",
            updated_at: "1451644932",
            publish_start: "1451644932",
            publish_end: "",
            active: true
        }, {
            id: "2",
            title: "Why do we use it ?",
            excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            content: "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            created_at: "1450725840",
            updated_at: "1450734564",
            publish_start: "1450725840",
            publish_end: "",
            active: false
        }, {
            id: "3",
            title: "Where does it come from ?",
            excerpt: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
            content: "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
            created_at: "1450098420",
            updated_at: "1450098420",
            publish_start: "1450098420",
            publish_end: "1451645932",
            active: true
        }];
        var message = {id : 1,active: true, title: "aaaa", text: "aaaaaa"};
        var oneNews = [{
            id: "1",
            title: "Lorem Ipsum",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            created_at: "1451644932",
            updated_at: "1451644932",
            publish_start: "1451644932",
            publish_end: "",
            active: true
        }];
        var terms = {
            "ut" :"10",
            "um" : "5",
            "salon" : "10",
            "salonEli" : "30",
            "quizByUser" : "15",
            "quizBySalon" : "10",
            "vente" : "10",
            "venteMonth" : "20",
            "venteByUser" : "10",
            "venteBySalon" : "10",
            "pointUsers" : "15",
            "pointSalon" : "10",
            "pointUsing" : "10",
            "present" : "5"
        };
        var languages = [{
            'label': 'English',
            'code': 'en_US'
        }, {
            'label': 'French',
            'code': 'fr_FR'
        }];
        var fileUpload = {
            files:[ {
                "id": "1",
                "name": "image1",
                "weight": "1",
                "url": "upload/reload.png",
                "extension": "png",
                "fileType": "image",
                "dimensions": {
                    "width": "100",
                    "height": "200"
                }
            }]
        };
        $httpBackend.whenGET(/\.html$/).passThrough();
        $httpBackend.whenGET(/\.json$/).passThrough();
        $httpBackend.expect("GET", "/media/allMedia");
        $httpBackend.whenGET("/media/allMedia").respond(file);
        $httpBackend.expect("GET", "/media/searchMedia");
        $httpBackend.whenGET("/media/searchMedia").respond(search);
        $httpBackend.expect("GET", "/media/deleteMedia");
        $httpBackend.whenGET("/media/deleteMedia").respond("fichier supprimer avec succées");
        $httpBackend.expect("GET", "/trees/getTree");
        $httpBackend.whenGET("/trees/getTree").respond(treesInfo);
        $httpBackend.expect("GET", "/message/allMessage");
        $httpBackend.whenGET("/message/allMessage").respond(msg);
        $httpBackend.expect("POST", "/message/updateMessage");
        $httpBackend.whenPOST("/message/updateMessage").respond("fichier update");
        $httpBackend.expect("GET", "/message/deleteMessage");
        $httpBackend.whenGET("/message/deleteMessage").respond("fichier supprimer");
        $httpBackend.expect("POST", "/message/addMessage");
        $httpBackend.whenPOST("/message/addMessage").respond(message);
        $httpBackend.expect("GET", "/navigation/getNavigation");
        $httpBackend.whenGET("/navigation/getNavigation").respond(nav);
        $httpBackend.expect("GET", "/news/allNews");
        $httpBackend.whenGET("/news/allNews").respond(news);
        $httpBackend.expect("POST", "/news/addNews");
        $httpBackend.whenPOST("/news/addNews").respond(oneNews);
        $httpBackend.expect("POST", "/news/updateNews");
        $httpBackend.whenPOST("/news/updateNews").respond("ok");
        $httpBackend.expect("POST", "/news/deleteNews");
        $httpBackend.whenPOST("/news/deleteNews").respond("ok");
        $httpBackend.expect("POST", "/push/send");
        $httpBackend.whenPOST("/push/send").respond("ok");
        $httpBackend.expect("GET", "/reporting/download");
        $httpBackend.whenGET("/reporting/download").respond(terms);
        $httpBackend.expect("GET", "/translate/allLanguage");
        $httpBackend.whenGET("/translate/allLanguage").respond(languages);
        $httpBackend.expect("POST", "upload/fileUpload");
        $httpBackend.whenPOST("upload/fileUpload").respond(fileUpload);
        $rootScope.globals = $cookieStore.get('globals') || {};
        $rootScope.currentLanguage = 'en_US';
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            $rootScope.currentLanguage = $cookieStore.get('language');
            $rootScope.theme = $cookieStore.get('theme');
        }
        TranslateService.InitTranslate($rootScope.currentLanguage).then(function() {
            $rootScope.chargeTranslate = true;
        });

        $rootScope.$on('$locationChangeStart', function (event, next, current, newState, oldState) {
            if (_preventNavigationUrl != current || _preventNavigationUrl == null) {
                $rootScope.allowNavigation();
            }

            if (_preventNavigation) {
                var path = $location.path();
                
                ModalService.showModal({
                    templateUrl: "modal/modal-confirmation-view.html",
                    controller: "ModalConfirmationController"
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        if (result) {
                            $rootScope.allowNavigation();
                            $location.path(path);
                        }
                    });
                });

                event.preventDefault();
            }
            else {
                var restrictedPage = $.inArray($location.path(), ['/login', '/forget']) === -1;
                $rootScope.menuAvalaible = restrictedPage;
                var loggedIn = $rootScope.globals.currentUser;
                
                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            }
        });
        window.onbeforeunload = function() {
            /** Use the same data that we've set in our angular app
             */
            if (_preventNavigation && $location.absUrl() == _preventNavigationUrl) {
                return "You have unsaved changes, do you want to continue?";
            }
        }

        $rootScope.allowNavigation = function() {
            _preventNavigation = false;
        };

        $rootScope.preventNavigation = function() {
            _preventNavigation = true;
            _preventNavigationUrl = $location.absUrl();
        };
    }

})();