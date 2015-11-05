angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams) {

	$scope.foto = {};
	$scope.mensagem = '';

	if ( $routeParams.id ) {

		$http.get('/v1/fotos/' + $routeParams.id)

			.success(function(foto){
				$scope.foto = foto;
			})

			.error(function(erro){
				console.log(erro);
			})
		;
	}

	$scope.submeter = function() {

		if ( $scope.formulario.$valid ) {

			if ( $scope.foto._id ) {

				$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)

					.success(function(){
						$scope.mensagem = "Foto alterada com sucesso!";
					})

					.error(function(erro){
						$scope.mensagem = "Não foi possível alterar a foto!";
					})
				;

			} else {

				$http.post('v1/fotos', $scope.foto)

					.success(function(){
						$scope.mensagem = "Foto incluída com sucesso!";
						$scope.foto = {};
					})

					.error(function(erro){
						$scope.mensagem = "Não foi possível incluir a foto!";
					})
				;
			}
		}
	};

});