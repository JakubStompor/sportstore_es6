angular.module('sportstore')
    .constant("dataUrl", "http://localhost:5500/products")
    .constant("orderUrl", "http://localhost:5500/orders")
    .controller('sportstoreCtrl', ($scope, $route, $location, $http, dataUrl, orderUrl, cart) => {
        $scope.data = {};
        $scope.data.products = [{}];
        $scope.data.orderId = {};

        $http.get(dataUrl)
            .then(data => {
                $scope.data.products = data.data;
            }).catch(data => {
                $scope.data.error = data;
            });
        
        $scope.sendOrder = (shippingDetails) => {
            let order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order).then((data) => {
                $scope.data.orderId = data.data.id;
                cart.getProducts().length = 0;
            }).catch((error) => {
                $scope.data.orderError = error;
            }).finally(() => {
                $location.path("complete");
            })
        }
    });