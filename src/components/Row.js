import React, {useEffect, useState} from "react";
import '../styles/row.css'
import {tmdb} from "../api/tmdb";

const Row = ({title, fetchUrl, isLargeRow = false}) => {
    const [movies, setMovies] = useState([])

    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        (async () => {
            await tmdb.get(fetchUrl).then((req) => {
                setMovies(req.data.results)
            })
        })()
    }, [fetchUrl])

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row-posters">
                {movies?.map((movie) => (
                    ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                        <img
                            key={movie.key}
                            className={`row-poster ${isLargeRow && "row-poster-large"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    )
                ))}
            </div>
        </div>
    )
}

export default Row