import Footer from '../components/footer'
import MovieCarousel from './components/carousel'
import UserMenu from '../components/userMenu'

export default function CatalogPage() {

    const movies = [
        {
            id: 1,
            title: "Parasita",
            type: "Filme",
            genre: ["Drama", "Thriller"],
            year: 2019,
            rating: 4.8,
            synopsis: "Uma família pobre se infiltra na vida de uma família rica através de uma série de mentiras.",
            poster: "https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=300&h=450&fit=crop"
        },
        {
            id: 2,
            title: "Breaking Bad",
            type: "Série",
            genre: ["Drama", "Crime"],
            year: 2008,
            rating: 4.9,
            synopsis: "Um professor de química se torna fabricante de metanfetamina após descobrir que tem câncer.",
            poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop"
        },
        {
            id: 3,
            title: "Interestelar",
            type: "Filme",
            genre: ["Ficção Científica", "Drama"],
            year: 2014,
            rating: 4.7,
            synopsis: "Em um futuro próximo, exploradores espaciais buscam um novo lar para a humanidade.",
            poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop"
        },
        {
            id: 4,
            title: "Stranger Things",
            type: "Série",
            genre: ["Ficção Científica", "Horror"],
            year: 2016,
            rating: 4.6,
            synopsis: "Crianças em uma pequena cidade enfrentam criaturas sobrenaturais de uma dimensão paralela.",
            poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop"
        },
        {
            id: 5,
            title: "Coringa",
            type: "Filme",
            genre: ["Drama", "Crime"],
            year: 2019,
            rating: 4.4,
            synopsis: "A origem sombria do icônico vilão do Batman em uma Gotham City decadente.",
            poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop"
        },
        {
            id: 6,
            title: "The Crown",
            type: "Série",
            genre: ["Drama", "História"],
            year: 2016,
            rating: 4.5,
            synopsis: "A vida da Rainha Elizabeth II e os eventos políticos que moldaram o século XX.",
            poster: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=450&fit=crop"
        },
        {
            id: 7,
            title: "Duna",
            type: "Filme",
            genre: ["Ficção Científica", "Aventura"],
            year: 2021,
            rating: 4.3,
            synopsis: "Paul Atreides lidera uma rebelião para libertar seu mundo do controle de uma casa nobre corrupta.",
            poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop"
        },
        {
            id: 8,
            title: "Dark",
            type: "Série",
            genre: ["Ficção Científica", "Mistério"],
            year: 2017,
            rating: 4.8,
            synopsis: "Quatro famílias em uma pequena cidade alemã descobrem segredos que envolvem viagem no tempo.",
            poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop"
        },
        {
            id: 9,
            title: "Coringa: Delírio a Dois",
            type: "Filme",
            genre: ["Drama", "Crime"],
            year: 2024,
            rating: 2.3,
            synopsis: "A continuação sombria do icônico vilão do Batman e sua companheira Arlequina.",
            poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop"
        }
    ]

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-red-500">★</span>)
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="text-red-500">☆</span>)
        }

        return stars
    }

    const bestRated = movies.filter(movie => movie.rating >= 4.7);
    const recommended = movies.filter(movie => movie.rating >= 4.5 && movie.rating < 4.7);
    const others = movies.filter(movie => movie.rating < 4.5);

    return (
        <div className="min-h-screen bg-black text-white">


            <nav className="flex items-center justify-between px-8 py-6 bg-black border-b border-red-600">
                <h1 className="text-3xl font-bold text-red-500">MyCatalog</h1>
                <UserMenu />
            </nav>

            <section className="py-8 px-4 border-t border-red-600">
                <MovieCarousel title="Recomendados" items={recommended} renderStars={renderStars} />
                <MovieCarousel title="Melhores avaliados" items={bestRated} renderStars={renderStars} />
                <MovieCarousel title="Outros títulos" items={others} renderStars={renderStars} />
            </section>

            <Footer />
        </div>
    )
}