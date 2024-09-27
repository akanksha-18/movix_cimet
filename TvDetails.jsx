import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";

const TvShowsDetails = () => {
  const { id } = useParams();
  const [TvDetails, setTvDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchDataFromApi(`/tv/${id}`);
        console.log("TV", data);

        setTvDetails(data);
      } catch (error) {
        console.error("Error fetching tv details:", error);
      }
    };
    getMovieDetails();
  }, [id]);

  if (!TvDetails) return <div>Loading...</div>;

  const imageUrl = `https://image.tmdb.org/t/p/w500${TvDetails.poster_path}`;

  return (
    <div className="flex flex-col md:flex-row p-6 max-w-5xl mx-auto my-10  rounded-lg shadow-xl transition-transform transform hover:scale-105">
    <img
        src={imageUrl}
        alt={TvDetails.title}
        className="w-full md:w-1/2 h-auto rounded-lg object-cover shadow-md transition-shadow duration-300 hover:shadow-xl"
    />
    <div className="p-6 flex-1 text-white">
        <h1 className="text-6xl font-bold mb-4">{TvDetails.title}</h1> 
        <p className="text-xl mb-6"> 
            <strong>Description:</strong> {TvDetails.overview}
        </p>
        <p className="text-xl mb-4"> 
            <strong>Genres:</strong>{" "}
            <span className="text-gray-300">{TvDetails.genres.map((genre) => genre.name).join(", ")}</span>
        </p>
        <p className="text-xl mb-4"> 
            <strong>Language:</strong> <span className="text-gray-300">{TvDetails.original_language}</span>
        </p>
        <p className="text-xl mb-4"> 
            <strong>Rating:</strong> <span className="text-yellow-500">{TvDetails.vote_average} / 10</span>
        </p>
        <p className="text-xl"> 
            <strong>Release Date:</strong> <span className="text-gray-300">{TvDetails.first_air_date}</span>
        </p>
    </div>
</div>

  );
};

export default TvShowsDetails;
