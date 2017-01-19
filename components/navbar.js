var navbar = angular.module("navbar",['controls']);

function Nav(dto){
	var self = this;

	self.text = dto.text;
	self.url = dto.url;
	self.tooltip = dto.tooltip;
	self.source = dto.source;
	self.external = (dto.source == "_blank");
	self.links = new Array();

	self.dropdown = (dto.links != null);
	if(self.dropdown){
		self.links = dto.links.map(function(element){
			return new Nav(element);
		});
	}
}
function NavbarController($http){
	var self = this;
	self.navs = new Array();
	var onSuccess = function(response){
		response.data.forEach(function(dto){
			var nav = new Nav(dto);
			self.navs.push(nav);
		});
	};
	var onError = function(response){
		console.log('error:'+response);
	};
	// $http.get('/Homepage/data/links.json').then(onSuccess,onError);
	$http.get('/Homepage/routes/links.php').then(onSuccess,onError);
}

navbar.controller("NavbarController",["$http",NavbarController]);

navbar.component('geNavbar',{
	templateUrl: '/Homepage/components/template/ge-navbar.html',
	controller: NavbarController,
	bindings: {}
});
