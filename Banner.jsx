import { useEffect, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import Card from "./Card";
import Loader from "./Loader"; 

const Banner = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); 
  const { fetchByQuery, searchResults, popular } = useMovieContext();

  useEffect(() => {
    if (popular.length > 0) {
      const randomImage =
        popular[Math.floor(Math.random() * popular.length)].backdrop_path;
      setBackgroundImage(`https://image.tmdb.org/t/p/original${randomImage}`);
    }
  }, [popular]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true); 
      await fetchByQuery(searchQuery);
      setLoading(false); 
    }
  };

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.5 }}
      />
      <div className="relative z-10">
        <h1 className="text-9xl font-normal mb-2 text-white">Welcome</h1>
        <p className="text-lg font-medium mb-4 text-white">
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search for a movie or TV show..."
            className="px-20 py-4 rounded-l-full shadow-md w-96 placeholder:text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-8 py-4 text-white font-bold rounded-r-full"
            style={{
              background: 'linear-gradient(98.37deg, #f89e00 .99%, #da2f68 100%)'
            }}
          >
            Search
          </button>
        </form>
      </div>

      {loading ? ( 
        <Loader />
      ) : (
        searchResults.length > 0 && (
          <div className="w-full bg-white bg-opacity-70 p-4 rounded-lg shadow-lg mt-4">
            <h2 className="text-2xl font-bold mb-2">Search Results:</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {searchResults.map((item) => (
                <Card key={item.id} item={item} mediaType={item.media_type} /> 
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Banner;
