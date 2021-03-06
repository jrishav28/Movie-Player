import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import "./row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row(props) {
  let { title, fetchUrl, isLargeRow, search } = props;

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_URL = "http://image.tmdb.org/t/p/original/";

  const handleClick = (movie) => {
    if (trailerUrl) {
      //if already true then close
      setTrailerUrl("");
    } else {
      // movieTrailor inbuilt in youtube react //retruns promise
      if (!movie.name) movie.name = movie.title;
      // console.log(movie);
      if (movie.name) {
        movieTrailer(movie?.name || movie?.title || "")
          .then((url) => {
            // https://www.youtube.com/watch?v=EzSzSwbWRJc
            if (!url) setTrailerUrl("GV3HUDMQ-F8");
            const urlParams = new URLSearchParams(new URL(url)?.search); //gives the last id part
            console.log("f", urlParams);
            console.log(urlParams.get("v"));
            setTrailerUrl(
              `${urlParams.get("v") ? urlParams.get("v") : "GV3HUDMQ-F8"}`
            ); //gives only id
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); //appends ..basically doing this ->http://api.themoviedb.org/3/discover/tv?
      setMovies(request.data.results);
      // setMovieList([...movieList, request.data.results]);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //need to write fetchURl uunder [].. cux used inside

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={`${search.length > 0 ? "s_row" : "row"}`}>
      <h2
        className="title"
        style={{
          display:
            search.length > 0 && title !== "Recommended" ? "none" : "block",
        }}
      >
        {`${!search.length > 0 ? title : "search results..."}`}
      </h2>
      <div
        className={`${search.length > 0 ? "s_row__posters" : "row__posters"}`}
      >
        {movies
          .filter((s) => {
            if (search === "") return s;
            else if (
              s?.name?.toLowerCase().includes(search) ||
              s?.title?.toLowerCase().includes(search)
            )
              return s;
          })
          .map((movie) => (
            <img
              onClick={() => handleClick(movie)}
              key={movie.id}
              className={`${
                search.length > 0 ? "s_row__poster" : "row__poster"
              } ${
                isLargeRow && search.length === 0 ? "row__posterLarge" : ""
              } `}
              //prettier-ignore
              src={isLargeRow?`${base_URL}${movie?.poster_path }`:`${base_URL}${movie?.backdrop_path || "G3vrVlsqsNPSYvyoG2lTRxVGom.jpg"}`
            }
              alt={movie.name}
            />
          ))}
      </div>
      {trailerUrl && (
        <YouTube className="youtube" videoId={trailerUrl} opts={opts} />
      )}
      {/* <YouTube videoId="EzSzSwbWRJc" opts={opts} /> */}
    </div>
  );
}
// console.table(movies);
export default Row;
