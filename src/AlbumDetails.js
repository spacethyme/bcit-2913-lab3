export default function AlbumDetails({ resource }) {
    console.log(resource); // this is where the tracklist comes from
    return (
        <section className="album-details">
            <img src="" alt="album cover" />
            <div className="tracklist">
                <ol>
                    <li>track 1</li>
                    <li>track 2</li>
                </ol>
            </div>
        </section>
    )
}