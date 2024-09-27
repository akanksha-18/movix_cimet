/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Card from "./Card";
import ToggleButton from "./ToggleButton";

const Carousel = ({ title, movies, view, onToggleView, toggleOptions }) => {
  // console.log(title, movies, view, onToggleView, toggleOptions,"hello");

  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const carouselRef = useRef(null);
  const cardWidth = 256 + 16;

  useEffect(() => {
    if (carouselRef.current) {
      const maxScrollPosition =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      setMaxScroll(maxScrollPosition);
    }
  }, [movies]);

  const handleScroll = (direction) => {
    const newPosition = scrollPosition + direction * cardWidth;
    setScrollPosition(Math.max(0, Math.min(newPosition, maxScroll)));
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  const ArrowButton = ({ direction, onClick, disabled }) => (
    <button
      className={`absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full focus:outline-none hover:bg-opacity-75 transition z-10 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "opacity-100 cursor-pointer"
      } ${direction === "left" ? "left-2" : "right-2"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {direction === "left" ? "❮" : "❯"}
    </button>
  );

  return (
    <section className="my-12 px-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <ToggleButton
          options={toggleOptions}
          defaultOption={view}
          onChange={onToggleView}
        />
      </div>
      <div className="relative">
        <ArrowButton
          direction="left"
          onClick={() => handleScroll(-1)}
          disabled={scrollPosition === 0}
        />
        <div className="overflow-hidden" ref={carouselRef}>
          <div
            className="flex space-x-4 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {console.log(movies, "movies")}
            {movies.map((movie) => (
              <Card
                key={movie.id}
                item={movie}
                mediaType={movie.media_type || "movie"}
              />
            ))}
          </div>
        </div>
        <ArrowButton
          direction="right"
          onClick={() => handleScroll(1)}
          disabled={scrollPosition >= maxScroll}
        />
      </div>
    </section>
  );
};

export default Carousel;
