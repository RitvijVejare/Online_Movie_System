import { Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "../utils/axios";
import requests from "../utils/requests";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  input:{
    color:"white"
  }
})

const Search = () => {
  const classes = useStyles()
  const history = useHistory();
  const [query, setQuery] = useState("");

  async function fetchSearchResults() {
    if (query) {
      const response = await axios.get(requests.fetchQuery(query));
      history.push({
        pathname: "/search",
        search: `?q=${query}`,
        state: { movies: response.data.results },
      });
      setQuery("");
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchSearchResults();
        }}
      >
        <TextField
        
        variant="standard"
        type="text" 
        color="white"
        placeholder="Search" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        InputProps={{
          className : classes.input,
          endAdornment: (
              <InputAdornment >
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
          )
        }}
        />
        {/* <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> */}
        {/* <Button type="submit" style={{height:"22px",width:"22px", padding:"0px"}} variant="contained">🔍</Button> */}
      </form>
    </div>
  );
};

export default Search;
