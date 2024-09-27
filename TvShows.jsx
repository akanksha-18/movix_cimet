import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../utils/api';
import Card from '../components/Card';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import Dropdown from '../components/Dropdown';
import Loader from '../components/Loader';

const TVShows = () => {
    const [tvShows, setTvShows] = useState([]);
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('popularity.desc');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadMoreTVShows = async () => {
        setLoading(true);
        const params = {
            page,
            sort_by: sort,
            with_genres: genre,
        };
        const response = await fetchDataFromApi('/discover/tv', params);
        console.log("TV shows",response);
        
        setTvShows((prev) => [...prev, ...response.results]);
        setPage((prev) => prev + 1);
    };

    const [isFetching] = useInfiniteScroll(loadMoreTVShows);

    useEffect(() => {
        loadMoreTVShows(); 
    }, [genre, sort]);

    const handleGenreChange = (selectedGenre) => {
        setGenre(selectedGenre);
        setTvShows([]);
        setPage(1);
    };

    const handleSortChange = (selectedSort) => {
        setSort(selectedSort);
        setTvShows([]);
        setPage(1);
    };

    return (
        <div className="p-4">
            <Dropdown handleGenreChange={handleGenreChange} handleSortChange={handleSortChange} />
            <div className="flex flex-wrap justify-center gap-6">

                {tvShows.map((tvShow) => (
                    // <Card key={tvShow.id} movie={tvShow} />
                    <Card key={tvShow.id} item={tvShow} mediaType="tv" />
                ))}
            </div>
            {loading && <Loader />} 
            {isFetching && <p className="text-center mt-4">Loading more TV shows...</p>}
        </div>
    );
};

export default TVShows;

