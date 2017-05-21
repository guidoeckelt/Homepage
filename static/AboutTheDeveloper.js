var aboutme = angular.module("about-me", ["header", "controls"]);

function Language(dto) {
    var self = this;

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
        $http.get('/Homepage/api/languages+frameworks/')
            .then(function (response) {
                // console.dir(response);
                $scope.languages = response.data.map(function (dto) {
                   return new Language(dto);
                });
            },function (response) {
                // console.dir(response.data);
                console.log("Error: "+response);
            });
    };
    self.load();
}
LanguageController.$inject=["$http","$scope"];
aboutme.controller("LanguageController",LanguageController);
