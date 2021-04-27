import Banner from "../components/Banner";
import Category from "../components/Category";
import requests from "../utils/requests";
import Grid from '@material-ui/core/Grid'

const categories = [
  { title: "Now Playing", fetchUrl: requests.fetchNowPlaying },
  { title: "Popular", fetchUrl: requests.fetchPopular },
  { title: "Top Rated", fetchUrl: requests.fetchTopRated },
  { title: "Upcoming", fetchUrl: requests.fetchUpcoming },
];

const Home = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Banner fetchUrl={requests.fetchTrending} />
      <Grid container>
      {categories.map((category) => (
        <Grid item xs={12} style={{textAlign:"center",paddingLeft:"5px"}}>
          <Category
          key={category.title}
          title={category.title}
          fetchUrl={category.fetchUrl}
          />
        </Grid>
      ))}
      </Grid>
    </div>
  );
};

export default Home;
