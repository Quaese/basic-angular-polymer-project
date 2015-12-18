/*jslint unparam: true */
(function () {
    'use strict';

    var baseTemplate = "views/base.tmpl.html",
        app = angular.module('qpCD', ['ngAnimate', 'ngRoute', 'qpCD.services', 'qpCD.controller']);

    app
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: baseTemplate,
                    controller: 'start.controller',
                    controllerAs: 'Start',
                    name: 'Start',
                    nav: true,
                    resolve: {
                        cds: function (storage) {
                            return storage.getAllCDs();
                        },
                        bands: function (storage) {
                            return storage.getAllBands();
                        },
                        bandinfo: function (storage) {
                            return storage.getBandInfo(10);
                        },
                        config: function (config) {
                            return config.getConfig();
                        }
                    }
                })
                .when('/cd/:id?', {
                    templateUrl: baseTemplate,
                    controller: 'singlecd.controller',
                    name: 'CD',
                    controllerAs: 'CD',
                    nav: false,
                    resolve: {
                        cd: function ($stateParams, storage) {
                            // console.log($route);
                            // return {id: $route.current.params.id};
                            return storage.getCD($stateParams.id); //storage.getAllCDs();
                        },
                        config: function (config) {
                            return config.getConfig();
                        }
                    }
                })
                .when('/cds', {
                    templateUrl: baseTemplate,
                    controller: 'allcds.controller',
                    name: 'CDs',
                    controllerAs: 'CDs',
                    nav: true,
                    resolve: {
                        cds: function (storage) {
                            return storage.getAllCDs();
                        },
                        config: function (config) {
                            return config.getConfig();
                        }
                    }
                })
                .when('/cds/random', {
                    templateUrl: baseTemplate,
                    controller: 'randomcds.controller',
                    name: 'Zufallsliste',
                    controllerAs: 'Zufallsliste',
                    nav: true,
                    resolve: {
                        cds: function (storage) {
                            return storage.getAllCDs();
                        },
                        config: function (config) {
                            return config.getConfig();
                        }
                    }
                })
                .when('/band/:id?', {
                    templateUrl: baseTemplate,
                    controller: 'singleband.controller',
                    name: 'Band',
                    controllerAs: 'Band',
                    nav: false,
                    resolve: {
                        band: function ($stateParams, storage) {
                            return storage.getBand($stateParams.id);
                        },
                        config: function (config) {
                            return config.getConfig();
                        }
                    }
                })
                .when('/bands', {
                    templateUrl: baseTemplate,
                    controller: 'allbands.controller',
                    name: 'Bands',
                    controllerAs: 'Bands',
                    nav: true,
                    resolve: {
                        bands: function (storage) {
                            return storage.getAllBands();
                        },
                        config: function (config) {
                            return config.getConfig();
                        }
                    }
                })
                .when('/about', {
                    templateUrl: baseTemplate,
                    controller: 'about.controller',
                    name: 'UeberMich',
                    controllerAs: 'UeberMich',
                    nav: true,
                    resolve: {
                        config: function (config) {
                            return config.getConfig();
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
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
        .filter('objectFilter', function() {
            return function (items, search) {
                var result = [],
                    check;

                // durchläuft Array
                angular.forEach(items, function (obj, index) {
                    // durchläuft Quellobjekt
                    angular.forEach(obj, function (value, key) {
                        // Testvariable, um Quellobjekt bei Mehrfachtreffern NICHT mehrfach zurück zu geben
                        check = true;
                        // durchläuft Suchobjekt
                        angular.forEach(search, function (_val, _key){
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
                        })
                    })
                });

                return result;
            }
        })
;
}());