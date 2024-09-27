/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchDataFromApi } from '../utils/api';

const Dropdown = ({ handleGenreChange, handleSortChange }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const genreResponse = await fetchDataFromApi('/genre/movie/list');
            setGenres(genreResponse.genres);
        };
        fetchGenres();
    }, []);

    return (
        <div className="flex justify-between mb-4 space-x-4">
            <div className="flex items-center">
                <label htmlFor="genre" className="mr-2 font-semibold text-white">Genre:</label>
                <select
                    id="genre"
                    onChange={(e) => handleGenreChange(e.target.value)}
                    className="p-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 font-semibold text-white">Sort By:</label>
                <select
                    id="sort"
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="p-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                >
                    <option value="popularity.desc">Most Popular</option>
                    <option value="popularity.asc">Least Popular</option>
                    <option value="vote_average.desc">Highest Rated</option>
                    <option value="vote_average.asc">Lowest Rated</option>
                </select>
            </div>
        </div>
    );
};

export default Dropdown;