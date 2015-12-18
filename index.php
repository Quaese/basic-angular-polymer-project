<html ng-app="qpCD" ng-controller="qpApp">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <title>CD-Datenbank</title>
    <link rel="stylesheet" href="libs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="app/css/style.min.css">

    <script src="libs/webcomponentsjs/webcomponents-lite.min.js"></script>
    <link rel="import" href="polymer/elements/dom-module.element.html" />
    <link rel="import" href="libs/paper-button/paper-button.html" />
</head>
<body>
    <navigation></navigation>

    <!-- <div class="container"> -->
        <!-- wrapper/holder fuer Unterseiten (z.B. clubs.html) -->
        <div ui-view ng-view class="template-wrapper"></div>
    <!-- </div> -->

    <script src="libs/jquery/dist/jquery.min.js"></script>
    <script src="libs/jquery.scrollTo/jquery.scrollTo.min.js"></script>

    <script src="libs/angular/angular.min.js"></script>
    <script src="libs/angular-animate/angular-animate.min.js"></script>
    <script src="libs/angular-touch/angular-touch.min.js"></script>
    <script src="libs/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="libs/angular-cookies/angular-cookies.min.js"></script>

    <script src="app/js/services/services.min.js"></script>
    <script src="app/js/directives/directives.min.js"></script>
    <script src="app/js/controller/controller.min.js"></script>
    <script src="app/js/app.min.js"></script>

    <!--
    <script src="app/js/services/services.js"></script>
    <script src="app/js/directives/directives.js"></script>
    <script src="app/js/controller/controller.js"></script>
    <script src="app/js/app.js"></script>
    -->
</body>
</html>