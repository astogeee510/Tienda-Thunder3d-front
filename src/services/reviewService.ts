export interface Review {
  id?: number;
  name: string;
  comment: string;
  rating: number;
}

const API_BASE = "http://10.0.136.247:8080";

export async function getReviews(): Promise<Review[]> {
  const response = await fetch(`${API_BASE}/reviews`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al obtener reseñas");
  }
  return response.json();
}

export async function createReview(review: Omit<Review, "id">): Promise<Review> {
  const response = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error al crear la reseña");
  }

  return response.json();
}
