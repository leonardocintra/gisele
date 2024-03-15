import {
  URL_API_CARDAPIO,
  URL_API_ITEM,
  URL_API_TIPO_ITEM,
  URL_API_TIPO_MARMITEX,
} from "@/constants/constants";

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/contato",
  URL_API_CARDAPIO,
  URL_API_ITEM,
  URL_API_TIPO_ITEM,
  URL_API_TIPO_MARMITEX,
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
