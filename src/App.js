import { useState } from 'react';
import './App.css';
import AlbumDetails from './AlbumDetails';
import AlbumList from './AlbumList';
import { token } from './keys.js'; // Discogs issues a temporary "personal access token" which should be kept private. "Keys.js" is not included in git repository.

export default function App() {
  const [albumResource, setAlbumResource] = useState("");

  return (
    <div className="App">
      <AlbumDetails resource={albumResource} token={token} />
      <AlbumList setAlbumResource={setAlbumResource} token={token} />
    </div>
  );
}
