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

const Repuestos = () => {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const all = await getProducts();
        const filtered = all.filter((p) => p.category === "repuestos");
        setApiProducts(filtered);
      } catch (err: any) {
        setError(err.message ?? "Error al cargar repuestos desde el backend");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Repuestos y Componentes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para mantener y mejorar tu impresora 3D.
              Catálogo totalmente administrado desde el panel de administración.
            </p>
          </div>

          {loading && (
            <p className="text-sm text-muted-foreground">
              Cargando repuestos desde el backend...
            </p>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          {!loading && !error && apiProducts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              Aún no hay repuestos creados desde el panel del administrador.
            </p>
          )}

          {!loading && !error && apiProducts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiProducts.map((product) => (
                <Card
                  key={product.id}
                  className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center text-sm text-muted-foreground">
                      Imagen del producto
                    </div>

                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      {product.featured && (
                        <Badge variant="default">Destacado</Badge>
                      )}
                    </div>

                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-2xl font-bold text-primary">
                      ${product.price}
                    </p>
                  </CardContent>

                  <CardFooter className="flex justify-end">
                    <CartButton
                      product={{
                        id: product.id!,
                        name: product.name,
                        price: product.price,
                        image: "/placeholder.svg",
                        category: "repuestos",
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

export default Repuestos;