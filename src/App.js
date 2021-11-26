import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import AlbumDetails from './AlbumDetails';
import AlbumList from './AlbumList';
import { token } from './keys.js'; // Discogs issues a temporary "personal access token" which should be kept private. "Keys.js" is not included in git repository.

export default function App() {

  const [activeIndex, setActiveIndex] = useState(0);

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
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAlbum();
  }, [fetchUrl]);

  return (
    <div className="App">
      {
        data[activeIndex].resource_url
        ?
        <AlbumDetails resource={data[activeIndex].resource_url} />
        :
        ""
      }
      <AlbumList data={data} setActiveIndex={setActiveIndex} query={query} setQuery={setQuery} />
    </div>
  );
}
