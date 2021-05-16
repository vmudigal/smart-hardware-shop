export class Constants {

  // Local Storage
  public static LOGGED_IN_USER: string = 'LOGGED_IN_USER';

  // Roles
  public static ROLE_ADMIN: string = 'ADMIN';
  public static ROLE_CUSTOMER: string = 'CUSTOMER';

  // Error Messages
  static ERROR_404_MESSAGE: string = "The page you are looking for doesn't exist!";

  // App Routes
  static ROUTE_HOME: string = '';
  static ROUTE_LOGIN: string = 'login';
  static ROUTE_ERROR: string = 'error/:errorCode';

  // Navigate path
  static NAVIGATE_ERROR: string = '/error';
  static NAVIGATE_PRODUCT: string = '/product';

  // Product Routes
  static ROUTE_PRODUCT: string = 'product';
  static ROUTE_PRODUCT_ADD: string = 'add';
  static ROUTE_PRODUCT_EDIT: string = ':productId/edit';
  static ROUTE_PRODUCT_DETAIL: string = ':productId';
  static ROUTE_PRODUCT_RECOMMENDED: string = 'recommendeds';

  // User Routes
  static ROUTE_USER: string = 'user';
  static ROUTE_USER_CART: string = 'cart';

  // Product actions
  static PRODUCT_ACTION_DELETE: string = 'Product Deleted';
  static PRODUCT_ACTION_ERROR: string = 'Error, Try again!';
  static PRODUCT_ACTION_CREATE: string = 'Product Created';
  static PRODUCT_ACTION_UPDATE: string = 'Product Updated';
  
  // Cart actions
  static CART_ACTION_ADD: string = 'Added';
  static CART_ACTION_REMOVE: string = 'Removed';

  // Product route params
  static PRODUCT_ROUTE_PARAM_PRODUCT_ID: string = '${product_id}';
  static PRODUCT_ROUTE_PARAM_KEYWORD: string = '${keyword}';
  static PRODUCT_QUERY_PARAM_PAGE_NUMBER: string = '${page_number}';
  static PRODUCT_QUERY_PARAM_NUMBER_OF_ENTRIES: string = '${number_of_entries}';

  static USER_ROUTE_PARAM_USER_ID: string = '${user_id}';
  

}
