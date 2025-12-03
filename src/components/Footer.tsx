const Footer = () => {
  return (
    <footer className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-secondary" />
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-primary/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              Thunder3D
            </h3>
            <p className="text-sm text-white/80">
              Tu tienda especializada en impresión 3D
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Productos</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Impresoras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Filamentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Repuestos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accesorios</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Soporte</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Devoluciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 text-center text-sm text-white/80">
          <p>© 2025 Thunder3D. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
