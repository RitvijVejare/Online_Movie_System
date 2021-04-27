import { createMuiTheme, ThemeProvider, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { displayImage } from "../utils/requests";
const theme = createMuiTheme();
theme.typography.h5 = {
  fontSize: '1.0rem',
  '@media (min-width:600px)': {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.7rem',
  },
};

const Movie = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Link to={`/movies/${props.id}`} style={{ padding:"10px" , textDecoration:"none", textAlign:"center", width: 250, margin: "0 auto" }}>
        <img
          style={{ width: "250px", height:"375px", objectFit: "contain" }}
          src={displayImage(props.poster_path)}
          alt={props.title}
        />
        <Typography variant="h5" noWrap="true" style={{color:"#000"}}>{props.title}</Typography>
      </Link>
    </ThemeProvider>
  );
};

export default Movie;
