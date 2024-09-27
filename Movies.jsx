import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../utils/api';
import Card from '../components/Card';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Dropdown from '../components/Dropdown';
import Loader from '../components/Loader'; 
const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('popularity.desc');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); 

    const loadMoreMovies = async () => {
        setLoading(true); 
        const params = {
            page,
            sort_by: sort,
            with_genres: genre,
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetchDataFromApi(`/movie/popular?${queryString}`);

        setMovies((prev) => [...prev, ...response.results]);
        setPage((prev) => prev + 1);
        setLoading(false); 
    };

    const [isFetching] = useInfiniteScroll(loadMoreMovies);

    useEffect(() => {
        setMovies([]);
        setPage(1);
        loadMoreMovies();
    }, [genre, sort]);

    const handleGenreChange = (selectedGenre) => {
        setGenre(selectedGenre);
    };

    const handleSortChange = (selectedSort) => {
        setSort(selectedSort);
    };

    return (
        <div className="p-4">
            <Dropdown handleGenreChange={handleGenreChange} handleSortChange={handleSortChange} />

            <div className="flex flex-wrap justify-center gap-6">
                {movies.map((movie) => (
                    <Card key={movie.id} item={movie} mediaType="movie" />
                ))}
            </div>

            {loading && <Loader />} 
            {isFetching && !loading && <p className="text-center mt-4">Loading more movies...</p>}
        </div>
    );
};

export default Movies;
