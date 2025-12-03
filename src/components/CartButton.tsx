import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CartButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: 'impresoras' | 'filamentos' | 'repuestos' | 'accesorios';
  };
}

export const CartButton = ({ product }: CartButtonProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} ha sido agregado al carrito`,
    });
  };

  return (
    <Button onClick={handleAddToCart} className="w-full group">
      <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
      Agregar al Carrito
    </Button>
  );
};
