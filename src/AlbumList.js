import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AlbumList( {setAlbumResource, token} ) {

  const [data, setData] = useState([""]);
  const [query, setQuery] = useState("sgt pepper") // default is a search for sgt pepper
  const fetchUrl = `https://api.discogs.com/database/search?q=${query}&type=release&per_page=5&page=1`; // limiting to 5 top results

  const searchImages = (e) => { // nice code stolen from week3 in class demo
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
          setAlbumResource(response.data.results[0].resource_url); // this URL has the album tracklist, gets sent back to AlbumDetails component
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAlbum();
  }, [fetchUrl, token, setAlbumResource]); // "token" and "setAlbumResource" never change, but React gives warnings if I don't include them here

  return (
    <section className="album-list">
      <label>Search Albums:</label>
      <input onKeyUp={searchImages} type="text" placeholder={query} />
      {data.map((a, key) => (
        <button onClick={() => {setAlbumResource(a.resource_url)}} key={key}>
          <img src={a.thumb} alt="album cover" />
          <p>{a.title} ({a.year} / {a.country})</p>
        </button>
      ))}
    </section>
  );
}