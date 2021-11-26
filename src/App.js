import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import AlbumDetails from './AlbumDetails';
import AlbumList from './AlbumList';
import { token } from './keys.js'; // Discogs issues a temporary "personal access token" which should be kept private. "Keys.js" is not included in git repository.

export default function App() {

  const [albumResource, setAlbumResource] = useState("https://api.discogs.com/releases/249504"); // default, for when one isn't loaded

  const [data, setData] = useState([""]);
  const [query, setQuery] = useState("sgt pepper")
  const fetchUrl = `https://api.discogs.com/database/search?q=${query}&type=release&per_page=5&page=1`;

  useEffect(() => {
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
          setAlbumResource(response.data.results[0].resource_url);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAlbum();
  }, [fetchUrl]);

  return (
    <div className="App">
      <AlbumDetails resource={albumResource} />
      <AlbumList data={data} setAlbumResource={setAlbumResource} query={query} setQuery={setQuery} />
    </div>
  );
}
