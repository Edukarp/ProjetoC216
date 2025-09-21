'use client'

import { useState } from 'react'
import Footer from '../components/footer'

export default function LoginRegisterPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (activeTab === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setMessage('As senhas não coincidem.')
        return
      }
      try {
        const res = await fetch('http://localhost:3003/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        })
        const data = await res.json()
        if (res.ok) {
          setMessage('Cadastro realizado com sucesso!')
          setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        } else {
          setMessage(data.message || 'Erro ao cadastrar.')
        }
      } catch (error) {
        setMessage(`Erro de conexão com o servidor.`)
        console.log(error);
      }
    } else {
      // TODO: Lógica de login 
      setMessage('Login não implementado ainda.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">


      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-red-900/20 via-transparent to-red-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,0,0,0.1)_0%,transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,0,0.05)_0%,transparent_50%)]"></div>
      </div>

      <div className="relative z-10">

        <section className="text-center py-16 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-red-500 mb-6 tracking-tight">
            Bem-vindo ao MyCatalog
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Faça login ou registre-se para acessar o melhor catálogo de filmes e séries
          </p>
        </section>


        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">

            <div className="flex justify-center mb-8">
              <div className="bg-gray-800 rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${activeTab === 'login'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`px-8 py-3 rounded-md font-semibold transition-all duration-300 ${activeTab === 'register'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  Registrar
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              {activeTab === 'register' && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                    required
                  />
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Digite seu email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                  required
                />
              </div>

              {activeTab === 'register' && (
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirme sua senha"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-600/20 transition-all duration-300"
                    required
                  />
                </div>
              )}

              {activeTab === 'login' && (
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-red-500 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">Lembrar-me</span>
                  </label>
                </div>
              )}
              {message && (
                <div className="mb-4 text-center text-red-400 font-semibold">{message}</div>
              )}
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {activeTab === 'login' ? 'Entrar' : 'Registrar'}
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}