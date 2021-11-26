import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AlbumDetails({ resource, token }) {

    const fallbackImage = "https://via.placeholder.com/300/222222/000000?text=placeholder.com";
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDetails = () => {
            axios
              .get(resource, {
                headers: {
                    authorization: `Discogs token=${token}`,
                    'User-Agent': 'bcit-kz lab3'
                  },
              })
              .then((response) => {
                setData(response.data);
                console.log(response.data.tracklist); // cover works, on to tracklist
                console.log(Object.keys(response.data.tracklist));
              })
              .catch((error) => {
                console.log(error);
              });
        };
        fetchDetails();
    }, [resource, token]);

    return (
        <section className="album-details">
            <img src={ data.images ? data.images[0].resource_url : fallbackImage } alt="album cover" />
            <div className="tracklist">
                <ol>
                    {
                        data.tracklist ?
                        Object.keys(data.tracklist)
                            .map((key) => (
                                <li key={key} value={data.tracklist[key].position}>{data.tracklist[key].title}</li>
                            ))
                        : ""
                    }
                </ol>
            </div>
        </section>
    )
}