import Footer from '../components/footer'
import UserMenu from '../components/userMenu'
import CatalogClient from './client'



export default function CatalogPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="flex items-center justify-between px-8 py-6 bg-black border-b border-red-600">
                <h1 className="text-3xl font-bold text-red-500">MyCatalog</h1>
                <UserMenu />
            </nav>

            <CatalogClient />

            <Footer />
        </div>
    )
}