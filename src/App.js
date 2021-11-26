import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { token } from './keys.js'; // Discogs issues a temporary "personal access token" which should be kept private. "Keys.js" is not included in git repository.

export default function App() {

  const [data, setData] = useState([]);
  const title = data.title;
  const year = data.year;
  const coverImage = data.cover_image;
  const thumb = data.thumb;
  const resourceUrl = data.resource_url;

  const [query, setQuery] = useState("sgt pepper")
  const fetchUrl = `https://api.discogs.com/database/search?q=${query}`;

  const fetchAlbum = () => {
    axios
      .get(fetchUrl, {
        headers: {
          authorization: `Discogs token=${token}`,
          'User-Agent': 'bcit-kz lab3'
        },
      })
      .then((response) => {
        setData(response.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchAlbum();
  }, []); // blank array in the "dependencies" field means it only runs once, not at every render

  return (
    <div className="App">
      <p>Current query term = {query}</p>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={fetchAlbum}>Search</button>
      <hr />
      <p>{title}</p>
      <p>{year}</p>
      <p>{resourceUrl}</p>
      <img src={coverImage} />
      <img src={thumb} />
    </div>
  );
}
