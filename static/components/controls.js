/**
 * Created by Guido on 26.11.2016.
 */
let controls = angular.module("controls", []);

//=====Paragraphs
controls.directive('geParagraph',function () {
    return {
        restrict: 'E',
        scope: {
            title:'@',
            footer:'@'
        },
        controller: function($scope, $element) {

        },
        templateUrl: "/Homepage/static/components/templates/controls/ge-paragraph.html",
        transclude: true,
        replace: true
    };
});
//=====Link
controls.directive('geLink', function() {
    return {
        restrict: 'E',
        scope: {
            text:'@',
            url:'@',
            tooltip:'@',
            source:'@',
            external:'@'
        },
        controller: function($scope, $element) {

        },
        templateUrl: "/Homepage/static/components/templates/controls/ge-link.html",
        replace: true
    };
});
//=====List
controls.directive('geList', function() {
    return {
        restrict: 'E',
        scope: {
            title:'@'
        },
        controller: function($scope, $element) {

        },
        templateUrl: "/Homepage/static/components/templates/controls/list/ge-list.html",
        transclude: true,
        replace: true
    };
});
controls.directive('geListEntry', function() {
    return {
        restrict: 'E',
        scope: {
            text:'@'
        },
        controller: function($scope, $element) {

        },
        templateUrl: "/Homepage/static/components/templates/controls/list/ge-list-entry.html",
        replace: true
    };
});
controls.directive('geListEntryTitled', function() {
    return {
        scope: {
            title: '@',
            text: '@',
            subTitle: '@'
        },
        controller: function($scope, $element) {

        },
        restrict: 'E',
        templateUrl: "/Homepage/static/components/templates/controls/list/ge-list-entry-titled.html",
        transclude: true,
        replace: true
    };
});

//=====Footer
controls.directive('geFooter',function () {
    return {
        restrict: 'E',
        scope: {
            title:'@',
            footer:'@'
        },
        controller: function($scope, $element) {

        },
        templateUrl: "/Homepage/static/components/templates/controls/footer/ge-footer.html",
        transclude: true,
        replace: true
    };
});
controls.directive('geBackToTop',function () {
    return {
        restrict: 'E',
        scope: {
            text:'@'
        },
        controller: function($scope, $element) {
            var self = this;
            $scope.backToTop = function () {
                window.scrollTo(0,0);
            }
        },
        templateUrl: "/Homepage/static/components/templates/controls/ge-back-to-top.html",
        replace: true
    };
});
