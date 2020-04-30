import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import {createBrowserHistory} from 'history'


function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history =createBrowserHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
      // setLoading(true)
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const clickHandler = e => {
    e.preventDefault()
    deleteMovie(params.id)
  }

const deleteMovie = (id) =>{
  
  axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res=>{
      console.log("DELETE SUCCESS", res)
      history.push("/")
    })
    .catch(err=>{
      console.log("DELETE ERROR", err)
    })
}

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  console.log("MOVIE INFO", movie)
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <button>Edit Movie</button>
      </Link>
      <button onClick = {clickHandler}>Delete this</button>
      
    </div>
  );
}

export default Movie;
