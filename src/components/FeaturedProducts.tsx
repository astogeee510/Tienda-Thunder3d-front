import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartButton } from "@/components/CartButton";
import { getFeaturedProducts, type Product } from "@/services/productService";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getFeaturedProducts();
        setFeaturedProducts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "No se pudieron cargar los productos destacados");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <Badge className="mb-2">Destacados</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Productos destacados de impresión 3D
            </h2>
            <p className="text-xl text-muted-foreground">
              Impresoras 3D, filamentos y accesorios seleccionados para makers.
            </p>
          </div>
        </div>


        {!loading && !error && featuredProducts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
              >

                <div className="aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center text-sm text-muted-foreground">
                  Imagen de producto
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                    <Badge>Destacado</Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ${product.price ? product.price.toLocaleString() : "0"}
                    </span>
                    <CartButton
                      product={{
                        id: product.id || 0,
                        name: product.name,
                        price: product.price,
                        image: "/placeholder.svg",
                        category: product.category,
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;