import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
<div className="flex-1 container mx-auto px-4 py-24 flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-12 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ¡Gracias por tu compra!
              </h1>
              <p className="text-xl text-muted-foreground">
                Tu pedido ha sido procesado exitosamente
              </p>
              <p className="text-muted-foreground">
                Recibirás un correo con los detalles de tu compra y el seguimiento del envío.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
              <Link to="/impresoras">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
</div>
  );
};

export default CheckoutSuccess;