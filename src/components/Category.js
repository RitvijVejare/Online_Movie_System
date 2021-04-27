import { useEffect, useState } from "react";
import Movie from "./Movie";
import axios from "../utils/axios";
import { createMuiTheme, makeStyles, ThemeProvider, Typography } from "@material-ui/core";

const theme = createMuiTheme();
theme.typography.h3 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.2rem',
  },
};


const Category = ({ title, fetchUrl }) => {
  
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }

  return (
    <ThemeProvider theme={theme}>
      <section>
        <Typography variant="h3">{title}</Typography>
        {movies.length > 0 ? (
          <div style={{textAlign:"center", display: "flex", flexWrap: "wrap" }}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title || movie.name}
                poster_path={movie.poster_path}
              />
            ))}
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </section>
    </ThemeProvider>
  );
};

export default Category;
