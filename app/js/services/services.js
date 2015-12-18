/*jslint unparam: true */
(function () {
    'use strict';

    var app = angular.module('qpCD.services', ['ngAnimate', 'qpCD.directives']),
        /*
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         * Für Verwendung auf Uberspace, die Variante mit index.php verwenden
         * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         */
        preUrl = "api";
        // preUrl = "api/index.php";

    app
        // .factory('config', ['$rootScope', function ($rootScope) {
        //     return $rootScope.config;
        // }])

        .factory('config', ['$rootScope', '$http', '$q', function ($rootScope, $http, $q) {
            var configCache;

            return {
                getConfig: function () {
                    if (configCache) {
                        return configCache;
                    } else {
                        var deferred = $q.defer();

                        // get config parameter from json file
                        $http.get('app/js/config.json.php').then(function (config) {
                            configCache = config.data;
                            deferred.resolve(config.data);
                        });

                        return deferred.promise;
                    }
                },

                getPaths: function () {
                    return configCache.paths;
                }
            };
        }])

        .factory('storage', ['$http', '$q', function ($http, $q) {
            var cdList = [],
                bandList = [],
                bandInfoList = [],
                cdYearStat = [],
                commonSearchResults = [],
                cdObj,
                bandObj,
                coverList;

            return {
                getCD: function (id) {
                    var deferred = $q.defer();

                    $http.get(preUrl + '/cd/' + id).then(function (response) {
                        // console.log(response);
                        cdObj = response.data;

                        deferred.resolve(cdObj);
                    });

                    return deferred.promise;
                },
                getAllCDs: function () {
                    if (cdList.length) {
                        // console.log("cached cdList");
                        return cdList;
                    } else {
                        // console.log("fetch cdList");
                        var deferred = $q.defer();

                        $http.get(preUrl + '/cds', {
                            cache: true
                        }).then(function (response) {
                            cdList = response.data;

                            deferred.resolve(cdList);
                        });

                        return deferred.promise;
                    }
                }
            };
        }])

        .factory('filterArray', [function () {
            return {
                // Array aus Objekten filtern (welcher _key === _value)
                filterArrayByKeyAndValue: function (arr, _key, _value) {
                    return $.map(arr, function (val, i) {
                        return val[_key] === _value ? val : null;
                    });
                }
            };
        }])

        // Eigener Navigations-Route-Service (https://angularjs.de/artikel/navigation-menu-bootstrap)
        .factory('routeNavigation', ['$state', '$location', function ($state, $location) {
            var routes = [],
                states = $state.get();

            // Ueber alle States interieren
            angular.forEach(states, function (state) {
                // Falls der aktuelle State in der Navigation angezeigt werden soll
                if (state.nav === true) {
                    routes.push({
                        path: state.url,
                        name: state.controllerAs
                    });
                }
            });

            return {
                routes: routes,
                activeRoute: function (route) {
                    return route.path === $location.path();
                }
            };
        }])
        ;
}());