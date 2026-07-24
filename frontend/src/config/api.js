const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");

export function apiUrl(path) {
  if (import.meta.env.PROD && !configuredApiUrl) {
    throw new Error(
      "The backend API URL is not configured. Add VITE_API_URL and redeploy the frontend.",
    );
  }

  return `${configuredApiUrl || ""}${path}`;
}

