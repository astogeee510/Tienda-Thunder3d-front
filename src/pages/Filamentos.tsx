import { useEffect, useState } from "react";
import { getProducts, type Product } from "@/services/productService";
import { Badge } from "@/components/ui/badge";
import { CartButton } from "@/components/CartButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Filamentos = () => {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const all = await getProducts();
        const filtered = all.filter((p) => p.category === "filamentos");
        setApiProducts(filtered);
      } catch (err: any) {
        setError(err.message ?? "Error al cargar filamentos desde el backend");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Filamentos 3D
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Amplia variedad de materiales para todos tus proyectos de impresión, administrados
            completamente desde el panel de productos.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="container mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Filamentos disponibles</h2>

          {loading && (
            <p className="text-sm text-muted-foreground">
              Cargando filamentos desde el backend...
            </p>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          {!loading && !error && apiProducts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aún no hay filamentos creados desde el panel de administrador.
            </p>
          )}

          {!loading && !error && apiProducts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apiProducts.map((product) => (
                <Card
                  key={product.id}
                  className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                >
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center text-sm text-muted-foreground">
                      Imagen de producto
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle>{product.name}</CardTitle>
                      {product.featured && <Badge variant="secondary">Destacado</Badge>}
                    </div>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">
                      ${product.price}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <CartButton
                      product={{
                        id: product.id || 0,
                        name: product.name,
                        price: product.price,
                        image: "/placeholder.svg",
                        category: "filamentos",
                      }}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Filamentos;