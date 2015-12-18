/*jslint unparam: true */
/*global window*/
(function () {
    'use strict';

    var app = angular.module('qpCD.controller', ['ngAnimate', 'qpCD.services']);

    app
        .controller('qpApp', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
            // get config parameter from json file
            $http.get('app/js/config.json.php').then(function (config) {
                $rootScope.config = config.data;
            });
        }])

        .controller('start.controller', [
            '$scope',
            '$filter',
            'filterArray',
            'config',

            function ($scope, $filter, filterArray, config) {
                var tmpls = {
                    header: {class: 'header-start'},
                    topdivider: {class: 'topdivider-start'},
                    content: {url: 'views/home/content-start.tmpl.html', class: 'content-start'},
                    footer: {class: 'footer-start'}
                };

                // console.log('start.controller: ', cd_year_stats);

                // Default-Templates (aus app/config.json.php) mit Controller-spezifischen Daten erweitern
                $scope.templates = angular.merge({}, config.templates, tmpls);

                // Pfade
                $scope.paths = config.paths;
                // Math Objekt an $scope binden (inject)
                $scope.Math = window.Math;

                // Titel für header-Template
                $scope.pageName = "Startseite";

                $scope.hello = function () {
                    console.log('hello');
                };
            }
        ])

        .controller('about.controller', [
            '$scope',
            'config',

            function ($scope, config) {
                var tmpls = {
                    header: {class: 'header-about'},
                    topdivider: {class: 'topdivider-about'},
                    content: {url: 'views/about/content-about.tmpl.html', class: 'content-about'},
                    footer: {class: 'footer-about'}
                };

                // Default-Templates (aus app/config.json.php) mit Controller-spezifischen Daten erweitern
                $scope.templates = angular.merge({}, config.templates, tmpls);

                // Titel im header
                $scope.pageName = "Impressum";

                $scope.name = {
                    first: "Quaese",
                    last: "Pichel"
                };
            }
        ]);
}());