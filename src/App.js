import axios from 'axios';
import { useState } from 'react';
import './App.css';

// Discogs issues a temporary "personal access token" which should be kept private
// "token" is a constant stored in "keys.js", which is not included in git repository.
import { token } from './keys.js';

export default function App() {

  const [data, setData] = useState([]);
  const dump = JSON.stringify(data);
  const [query, setQuery] = useState("sgt pepper")

  const fetchUrl = `https://api.discogs.com/database/search?q=${query}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl, {
        headers: {
          authorization: `Discogs token=${token}`
        },
      })
      .then((response) => {
        setData(response.data.results[0]);
        console.log(response.data.results[0]);
      })
      .catch((error) => {
        setData(error);
      });
  }

  return (
    <div className="App">
      <p>Current query term = {query}</p>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={fetchImages}>Search</button>
      <hr />
      <p>{dump}</p>
    </div>
  );
}
