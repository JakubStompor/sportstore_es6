angular.module("sportstore")
.constant("productListActiveClass", "btn-primary")
.constant("productListPageCount", 3)
.controller("productListCtrl", ($scope, $route, $filter, productListActiveClass, productListPageCount, cart) => {
    let selectedCategory = null;

    $scope.selectedPage = 1;
    $scope.pageSize = productListPageCount;

    $scope.selectCategory = (category) => {
        selectedCategory = category;
        $scope.selectedPage = 1;
    }

    $scope.selectPage = (newPage) => {
        $scope.selectedPage = newPage;
    }

    $scope.getPageClass = (page) => {
        return $scope.selectedPage == page ? productListActiveClass : "";
    }

    $scope.filterCategory = (product) => {
        return selectedCategory == null || product.category == selectedCategory;
    }

    $scope.getCategoryClass = (category) => {
        return selectedCategory == category ? productListActiveClass : "";
    }

    $scope.addProductToCart = (product) => {
        cart.addProduct(product.id, product.name, product.price);
    }
})