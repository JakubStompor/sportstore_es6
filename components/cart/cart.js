angular.module("cart", [])
.factory("cart", () => {
    let cartData = [];
    return {
        addProduct: (id, name, price) => {
            let addedToExistingItem = cartData.some((i, ind) => {
                if (i.id == id) {
                    cartData[ind].count++;
                    return true;
                }
            });
            if (!addedToExistingItem) {
                cartData.push({
                    count: 1, id: id, price: price, name: name    
                })
            }
        }, 
        removeProduct: (id) => {
            cartData.some((i, ind) => {
                if (i.id == id) {
                    cartData.splice(ind, 1);
                    return true;
                }
            })
        },
        getProducts: () => {
            return cartData;
        }
    }
}).directive("cartSummary", (cart) => {
    return {
        restrict: "E",
        templateUrl: "components/cart/cartSummary.html",
        controller: ($scope) => {
            let cartData = cart.getProducts();
            $scope.total = () => {
                let total = 0;
                for (let val of cartData) {
                    total += (val.price * val.count);
                }
                return total;
            }
            $scope.itemCount = () => {
                let total = 0;
                for (let val of cartData) {
                    total += val.count;
                }
                return total;
            }
        }
    }
})