import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-3d-printer.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Impresión 3D
                <span className="block text-primary">de Alta Calidad</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-xl">
                Descubre nuestra selección de impresoras 3D, filamentos y accesorios. 
                Todo lo que necesitas para materializar tus ideas.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/impresoras">
                <Button size="lg" className="group">
                  Explorar Productos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/impresoras">
                <Button size="lg" variant="outline">
                  Ver Catálogo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="Impresora 3D moderna" 
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
