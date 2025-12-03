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

const Accesorios = () => {
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const all = await getProducts();
        const filtered = all.filter((p) => p.category === "accesorios");
        setApiProducts(filtered);
      } catch (err: any) {
        setError(err.message ?? "Error al cargar accesorios desde el backend");
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
              Accesorios y Herramientas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complementa tu setup con las mejores herramientas y accesorios, administrados
              completamente desde el panel de productos.
            </p>
          </div>

          {loading && (
            <p className="text-sm text-muted-foreground">
              Cargando accesorios desde el backend...
            </p>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          {!loading && !error && apiProducts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              Aún no hay accesorios creados desde el panel de administrador.
            </p>
          )}

          {!loading && !error && apiProducts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {apiProducts.map((product) => (
                <Card
                  key={product.id}
                  className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                >
                  <CardHeader>
                    <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center text-xs text-muted-foreground">
                      Imagen del accesorio
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-sm leading-tight">
                        {product.name}
                      </CardTitle>
                      {product.featured && (
                        <Badge
                          variant="secondary"
                          className="text-xs shrink-0"
                        >
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-xs">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-xl font-bold text-secondary">
                      ${product.price}
                    </p>
                  </CardContent>

                  <CardFooter className="flex-col gap-2">
                    <CartButton
                      product={{
                        id: product.id || 0,
                        name: product.name,
                        price: product.price,
                        image: "/placeholder.svg",
                        category: "accesorios",
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

export default Accesorios;