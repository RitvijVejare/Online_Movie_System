import { Component } from "react";
import { withRouter } from "react-router-dom";
import requests, { displayImage } from "../utils/requests";
import axios from "../utils/axios";
import { Grid, Typography } from "@material-ui/core";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const movieResponse = await axios.get(
      requests.fetchDetails(this.props.match.params.id)
    );
    this.setState(Object.assign({ ...this.state, movie: movieResponse.data }));

    const trailerResponse = await axios.get(
      requests.fetchVideos(this.props.match.params.id)
    );
    this.setState({
      ...this.state,
      loading: false,
      trailer: trailerResponse.data.results[0],
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const {
      title,
      name,
      homepage,
      genres,
      overview,
      release_date,
      runtime,
      backdrop_path,
    } = this.state.movie;
    const key = this.state.trailer
    

    return (
      <section>
        <div>
          <Grid container>
            <Grid item xs={7} style={{textAlign:"center"}}>
              <img
                style={{width: "80%", padding: "5px 0px 5px 0px" }}
                src={displayImage(backdrop_path)}
                alt={title || name}
              />
            </Grid>
            <Grid item xs={5} style={{padding: "5px"}}>
              <h2>
                <a href={homepage}>{title || name}</a>
              </h2>
              <ul>
                {genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
              <p>{overview}</p>
              <div>Released: {release_date}</div>
              <div>Runtime: {runtime}</div>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container>
            <Grid item xs={3} />
            <Grid item xs={6}>
              {this.state.trailer ? (
                <iframe
                  style={{ width: "600px", height: "400px" }}
                  title={this.state.trailer.name}
                  src={`https://www.youtube.com/embed/${key.key}`}
                ></iframe>
              ) : (
                <Typography>Trailer not available</Typography>
              )}
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </div>
      </section>
    );
  }
}

export default withRouter(Details);
