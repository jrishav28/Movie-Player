import React, { useEffect, useState } from "react";
import requests from "../requests";
import axios from "../axios.js";
import "./banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const handleClick = () => {
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
      const request = await axios.get(requests.fetchNetflixOriginal);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          // objectFit: "",
          backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner__buttons">
            <button className="banner__button" onClick={() => handleClick()}>
              play
            </button>
            <button className="banner__button">My List</button>
          </div>

          <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className="banner__fadeBottom" />
      </header>
      {trailerUrl && (
        <YouTube className="youtube" videoId={trailerUrl} opts={opts} />
      )}
    </>
  );
}

export default Banner;
