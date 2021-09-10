import React, { useState } from "react";
import "./Home.css";
import Row from "./components/rows/Row";
import requests from "./components/requests";
import Banner from "./components/banner/Banner";
import Navbar from "./components/navbar/Navbar";
function Home({ userCheck }) {
  let [search, setSearch] = useState("");
  // let [movieList, setMovieList] = useState("");
  return (
    <div className="Home">
      <>
        <Navbar search={search} setSearch={setSearch} userCheck={userCheck} />
        {!search.length > 0 && <Banner />}
        <Row
          search={search}
          title="Recommended"
          fetchUrl={requests.fetchNetflixOriginal}
          isLargeRow
        ></Row>
        <Row
          search={search}
          title="Trending Now"
          fetchUrl={requests.fetchTrending}
        ></Row>
        <Row
          title="Top Rated"
          fetchUrl={requests.fetchTopRated}
          search={search}
        ></Row>
        <Row
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          // setMovieList={setMovieList}
          search={search}
          // movieList={movieList}
        ></Row>
        <Row
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          search={search}
        ></Row>
        <Row
          title="Comedy Movies"
          fetchUrl={requests.fethComedyMovies}
          search={search}
        ></Row>
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanticSeries}
          search={search}
        ></Row>
        <Row
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
          search={search}
        ></Row>
      </>
    </div>
  );
}

export default Home;
