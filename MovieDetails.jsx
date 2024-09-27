import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchDataFromApi(`/movie/${id}`);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    getMovieDetails();
  }, [id]);

  if (!movieDetails) return <div>Loading...</div>;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

  return (
    <div className="flex flex-col md:flex-row p-6 max-w-5xl mx-auto my-10  rounded-lg shadow-xl transition-transform transform hover:scale-105">
      <img
        src={imageUrl}
        alt={movieDetails.title}
        className="w-full md:w-1/2 h-auto rounded-l-lg object-cover"
      />
      <div className="p-6 flex-1 text-white">
        <h1 className="text-6xl font-bold mb-4">{movieDetails.title}</h1>
        <p className="text-xl mb-6">
          <strong>Description:</strong> {movieDetails.overview}
        </p>
        <p className="text-xl mb-4">
          <strong>Genres:</strong>{" "}
          {movieDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-xl mb-4">
          <strong>Language:</strong> {movieDetails.original_language}
        </p>
        <p className="text-xl mb-4">
          <strong>Rating:</strong> {movieDetails.vote_average} / 10
        </p>
        <p className="text-xl">
          <strong>Release Date:</strong> {movieDetails.release_date}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
