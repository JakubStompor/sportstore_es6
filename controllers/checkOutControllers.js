angular.module("sportstore")
    .controller("cartSummaryController", ($scope, cart) => {
        $scope.cartData = cart.getProducts();
        $scope.total = () => {
            var total = 0;
            for (let val of $scope.cartData) {
                total += (val.price * val.count);
            }
            return total;
        }
        $scope.remove = (id) => {
            cart.removeProduct(id);
        }
    });