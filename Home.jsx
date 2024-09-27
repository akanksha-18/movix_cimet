
import { useMovieContext } from '../context/MovieContext';
import Carousel from '../components/Carousel';
import { useState } from 'react';

const Home = () => {
    const { trending, popular, topRated } = useMovieContext();
    const [viewTrending, setViewTrending] = useState('Day');
    const [viewPopular, setViewPopular] = useState('movie');
    const [viewTopRated, setViewTopRated] = useState('movie');

  const filteredTrending = viewTrending === 'Day' 
    ? popular.slice(0, 10) 
    : popular.slice(10, 20); 

    const filteredPopular = viewPopular === 'tv'
    ? trending.slice(0, 10) 
    : trending.slice(10, 20); 

    const filteredTopRated = viewTopRated === 'movie'
    ? topRated.slice(0, 10) 
    : topRated.slice(10, 20); 

    return (
        <div className='px-32'>
            {filteredTrending.length > 0 && (
                <Carousel
                    title="Trending"
                    movies={filteredTrending}
                    view={viewTrending}
                    onToggleView={setViewTrending}
                    toggleOptions={['Day', 'Week']}
                />
            )}
            {filteredPopular.length > 0 && (
                <Carousel
                    title="Most Popular"
                    movies={filteredPopular}
                    view={viewPopular}
                    onToggleView={setViewPopular}
                    toggleOptions={['movie', 'tv']}
                />
            )}
            {filteredTopRated.length > 0 && (
                <Carousel
                    title="Top Rated"
                    movies={filteredTopRated}
                    view={viewTopRated}
                    onToggleView={setViewTopRated}
                    toggleOptions={['movie', 'tv']}
                />
            )}
        </div>
    );
};

export default Home;