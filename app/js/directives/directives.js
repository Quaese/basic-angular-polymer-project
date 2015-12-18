/*jslint unparam: true */
(function () {
    'use strict';

    var app = angular.module('qpCD.directives', ['qpCD.services']),
        resizeDelay = 200,
        preUrl = "api";
        // preUrl = "api/index.php";

    app
        .directive('navigation', [
            'routeNavigation',

            function (routeNavigation) {
                var getRoutByName = function (name) {
                        var ret;

                        // Über alle Routen iterieren
                        angular.forEach(routeNavigation.routes, function (route) {
                            // falls der Name der aktuellen Route dem gesuchten Namen entspricht
                            if (route.name === name) {
                                ret = route;
                            }
                        });

                        return ret;
                    };

                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: 'views/directives/navigation-directive.tmpl.html',

                    controller: ['$scope', function ($scope) {
                        $scope.routes = routeNavigation.routes;
                        $scope.activeRoute = routeNavigation.activeRoute;
                    }],

                    link: function (scope, elem, attr, ctrl) {
                        // Navigationselement (enthält UL mit Navigationspunkten)
                        var nav = elem.find('.navbar-collapse');

                        // Funktion zum Ein-/Ausblenden der Navigation für kleine Auflösungen (<902px)
                        // @prop - (string) 'block' => Nav. wird ausgeblenden, 'none' => Nav. wird eingeblenden
                        scope.toggleCollapse = function (prop) {
                            var display = (prop && (prop.display !== undefined)) ? prop.display : nav.css('display');

                            nav.css({
                                display: (display === 'none' ? 'block' : 'none')
                            });

                            if (prop && (prop.display !== undefined)) {
                                window.location.hash = "#" + prop.url;
                            }
                        };


                        // Navigation-Event-Handler registrieren
                        // $rootScope.$on('navigationChanged', function (evt, data) {
                        scope.$on('navigationChanged', function (evt, data) {
                            var items = elem.find('.nav.navbar-nav li'),
                                item = {
                                    dest: items.filter('[data-name=' + data.dest + ']'),
                                    src : items.filter('[data-name=' + data.src + ']')
                                },
                                // aktuelle Route anhand des Namens ermitteln
                                route = getRoutByName(data.dest);

                            // // CSS-Klassen setzen/entfernen
                            // window.setTimeout(function () {
                            //     items.removeClass('active');
                            //     item.dest.addClass('active');
                            // }, 1);
                        });
                    }
                };
            }
        ])

        /*
         * Elemente können mit dem Attribut "ng-mobile-click" ausgezeichnet werden. Dieses Argument
         * erhält als Wert den Aufruf des gewünschten Handlers mit den folgenden Argumenten:
         *
         * 1. event - (event) Event-Objekt (z.B. $event)
         * 2. data - (object) Objekt mit zusätzlichen Eigenschaften (z.B. {'name': 'hans', 'alter': 18})
         *
         * Beispiel:
         * <tr ng-repeat="cd in list" ng-mobile-click="slideTo($event, {'test': 'abc', 'row': {{$index}}});" data-row="{{$index}}">
         */
        .directive("ngMobileClick", ['$parse', function ($parse) {
            return function (scope, elem, attrs) {
                var fn = $parse(attrs["ngMobileClick"]);

                elem.on("touchstart click", function (evt, data) {
                    var e = evt,
                        data = arguments[1] || {};

                    // doppelte Ausführung verhindern
                    evt.preventDefault();
                    evt.stopPropagation();

                    // Funktion auf scope ausführen
                    scope.$apply(function () {
                        // Funktionsaufruf mit entsprechenden Argumenten
                        fn(scope, {$event: e, data: data});
                    });
                });
            }
        }])

        /*
         * Elemente können mit dem Attribut "ng-mobile-mouseup" ausgezeichnet werden. Dieses Argument
         * erhält als Wert den Aufruf des gewünschten Handlers mit den folgenden Argumenten:
         *
         * 1. event - (event) Event-Objekt (z.B. $event)
         * 2. data - (object) Objekt mit zusätzlichen Eigenschaften (z.B. {'name': 'hans', 'alter': 18})
         *
         * Beispiel:
         * <tr ng-repeat="cd in list" ng-mobile-mouseup="slideTo($event, {'test': 'abc', 'row': {{$index}}});" data-row="{{$index}}">
         */
        .directive("ngMobileMouseup", ['$parse', function ($parse) {
            return function (scope, elem, attrs) {
                var fn = $parse(attrs["ngMobileMouseup"]);

                elem.on("touchend click", function (evt, data) {
                    console.log(evt);
                    var e = evt,
                        data = arguments[1] || {};

                    // doppelte Ausführung verhindern
                    evt.preventDefault();
                    evt.stopPropagation();

                    // Funktion auf scope ausführen
                    scope.$apply(function () {
                        // Funktionsaufruf mit entsprechenden Argumenten
                        fn(scope, {$event: e, data: data});
                    });
                });
            }
        }])

        .directive('uiPageinput', function () {
            return {
                link: function (scope, elem, attr, ctrl) {
                    // console.log('uiPageinput: ', arguments);
                    scope.$on('searchReady', function (e) {
                        //do something here.
                        console.log('directive (uiPageinput): ', elem);
                        // elem.val('');
                    });
                }
            };
        })

        // Directive zum Anzeigen und Anstossen einer allgemeinen Suche (CommonSearch)
        .directive('scrollToTop', ['$http', '$timeout', 'config', function ($http, $timeout, config) {
            var delay = 400;

            return {
                restrict: 'E',
                replace: true,
                templateUrl: "views/directives/scrolltotop-directive.tmpl.html",

                link: function (scope, elem, attrs) {   // 2.
                    // Handler zum Starten der Suche, falls es sich bei der Eingabe um die Return-Taste handelt
                    scope.scrollToTop = function () {
                        $(window).scrollTo(0, delay)
                    };
                },

                controller: ['$scope', function ($scope) {   // 1.
                }]
            };
        }]);
}());