angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource) {
	
	var recurso = $resource('/v1/fotos/:fotoId', null, {
		'update': {
			method: 'PUT'
		}
	});

	return recurso;
})
.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope) {

	var servico = {};

	servico.cadastrar = function(foto) {

		return $q(function(resolve, reject) {

			if ( foto._id ) {

				recursoFoto.update({fotoId : foto._id}, foto, function() {

					$rootScope.$broadcast('fotoCadastrada');

					resolve({
						mensagem : 'Foto ' + foto.titulo + ' alterada com sucesso!',
						inclusao : false
					});

				}, function(erro){

					console.log(erro);
					reject({
						mensagem : 'Não foi possível alterar a foto ' + foto.titulo
					});
					
				});

			} else {

				recursoFoto.save(foto, function(){

					$rootScope.$broadcast('fotoCadastrada');

					resolve({
						mensagem : 'Foto ' + foto.titulo + ' incluída com sucesso!',
						inclusao : true
					});

				}, function(erro){

					console.log(erro);
					reject({
						mensagem : 'Não foi possível incluir a foto ' + foto.titulo
					});

				});

			}

		});

	};

	return servico;
});