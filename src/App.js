import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import AlbumList from './AlbumList';
import { token } from './keys.js'; // Discogs issues a temporary "personal access token" which should be kept private. "Keys.js" is not included in git repository.

export default function App() {

  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState("sgt pepper")
  const fetchUrl = `https://api.discogs.com/database/search?q=${query}&type=release&per_page=5&page=1`;

  const searchImages = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  };

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
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAlbum();
  }, [fetchUrl]);

  return (
    <div className="App">
      <input onKeyUp={searchImages} type="text" placeholder={query} />
      <hr />
      <p>Active Index = {activeIndex}</p>
      <AlbumList data={data} setActiveIndex={setActiveIndex} />
    </div>
  );
}
