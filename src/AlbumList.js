export default function AlbumList( {data, setActiveIndex, query, setQuery} ) {

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
        <button onClick={() => {setActiveIndex(key)}} key={key}>
          <img src={a.thumb} alt={a.resource_url} />
          <p>{a.title} ({a.year} / {a.country})</p>
        </button>
      ))}
    </section>
  );
}