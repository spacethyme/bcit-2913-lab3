export default function AlbumList( {data, setActiveIndex} ) {
    return (
      <section className="album-list">
        <h2>Results:</h2>
        {data.map((a, key) => (
          <button onClick={() => {setActiveIndex(key)}} key={key}>
            <img src={a.thumb} alt={a.resource_url} />
            <p>{a.title} ({a.year} / {a.country})</p>
          </button>
        ))}
      </section>
    );
}