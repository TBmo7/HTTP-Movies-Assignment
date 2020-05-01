import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie"
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMovieList = () => {
    setTimeout(()=>{
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
    },1500)
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // const updateMovieList = movie =>{
  //   setMovieList([...movieList,movie])
  // }

  

  useEffect(() => {
    console.log("APP.JS CALL")
    getMovieList();
  }, [loading]);
  
 console.log("MOVIE LIST", movieList)
  return (
    <>
      <SavedList list={savedList} />

      <Route path ="/update-movie/:id"
        render ={props =>(
        <UpdateMovie {...props} movies = {movieList} updateItems = {setMovieList} loading = {loading} updateLoading = {setLoading}/>
        )}
        />

      <Route exact path="/"
        render = {props=>(
        <MovieList {...props} movies={movieList} />
        )}
      />

      <Route path="/movies/:id"
        render = {props=>(
        <Movie {...props} addToSavedList={addToSavedList} setLoading = {setLoading} loading = {loading} />
        )}
        />
      
    </>
  );
};

export default App;
