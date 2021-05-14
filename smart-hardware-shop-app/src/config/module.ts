export const modules = {
    product: {
        list: 'products',
        detail: 'products/${product_id}',
        search: 'products?q=${keyword}',
        paginatedList: 'products?_page=${page_number}&_limit=${number_of_entries}',
        recommended: 'recommendeds'
    },
    users: {
        list: 'users',
        detail: 'users/${user_id}'
    },
    cart: {
        list: 'carts',
        detail: 'carts/${user_id}'
    }
};