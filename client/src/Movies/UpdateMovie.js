import React, {useState,useEffect} from "react"
import {Link, useParams, Redirect} from 'react-router-dom'
import axios from "axios"

function UpdateMovie(props) {
    const params = useParams()
  
    const [movie, setMovie] = useState({
        director:"",
        id:"",
        metascore:"",
        stars:[],
        title:""
    });
    
    // const fetchMovie = (id) => {
    //     axios
    //       .get(`http://localhost:5000/api/movies/${id}`)
    //       .then((res) => setMovie(res.data))
    //       .catch((err) => console.log(err.response));
    //   };


    const changeHandler = (e) =>{
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        // updateData(params,movie)
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`,movie)
        .then(res=>{
                    console.log("SUCCESSFUL UPDATE", res)
                    props.updateItems(res.data)
                    props.history.push("/")
                    // props.updateLoading(true)   
                })
                .catch(err=>
                    console.log("Error Updating element", err))
               
        
    }

    // const updateData = (id,movieData)=>{
    //     axios
    //     .put(`http://localhost:5000/api/movies/${id}`,movieData)
    //     .then(res=>{
    //         console.log("SUCCESSFUL UPDATE", res)
    //         props.updateItems(res.data)
    //     })
    //     .catch(err=>
    //         console.log("Error Updating element", err))
    // }

      useEffect(() => {
        // fetchMovie(params.id);
        const selectedMovie = props.movies.find(movie=>{
            return `${movie.id}` === props.match.params.id
        })
        if(selectedMovie){
            setMovie(selectedMovie)
        }
      }, [props.movies, props.match.params.id   ]);
      //props.movies, props.match.params.id
      
    console.log("UPDATE MOVIE information", props.movies)
    return(
        <div>
            <form>
                <label>Currently in edit mode: Title  </label>  
                    <input
                    name = "title"
                    onChange = {changeHandler}
                    type = "text"
                    value = {movie.title}
                    placeholder = {movie.title}
                    />
                    <label>Director  </label>  
                    <input
                    name = "director"
                    onChange = {changeHandler}
                    type = "text"
                    value = {movie.director}
                    placeholder = {movie.director}
                    />
                    <label>Metascore  </label>  
                    <input
                    name = "metascore"
                    onChange = {changeHandler}
                    type = "number"
                    value = {movie.metascore}
                    placeholder = {movie.metascore}
                    />
                    <label>Stars  </label>  
                    <input
                    name = "stars"
                    onChange = {changeHandler}
                    type = "text"
                    value = {movie.stars}
                    placeholder = {movie.stars}
                    />

                    <button type = "submit" onClick = {handleSubmit}>Submit Edits</button>
                
                
            </form>
        </div>
    )
}
export default UpdateMovie