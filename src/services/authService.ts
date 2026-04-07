

const API_BASE = "http://44.206.222.168";

export interface AuthResponse {
  token: string;
  email: string;
  role: string; 
}


export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al iniciar sesión en el backend");
  }

  return response.json();
}


export async function registerRequest(name: string, email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al registrar usuario en el backend");
  }

  return response.json();
}


export async function adminLogin(email: string, password: string): Promise<AuthResponse> {
  const auth = await loginRequest(email, password);

  if (auth.role !== "ADMIN") {
    throw new Error("El usuario autenticado no tiene rol ADMIN");
  }

  localStorage.setItem("adminToken", auth.token);
  localStorage.setItem("adminEmail", auth.email);
  localStorage.setItem("adminRole", auth.role);

  return auth;
}


export async function userLogin(email: string, password: string): Promise<AuthResponse> {
  return loginRequest(email, password);
}


export async function userRegister(name: string, email: string, password: string): Promise<AuthResponse> {
  return registerRequest(name, email, password);
}


export function adminLogout() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminEmail");
  localStorage.removeItem("adminRole");
}


export function getAdminToken(): string | null {
  return localStorage.getItem("adminToken");
}
