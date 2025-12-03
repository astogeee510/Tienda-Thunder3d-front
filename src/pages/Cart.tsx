import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const purchase = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
      total: getCartTotal(),
    };

    const history = localStorage.getItem('purchaseHistory');
    const purchaseHistory = history ? JSON.parse(history) : [];
    purchaseHistory.unshift(purchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    clearCart();
    navigate('/checkout-success');
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Carrito vaciado",
      description: "Todos los productos han sido eliminados",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
<div className="flex-1 container mx-auto px-4 py-24">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8">
              Agrega productos para comenzar tu compra
            </p>
            <Link to="/">
              <Button>Explorar Productos</Button>
            </Link>
          </div>
        </div>
</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
<div className="flex-1 container mx-auto px-4 py-24">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Carrito de Compras
          </h1>
          <Button variant="outline" onClick={handleClearCart}>
            Vaciar Carrito
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.category}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 capitalize">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeFromCart(item.id);
                            toast({
                              title: "Producto eliminado",
                              description: `${item.name} ha sido eliminado del carrito`,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toLocaleString()} c/u
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Resumen</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      ${getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-medium">Por calcular</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${getCartTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceder al Pago
                </Button>
                <Link to="/">
                  <Button variant="outline" className="w-full mt-4">
                    Seguir Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
</div>
  );
};

export default Cart;