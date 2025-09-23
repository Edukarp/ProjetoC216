type Movie = {
  id: number;
  title: string;
  type: string;
  genre: string[];
  year: number;
  rating: number;
  synopsis: string;
  poster: string;
};

interface MovieCarouselProps {
  title: string;
  items: Movie[];
  renderStars: (rating: number) => React.ReactNode;
}

const MovieCarousel = ({ title, items, renderStars }: MovieCarouselProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-red-500 mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-6 pb-4">
        {items.map(movie => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-56 sm:w-64 md:w-84 bg-black border border-red-600 rounded-lg overflow-hidden hover:border-white transition-colors duration-300"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-red-500 mb-2">{movie.title}</h3>
              <p className="text-white text-xs mb-1">{movie.type} • {movie.year}</p>
              <p className="text-gray-300 text-xs mb-2">{movie.genre.join(', ')}</p>
              <div className="flex items-center mb-2">
                <div className="flex mr-2">{renderStars(movie.rating)}</div>
                <span className="text-red-500 text-xs font-semibold">{movie.rating}</span>
              </div>
              <p className="text-white text-sm leading-relaxed">{movie.synopsis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;