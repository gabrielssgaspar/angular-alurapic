angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource) {
	
	var recurso = $resource('/v1/fotos/:fotoId', null, {
		'update': {
			method: 'PUT'
		}
	});

	return recurso;
});