
export type ProductCategory = "impresoras" | "filamentos" | "repuestos" | "accesorios";

export interface Product {
  id?: number;        
  name: string;       
  description: string;
  price: number;      
  category: ProductCategory;
  featured?: boolean; 
}


const API_BASE = "http://localhost:8080";

import { getAdminToken } from "./authService";


export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al obtener productos desde el backend");
  }

  return response.json();
}


export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products/featured`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al obtener productos destacados");
  }
  return response.json();
}


export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("No hay un administrador autenticado. Inicia sesión para poder crear productos.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json", 
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers,
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al crear el producto");
  }

  return response.json();
}


export async function updateProductFeatured(id: number, featured: boolean): Promise<Product> {
  const token = getAdminToken();
  if (!token) {
    throw new Error("No hay un administrador autenticado. Inicia sesión para modificar productos destacados.");
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_BASE}/products/${id}/featured?featured=${featured}`, {
    method: "PUT",
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al actualizar el estado destacado del producto");
  }

  return response.json();
}


export async function updateProduct(
  id: number,
  data: Omit<Product, "id">
): Promise<Product> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("No hay un administrador autenticado. Inicia sesión para poder actualizar productos.");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al actualizar el producto");
  }

  return response.json();
}



export async function deleteProduct(id: number): Promise<void> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("No hay un administrador autenticado. Inicia sesión para poder eliminar productos.");
  }

  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al eliminar el producto");
  }
}