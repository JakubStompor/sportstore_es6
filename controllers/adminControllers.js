angular.module("sportstoreAdmin")
    .constant("authUrl", "http://localhost:5500/users/login")
    .constant("ordersUrl", "http://localhost:5500/orders")
    .controller("authCtrl", ($scope, $http, $location, authUrl) => {
        $scope.authenticate = (user, pass) => {
            $http.post(authUrl, {
                username: user,
                password: pass
            }, {
                withCredentials: true
            }).then((data) => {
                $location.path("main");
            }).catch((error) => {
                $scope.authenticationError = error;
            });
        }
    }).controller("mainCtrl", ($scope) => {
        $scope.screens = ["Produkty", "Zamówienia"];
        $scope.current = $scope.screens[0];
        $scope.setScreen = (index) => {
            $scope.current = $scope.screens[index];
        };
        $scope.getScreen = () => {
            return $scope.current == "Produkty" ? "/views/adminProduct.html" : "/views/adminOrders.html";
        };
    }).controller("ordersCtrl", ($scope, $http, ordersUrl) => {
        $http.get(ordersUrl, {
                withCredentials: true
            })
            .then((data) => {
                $scope.orders = data.data;
            })
            .catch((error) => {
                $scope.error = error;
            });
        $scope.selectedOrder;
        $scope.selectOrder = (order) => {
            $scope.selectedOrder = order;
        };
        $scope.calcTotal = (order) => {
            let total = 0;
            order.products.forEach((element) => {
                total += (element.price * element.count);
            });
            return total;
        }
    });;