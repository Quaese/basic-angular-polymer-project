/*jslint unparam: true */
(function () {
    'use strict';

    var baseTemplate = "views/base.tmpl.html",
        app = angular.module('qpCD', [
            'ngAnimate',
            'ngTouch',
            'ngCookies',
            'ui.router',
            'qpCD.services',
            'qpCD.controller'
        ]);

    app
        // ui-router (https://github.com/angular-ui/ui-router)
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider
                // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                // Here we are just setting up some convenience urls.
                // .when('/c?id', '/cd/:id')
                // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                .otherwise('/');


            //
            // Now set up the states
            $stateProvider
                .state('start', {
                    url: "/",
                    templateUrl: baseTemplate,
                    controller: 'start.controller',
                    controllerAs: 'Start',
                    nav: true,
                    resolve: {
                        // cds: ['storage', function (storage) {
                        //     return storage.getAllCDs();
                        // }],
                        // cd_year_stats: ['storage', function (storage) {
                        //     return storage.getCDYearStats();
                        // }],
                        // bands: ['storage', function (storage) {
                        //     return storage.getAllBands();
                        // }],
                        // bandinfo: ['storage', function (storage) {
                        //     return storage.getBandInfo(20);
                        // }],
                        config: ['config', function (config) {
                            return config.getConfig();
                        }]
                    }
                })
                .state('about', {
                    url: "/about",
                    templateUrl: baseTemplate,
                    controller: 'about.controller',
                    controllerAs: 'UeberMich',
                    nav: true,
                    resolve: {
                        config: ['config', function (config) {
                            return config.getConfig();
                        }]
                    }
                });
        }])


        // Suchfilter für Array aus Quellobjekten nach Suchobjekt (nur Prüfung, ob Suchstring enthalten ist)
        // ToDo: Suche nach Zahlen!!!
        //
        // Beispiel:
        // Array = [
        //     {name: 'hans', zuname: 'wuasd'},
        //     {name: 'peter', zuname: 'lustig'},
        //     {name: 'willi', zuname: 'wacker'}
        // ]
        //
        // $filter('objectFilter')(Array, {name: 'an', zuname: 'ck'});
        //
        // liefert
        // [
        //     {name: 'hans', zuname: 'wuasd'},
        //     {name: 'willi', zuname: 'wacker'}
        // ]
        //
        .filter('objectFilter', [function () {
            return function (items, search) {
                var result = [],
                    check;

                // durchläuft Array
                angular.forEach(items, function (obj, index) {
                    // Testvariable, um Quellobjekt bei Mehrfachtreffern NICHT mehrfach zurück zu geben
                    check = true;

                    // durchläuft Quellobjekt
                    angular.forEach(obj, function (value, key) {
                        // durchläuft Suchobjekt
                        angular.forEach(search, function (_val, _key) {
                            // console.log("1) key: ", key, " == ", "_key: ", _key, " :: ", key === _key);
                            // console.log("2) value: ", value, " < ", "_val: ", _val, " :: ", new RegExp(_val, "i").test(value));

                            // Falls bisher
                            // 1: bisher im Quellobjekt noch kein Suchtreffer war (check)
                            // 2: die Schlüssel aus Quell- und Suchobjekt übereinstimmen
                            // 3: der Suchausdruck aus dem Suchobjekt im aktuellen Wert enthalten ist
                            if (check && key === _key && new RegExp(_val, "i").test(value)) {
                                // Quellobjet in Rückgabe-Array pushen
                                result.push(obj);
                                // weitere Treffer im aktuellen Quellobjekt vermeiden
                                check = false;
                            }
                        });
                    });
                });

                return result;
            };
        }])
        ;
}());