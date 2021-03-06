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
              })
              .catch((error) => {
                console.log(error);
              });
        };
        fetchDetails();
    }, [resource, token]);

    return (
        <section className="album-details">
            <div className="album-details-info">
                <img src={ data.images ? data.images[0].resource_url : fallbackImage } alt="album cover" />
                <p>
                    {data.year ? `${data.year}` : "unknown"}
                    {data.country ? ` / ${data.country}` : ""}
                    {data.formats ? ` / ${data.formats[0].name}` : ""}
                </p>
                <p><a href={data.uri}>(more information)</a></p>
            </div>
            <div className="album-details-tracklist">
                <table><tbody>
                    {data.tracklist ?
                        Object.keys(data.tracklist)
                            .map((key) => (
                                <tr key={key}>
                                    <td>
                                        {data.tracklist[key].position ? data.tracklist[key].position : ""}
                                    </td>
                                    <td>
                                        {data.tracklist[key].title ? data.tracklist[key].title : ""}
                                    </td>
                                </tr>
                            ))                            
                        : <tr><td>(no data)</td></tr>
                    }
                </tbody></table>
            </div>
        </section>
    )
}