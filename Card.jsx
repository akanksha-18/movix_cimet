/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { useState } from 'react';

const CircularProgressBar = ({ rating }) => {
    const normalizedRating = Math.min(Math.max(rating, 0), 10); 
    const percentage = (normalizedRating / 10) * 100;
    const strokeDasharray = 2 * Math.PI * 18; 
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

    return (
        <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 40 40">
                <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="4"
                />
                <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 20 20)"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-black">{normalizedRating.toFixed(1)}</span>
            </div>
        </div>
    );
};

const Card = ({ item, mediaType }) => {
    if (!item) return null; 

    const [isHovered, setIsHovered] = useState(false);

    const imageUrl = item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/500x750.png?text=No+Image';

    const linkPath = mediaType === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`;

    return (
        <Link to={linkPath}>
            <div
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl w-64"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative">
                    <img
                        className="object-cover w-full h-96 transition duration-300 ease-in-out transform hover:scale-110"
                        src={imageUrl}
                        alt={item.title || item.name}
                    />
                    {isHovered && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300">
                            <p className="text-white text-lg px-4 text-center">
                                {item.overview.length > 150
                                    ? `${item.overview.substring(0, 150)}...`
                                    : item.overview}
                            </p>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-semibold mb-1 text-gray-800 truncate">{item.title || item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                        {new Date(item.release_date || item.first_air_date).toLocaleDateString() || 'N/A'}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                        <CircularProgressBar rating={item.vote_average} />
                        <span className="text-sm font-medium text-gray-500">
                            {mediaType === 'movie' ? 'Movie' : 'TV Show'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;