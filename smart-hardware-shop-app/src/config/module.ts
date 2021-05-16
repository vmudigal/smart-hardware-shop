import { Constants } from "src/app/shared/constants";

export const modules = {
    product: {
        list: 'products',
        detail: `products/${Constants.PRODUCT_ROUTE_PARAM_PRODUCT_ID}`,
        search: `products?q=${Constants.PRODUCT_ROUTE_PARAM_KEYWORD}`,
        paginatedList: `products?_page=${Constants.PRODUCT_QUERY_PARAM_PAGE_NUMBER}&_limit=${Constants.PRODUCT_QUERY_PARAM_NUMBER_OF_ENTRIES}`,
        recommendeds: 'recommendeds'
    },
    users: {
        list: 'users',
        detail: 'users/'
    },
    cart: {
        list: 'carts',
        detail: `carts/${Constants.USER_ROUTE_PARAM_USER_ID}`
    }
};