import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { token } from './keys.js'; // Discogs issues a temporary "personal access token" which should be kept private. "Keys.js" is not included in git repository.

function ShowAlbumSummary({ album }) {
  return (
    <>
      <img src={album.thumb} alt="album cover" />
      <p>{album.title} ({album.year} / {album.country})</p>
      <p>{album.resource_url}</p>
    </>
  );
}

export default function App() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("sgt pepper")
  const fetchUrl = `https://api.discogs.com/database/search?q=${query}&type=release&per_page=5&page=1`;

  const fetchAlbum = () => {
    axios
      .get(fetchUrl, {
        headers: {
          authorization: `Discogs token=${token}`,
          'User-Agent': 'bcit-kz lab3'
        },
      })
      .then((response) => {
        setData(response.data.results);
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
      <div className="album-list">
        {data.map((data, key) => (
          <ShowAlbumSummary album={data} key={key} />
        ))}
      </div>
    </div>
  );
}
