/** Base URL for all backend API calls.
 *  Set VITE_API_URL in .env to point at the backend (e.g. http://localhost:3000).
 *  Falls back to '' (same origin) so the Vite proxy still works if the var is unset.
 */
export const API_BASE = `${import.meta.env.VITE_API_URL ?? ""}/api`;
