var aboutme = angular.module("about-me",["navbar","controls"]);

function Language(dto) {
    var self = this;
    var dto = dto;

    self.name = dto.name;
    self.level = dto.level;
    self.frameworks = dto.frameworks.map(function (element) {
        return new Framework(element);
    });
}
function Framework(dto) {
    var self = this;

    self.name = dto.name;
    self.level = dto.level;
    self.versions = dto.versions;
}
function LanguageController($http, $scope){
    var self = this;
    $scope.languages = new Array();

    self.load = function () {
        $http.get('/data/languages.json')
            .then(function (response) {
                $scope.languages = response.data.map(function (dto) {
                   return new Language(dto);
                });
            },function (response) {
                console.log("Error: "+response);
            });
    };
    self.load();
}
LanguageController.$inject=["$http","$scope"];
aboutme.controller("LanguageController",LanguageController);
