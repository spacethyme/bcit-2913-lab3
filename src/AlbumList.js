export default function AlbumList( {data, setAlbumResource, query, setQuery} ) {

  const searchImages = (e) => {
    if (e.key === "Enter") {
      setQuery(e.target.value);
    }
  };

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