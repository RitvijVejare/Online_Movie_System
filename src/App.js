import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Search from "./components/Search";
import { createMuiTheme, Grid, ThemeProvider, Typography } from "@material-ui/core";

const theme = createMuiTheme();
theme.typography.h4 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <header
          style={{
            height:"50px",
            backgroundColor:"#ED1C24"
          }}
        >
          {/* <h1>
            <Link to="/" style={{color:"#ffffff", textDecoration:"none"}}>Online Movie System</Link>
          </h1>
          <Search /> */}
          <div>
            <Grid container>
              <Grid item xs={6} style={{padding:"5px 5px 5px 20px"}}>
                <Link to="/" style={{color:"#ffffff", textDecoration:"none"}}>
                  <Typography variant="h4">Online Movie System</Typography>
                </Link>
              </Grid>
              <Grid item xs={3} />
              <Grid item xs={3} style={{padding:"10px", textAlign:"center"}}>
                <div>
                  <Search />
                </div>
              </Grid>
            </Grid>
          </div>
        </header>

        <Switch>
          <Route path="/movies/:id">
            <Details />
          </Route>

          <Route path="/search">
            <Results />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
