export const getToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getTokenExpiry = (): number | null => {
  const token = getToken();

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const expiry = getTokenExpiry();

  if (!expiry) return true;

  return Date.now() >= expiry;
};

export const logout = () => {
  localStorage.removeItem("access_token");

  window.location.href = "/login";
};