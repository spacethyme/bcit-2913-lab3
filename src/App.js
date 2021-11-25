import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { token } from './keys.js'; // Discogs issues a temporary "personal access token" which should be kept private. "Keys.js" is not included in git repository.

export default function App() {

  const [data, setData] = useState([]);
  const dump = JSON.stringify(data);
  const [query, setQuery] = useState("sgt pepper")

  const fetchUrl = `https://api.discogs.com/database/search?q=${query}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl, {
        headers: {
          authorization: `Discogs token=${token}`,
          'User-Agent': 'bcit-kz lab3'
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

  useEffect(() => {
    fetchImages();
  }, []); // blank array in the "dependencies" field means it only runs once, not at every render

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
