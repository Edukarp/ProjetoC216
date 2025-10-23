export function getApiUrl() {
  if (typeof window === "undefined") {

    return process.env.NEXT_PUBLIC_BACKEND_URL || "http://backend:3003";
  } else {

    return process.env.NEXT_PUBLIC_BACKEND_URL_BROWSER || "http://localhost:3003";
  }
}