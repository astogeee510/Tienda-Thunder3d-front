import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { getReviews, Review } from "@/services/reviewService";
import {
  getProducts,
  Product,
  updateProductFeatured,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/services/productService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const AdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState<string>("");
  const [newProductFeatured, setNewProductFeatured] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [newProductCategory, setNewProductCategory] = useState<Product["category"]>("impresoras");

  const adminEmail = "admin@thunder3d.cl";

  useEffect(() => {
    if (user && user.email === adminEmail) {
      loadReviews();
      loadProducts();
    }
  }, [user]);

  const loadReviews = async () => {
    try {
      setLoadingReviews(true);
      const data = await getReviews();
      setReviews(data);
    } catch (error: any) {
      toast({
        title: "Error al cargar reseñas",
        description: error.message || "No se pudieron obtener las reseñas",
        variant: "destructive",
      });
    } finally {
      setLoadingReviews(false);
    }
  };

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error: any) {
      toast({
        title: "Error al cargar productos",
        description: error.message || "No se pudieron obtener los productos",
        variant: "destructive",
      });
    } finally {
      setLoadingProducts(false);
    }
  };


  const handleToggleFeatured = async (product: Product, newValue: boolean) => {
    try {
      const updated = await updateProductFeatured(product.id as number, newValue);
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, featured: updated.featured } : p))
      );
      toast({
        title: "Producto actualizado",
        description: `El producto "${updated.name}" ahora está ${
          updated.featured ? "marcado como destacado" : "como no destacado"
        }.`,
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar producto",
        description: error.message || "No se pudo actualizar el estado de destacado",
        variant: "destructive",
      });
    }
  };


  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();

    if (!newProductName.trim() || !newProductDescription.trim() || !newProductPrice.trim()) {
      toast({
        title: "Datos incompletos",
        description: "Completa todos los campos para crear un producto.",
        variant: "destructive",
      });
      return;
    }

    const priceNumber = Number(newProductPrice);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      toast({
        title: "Precio inválido",
        description: "Ingresa un precio mayor a 0.",
        variant: "destructive",
      });
      return;
    }

    try {
      setCreatingProduct(true);
      const created = await createProduct({
        name: newProductName.trim(),
        description: newProductDescription.trim(),
        price: priceNumber,
        category: newProductCategory,
        featured: newProductFeatured,
      });

      setProducts((prev) => [...prev, created]);

      setNewProductName("");
      setNewProductDescription("");
      setNewProductPrice("");
      setNewProductFeatured(false);
      setNewProductCategory("impresoras");

      toast({
        title: "Producto creado",
        description: `Se creó el producto "${created.name}" correctamente.`,
      });
    } catch (error: any) {
      toast({
        title: "Error al crear producto",
        description: error.message || "No se pudo crear el producto (verifica el token de administrador).",
        variant: "destructive",
      });
    } finally {
      setCreatingProduct(false);
    }
  };


  const handleDeleteProduct = async (id: number | undefined, name: string) => {
    if (!id) return;

    try {
      const confirmed = window.confirm(`¿Seguro que deseas eliminar el producto "${name}"?`);
      if (!confirmed) return;

      await deleteProduct(id);

      setProducts((prev) => prev.filter((p) => p.id !== id));

      toast({
        title: "Producto eliminado",
        description: `El producto "${name}" fue eliminado correctamente.`,
      });
    } catch (error: any) {
      toast({
        title: "Error al eliminar producto",
        description: error.message || "No se pudo eliminar el producto.",
        variant: "destructive",
      });
    }
  };


  const handleEditProduct = async (product: Product) => {
    const newName = window.prompt("Nuevo nombre del producto:", product.name);
    if (newName === null || !newName.trim()) {
      return;
    }

    const newDescription = window.prompt("Nueva descripción del producto:", product.description);
    if (newDescription === null || !newDescription.trim()) {
      return;
    }

    const newPriceStr = window.prompt("Nuevo precio (CLP):", String(product.price));
    if (newPriceStr === null || !newPriceStr.trim()) {
      return;
    }

    const newPrice = Number(newPriceStr);
    if (isNaN(newPrice) || newPrice <= 0) {
      toast({
        title: "Precio inválido",
        description: "Ingresa un precio mayor a 0.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updated = await updateProduct(product.id as number, {
        name: newName.trim(),
        description: newDescription.trim(),
        price: newPrice,
        category: product.category,
        featured: product.featured,
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );

      toast({
        title: "Producto actualizado",
        description: `Se actualizaron los datos del producto "${updated.name}" correctamente.`,
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar producto",
        description: error.message || "No se pudo actualizar el producto.",
        variant: "destructive",
      });
    }
  };

  if (!user || user.email !== adminEmail) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Card>
          <CardHeader>
            <CardTitle>Acceso restringido</CardTitle>
            <CardDescription>
              Esta página es solo para el administrador. Inicia sesión como administrador para continuar.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Panel de administrador</h1>
        <p className="text-muted-foreground">
          Hola, <span className="font-semibold">{user.name}</span>. Desde aquí puedes probar el flujo de reseñas,
          crear nuevos productos protegidos por JWT y marcar productos como <strong>destacados</strong> para Thunder3D.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Crear nuevo producto</CardTitle>
          <CardDescription>
            Usa este formulario para agregar productos al catálogo como administrador (requiere token JWT válido).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleCreateProduct}>
            <div className="space-y-1">
              <label htmlFor="product-name" className="text-sm font-medium">
                Nombre
              </label>
              <Input
                id="product-name"
                placeholder="Ej: Impresora 3D Ender 3"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="product-price" className="text-sm font-medium">
                Precio (CLP)
              </label>
              <Input
                id="product-price"
                type="number"
                min={1}
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="product-category" className="text-sm font-medium">
                Categoría
              </label>
              <select
                id="product-category"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value as Product["category"])}
              >
                <option value="impresoras">Impresoras 3D</option>
                <option value="filamentos">Filamentos</option>
                <option value="accesorios">Accesorios</option>
                <option value="repuestos">Repuestos</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label htmlFor="product-description" className="text-sm font-medium">
                Descripción
              </label>
              <Textarea
                id="product-description"
                placeholder="Escribe una descripción corta del producto..."
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <Switch
                id="product-featured"
                checked={newProductFeatured}
                onCheckedChange={(checked) => setNewProductFeatured(!!checked)}
              />
              <label htmlFor="product-featured" className="text-sm">
                Marcar como producto destacado
              </label>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={creatingProduct}>
                {creatingProduct ? "Creando..." : "Crear producto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Reseñas de clientes</CardTitle>
            <CardDescription>
              Lista de reseñas que se envían desde la página pública de Reseñas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total reseñas: <strong>{reviews.length}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={loadReviews} disabled={loadingReviews}>
                {loadingReviews ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
            <Separator />
            {reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Todavía no hay reseñas registradas. Prueba enviando una desde la página <strong>Reseñas</strong>.
              </p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border rounded-lg p-3 flex flex-col gap-1 bg-card/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{review.name}</span>
                      <Badge variant="secondary">⭐ {review.rating}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos destacados</CardTitle>
            <CardDescription>
              Marca qué productos se consideran <strong>destacados</strong> en la tienda y administra sus datos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Total productos: <strong>{products.length}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={loadProducts} disabled={loadingProducts}>
                {loadingProducts ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
            <Separator />
            {products.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay productos cargados. Crea algunos desde el formulario de arriba y luego márcalos como destacados.
              </p>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Destacado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="capitalize">{product.category || "Sin categoría"}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Switch
                            checked={!!product.featured}
                            onCheckedChange={(checked) => handleToggleFeatured(product, checked)}
                          />
                          {product.featured ? (
                            <Badge variant="default">Destacado</Badge>
                          ) : (
                            <Badge variant="outline">Normal</Badge>
                          )}
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;