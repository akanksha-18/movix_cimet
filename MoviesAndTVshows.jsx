import  { useEffect } from 'react';
import { fetchDataFromApi } from '../utils/api'; 

const MoviesAndTVShows = () => {
    useEffect(() => {
        const getData = async () => {
            const url = '/tv/popular'; 
            const params = { language: 'en-US', page: 1 };

            const data = await fetchDataFromApi(url, params);
            console.log('Fetched Data:', data); 
        };

        getData(); 
    }, []); 

    return (
        <div>
            <h1>Movies and TV Shows</h1>
            <p>Check the console for the fetched data.</p>
        </div>
    );
};

export default MoviesAndTVShows;
