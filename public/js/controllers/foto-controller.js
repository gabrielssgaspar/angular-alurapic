angular.module('alurapic').controller('FotoController', function($scope, $routeParams, recursoFoto, cadastroDeFotos) {

	$scope.foto = {};
	$scope.mensagem = '';


	if ( $routeParams.id ) {

		recursoFoto.get({fotoId : $routeParams.id}, function(foto) {

			$scope.foto = foto;

		}, function(erro) {
			
			console.log(erro);
		});

	}


	$scope.submeter = function() {

		if ( $scope.formulario.$valid ) {

			cadastroDeFotos.cadastrar($scope.foto)
			.then(function(retorno) {
				$scope.mensagem = retorno.mensagem;
				if ( retorno.inclusao ) $scope.foto = {};
			})
			.catch(function(erro) {
				$scope.mensagem = erro.mensagem;
			});

		}
	};

});