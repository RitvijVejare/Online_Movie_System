import { useEffect, useState } from "react";
import { displayImage } from "../utils/requests";
import axios from "../utils/axios";
import { Grid, Typography } from "@material-ui/core";

const Banner = ({ fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }

  useEffect(() => {
    if (movies.length > 0) {
      getRandomMovie();

      const timer = setInterval(() => {
        getRandomMovie();
      }, 10 * 1000);

      return () => clearInterval(timer);
    }
  }, [movies]);

  function getRandomMovie() {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    setRandomMovie(randomMovie);
  }

  return randomMovie ? (
    <div>
      <Grid container>
        <Grid item xs={6} style={{padding:"10px"}}>
            <Typography variant="h4">{randomMovie.title || randomMovie.name}</Typography>
            <Typography>{randomMovie.overview}</Typography>
        </Grid>
        <Grid item xs={6} style={{textAlign:"center"}}>
          <img
            style={{ width: "90%", padding:"10px 0px 5px 0px" }}
            src={displayImage(randomMovie.backdrop_path)}
            alt={randomMovie.title || randomMovie.name}
          />
        </Grid>
      </Grid>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Banner;
