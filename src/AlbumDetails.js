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
                console.log(response.data.images[0].resource_url); //this is giving a warning when the page first loads, but it's only for testing, so warning will go away when I delete it eventually
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
                    <li>track 1</li>
                    <li>track 2</li>
                </ol>
            </div>
        </section>
    )
}