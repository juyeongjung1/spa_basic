function setupRoutes() {
    window.onpopstate = function(event) {
        if (event.state) {
            switch (event.state.page) {
                case 'productDetails':
                    loadProductDetails(event.state.productId);
                    break;
                case 'productEdit':
                    navigateToProductEdit(event.state.productId);
                    break;
                case 'productDelete':
                    navigateToDeleteProduct(event.state.productId);
                    break;
                case 'productRegister':
                    navigateToRegister(false);
                    break;
                case 'productList':
                    console.log("productList")
                    loadProductList();
                    break;
                default:
                    console.log("productList")
                    loadProductList();
                    break;
                }
            }
        };
    }


// 各ページロード関数は別ファイルに定義
