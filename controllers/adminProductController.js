angular.module("sportstoreAdmin")
    .constant("productUrl", "http://localhost:5500/products/")
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }).controller("productCtrl", ($scope, $resource, productUrl) => {
        $scope.productResource = $resource(productUrl + ":id", {
            id: "@id"
        });
        $scope.listProducts = () => {
            $scope.products = $scope.productResource.query();
        }
        $scope.deleteProduct = (product) => {
            product.$delete.then(() => {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        }
        $scope.createProduct = (product) => {
            new $scope.productResource(product).$save().then((newProduct) => {
                $scope.products.push(newProduct);
                $scope.editedProduct = null;
            })
        }
        $scope.updateProduct = function (product) {
            product.$save();
            $scope.editedProduct = null;
        }
        $scope.startEdit = function (product) {
            $scope.editedProduct = product;
        }
        $scope.cancelEdit = function () {
            $scope.editedProduct = null;
        }
        $scope.listProducts();
    })