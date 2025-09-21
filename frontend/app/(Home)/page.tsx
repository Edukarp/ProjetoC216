import { Search, Film, Star, Smartphone, Info, Heart, Globe } from 'lucide-react'
import Footer from '../components/footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-6 leading-tight">
            Seu Catálogo Definitivo de Filmes e Séries
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
            Descubra uma vasta coleção atualizada e navegue com facilidade
          </p>
          <Link href="/register">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 transform hover:scale-105">
              Explore agora
            </button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-red-500 text-center mb-16">
            Por que escolher nosso catálogo?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Navegação simples e intuitiva</h3>
                <p className="text-gray-300">Interface pensada para facilitar sua busca e descoberta de conteúdo</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Film className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Variedade enorme de títulos para todos os gostos</h3>
                <p className="text-gray-300">Desde clássicos até lançamentos, encontre exatamente o que procura</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Atualizações frequentes para você não perder nada</h3>
                <p className="text-gray-300">Sempre em dia com os últimos lançamentos e novidades do cinema</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Interface moderna e atraente para uma experiência única</h3>
                <p className="text-gray-300">Design pensado para proporcionar a melhor experiência visual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black border-2 border-red-500/30 rounded-lg p-6 text-center hover:border-red-500 transition-colors duration-300">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Detalhes completos de filmes e séries</h3>
              <p className="text-gray-400">Informações detalhadas sobre elenco, sinopse, avaliações e muito mais</p>
            </div>

            <div className="bg-black border-2 border-red-500/30 rounded-lg p-6 text-center hover:border-red-500 transition-colors duration-300">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Recomendação personalizada</h3>
              <p className="text-gray-400">Sugestões baseadas no seu gosto e histórico de visualização</p>
            </div>

            <div className="bg-black border-2 border-red-500/30 rounded-lg p-6 text-center hover:border-red-500 transition-colors duration-300">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Compatível com todos os dispositivos</h3>
              <p className="text-gray-400">Acesse de qualquer lugar, em qualquer dispositivo, a qualquer hora</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}