import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reviews from "@/pages/Reviews";

vi.mock("@/services/reviewService", () => {
  return {
    getReviews: vi.fn().mockResolvedValue([]),
    createReview: vi.fn().mockResolvedValue({
      id: 1,
      name: "Tester",
      comment: "Comentario de prueba",
      rating: 5,
    }),
  };
});

describe("Reviews page", () => {
  it("permite enviar una nueva reseña usando el formulario", async () => {
    render(<Reviews />);

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Tester" },
    });
    fireEvent.change(screen.getByLabelText(/Puntuación/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/Comentario/i), {
      target: { value: "Comentario de prueba" },
    });

    const submitButton = screen.getByRole("button", { name: /Enviar reseña/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Comentario de prueba/i)).toBeInTheDocument();
    });
  });
});
