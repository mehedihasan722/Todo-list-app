/**
 * A list of public routes that do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
  "/",
  "/login",
  "/signup",
  "/product",
  "/product/[...id]",

  "/products",
  "/offers",
  "/product",
  "/api/category",
  "/api/service-area",
  "/api",
];

/**
 * A list of authentication related routes
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/user/signin",
  "/user/signup",
  "/user/forgotPassword",
];

/**
 * A list of routes that require admin access
 * @type {string}
 */

export const adminRoute: string = "/admin";

/**
 * A list of routes that require user access
 * @type {string[]}
 */

export const userRoutes: string[] = [
  "/profile",
  "/cart",
  "/checkout",
  "/orders",
  "/order/[id]",
  "/order",
];
/**
 * The prefix for the api authentication routes
 * The routes will redirect to logged in user to the /profile page
 * The routes will redirect to the /admin page if the user is an admin
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

/**
 * The default login redirect route for the user
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/";
