import React, { useEffect } from 'react';
import { useMovieStore } from '../store/movieStore';
import MovieCard from '../components/MovieCard';
import { Loader2 } from 'lucide-react';

const Latest: React.FC = () => {
  const { movies, loading, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Sort movies by release date
  const sortedMovies = [...movies].sort((a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date);
    const dateB = new Date(b.release_date || b.first_air_date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest Releases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name}
            posterPath={movie.poster_path}
            overview={movie.overview}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default Latest;