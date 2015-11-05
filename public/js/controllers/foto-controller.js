angular.module('alurapic').controller('FotoController', function($scope, $routeParams, recursoFoto) {

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

			if ( $scope.foto._id ) {

				recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function() {

					$scope.mensagem = "Foto alterada com sucesso!";

				}, function(erro) {
				
					console.log(erro);
					$scope.mensagem = "Não foi possível alterar a foto!";
				});

			} else {

				recursoFoto.save($scope.foto, function() {

					$scope.foto = {};
					$scope.mensagem = "Foto incluída com sucesso!";

				}, function(erro) {
				
					console.log(erro);
					$scope.mensagem = "Não foi possível incluir a foto!";
				});
			}
		}
	};

});