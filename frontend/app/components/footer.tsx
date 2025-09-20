const Footer = () => {
    return ( 
        <footer className="py-12 px-4 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-4 text-center">MyCatalog</h3>
              <p className="text-gray-400 text-center">Seu destino definitivo para descobrir filmes e séries incríveis.</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 MyCatalog. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
     );
}
 
export default Footer;