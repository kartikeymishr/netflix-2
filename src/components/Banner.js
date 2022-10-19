import '../styles/banner.css'
import {useEffect, useState} from "react";
import {tmdb} from "../api/tmdb";
import requests from "../api/Requests";

const Banner = () => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        (async function () {
            await tmdb.get(requests.fetchNetflixOriginals)
                .then((req) => {
                    setMovie(req.data.results[Math.floor(Math.random() * req.data.results.length - 1)])
                })
        })()
    }, [])

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <header
            className="banner"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}
        >
            <div className="banner-content">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner-buttons">
                    <button className="banner-button">Play</button>
                    <button className="banner-button">My List</button>
                </div>
                <h1 className="banner-description">
                    {truncate(movie?.overview, 1000)}
                </h1>
            </div>

            <div className="banner-fade-bottom"/>

        </header>
    )
}

export default Banner