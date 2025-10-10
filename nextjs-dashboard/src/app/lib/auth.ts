
export function getUserFromLocalStorage() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  const name = localStorage.getItem("userName");

  if (!token || !role) return null;

  return { token, role, name };
}
