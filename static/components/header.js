var header = angular.module("header", ['controls']);

function Nav(dto) {
    var self = this;

    self.text = dto.text;
    self.url = dto.url;
    self.tooltip = dto.tooltip;
    self.source = dto.source;
    self.external = (dto.source == "_blank");
    self.links = new Array();

    self.dropdown = (dto.links != null);
    if (self.dropdown) {
        self.links = dto.links.map(function (element) {
            return new Nav(element);
        });
    }
}
function HeaderController($http) {
    var self = this;
    self.navs = new Array();
    var onSuccess = function (response) {
        console.dir(response);
        self.navs = response.data.map(function (dto) {
            return new Nav(dto);
        });
    };
    var onError = function (response) {
        console.dir(response);
        console.log('error:' + response);
    };
    $http.get('/Homepage/api/header-links/').then(onSuccess, onError);
}

header.controller("HeaderController", ["$http", HeaderController]);

header.component('geHeader', {
    templateUrl: '/Homepage/static/components/templates/ge-header.html',
    controller: HeaderController,
    bindings: {}
});
