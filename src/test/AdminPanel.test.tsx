import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AdminPanel from "@/pages/AdminPanel";
import { AuthProvider } from "@/hooks/useAuth";

vi.mock("@/services/reviewService", () => ({
  getReviews: vi.fn().mockResolvedValue([]),
}));

vi.mock("@/services/productService", () => {
  return {
    getProducts: vi.fn().mockResolvedValue([]),
    updateProductFeatured: vi.fn().mockResolvedValue({
      id: 1,
      name: "Producto 1",
      description: "desc",
      price: 1000,
      featured: true,
    }),
    createProduct: vi.fn().mockResolvedValue({
      id: 123,
      name: "Nuevo producto test",
      description: "Descripción de prueba",
      price: 9999,
      featured: false,
    }),
  };
});

const renderAsAdmin = () => {
  const adminUser = {
    name: "admin",
    email: "admin@thunder3d.cl",
    isAuthenticated: true,
  };
  localStorage.setItem("user", JSON.stringify(adminUser));

  return render(
    <AuthProvider>
      <AdminPanel />
    </AuthProvider>
  );
};

describe("AdminPanel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra mensaje de acceso restringido si no hay usuario admin", () => {
    render(
      <AuthProvider>
        <AdminPanel />
      </AuthProvider>
    );

    expect(screen.getByText(/Acceso restringido/i)).toBeInTheDocument();
  });

  it("permite enviar el formulario para crear un producto cuando el usuario es admin", async () => {
    const { getByLabelText, getByRole, queryByText } = renderAsAdmin();

    fireEvent.change(getByLabelText(/Nombre/i), {
      target: { value: "Nuevo producto test" },
    });
    fireEvent.change(getByLabelText(/Precio \(CLP\)/i), {
      target: { value: "9999" },
    });
    fireEvent.change(getByLabelText(/Descripción/i), {
      target: { value: "Descripción de prueba" },
    });

    const submitButton = getByRole("button", { name: /Crear producto/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByLabelText(/Nombre/i)).toHaveValue("");
      expect(queryByText(/Datos incompletos/i)).toBeNull();
    });
  });
});
