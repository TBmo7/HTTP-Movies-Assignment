import React, {useState,useEffect} from "react"
import { useParams} from 'react-router-dom'
import axios from "axios"

const UpdateMovie = props => {
    const params = useParams()
    // let counter = 0;
    const upDate = props.movies
    useEffect(() => {
        // fetchMovie(params.id);
        // do {
        //     counter++
        // }
        // while(counter<10000)
        console.log("UPDATEMOVIE.JS IN COMPONENT MOVIE", movie)
        console.log("UPDATEMOVIE.JS CALL", props.movies)
        const selectedMovie = props.movies.find(movie=>{
            return `${movie.id}` === props.match.params.id
        })
        if(selectedMovie){
            setMovie(selectedMovie)
        }
      }, [props.movies, props.match.params.id,upDate   ]);
      //props.movies, props.match.params.id
  
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

    const submitWithSplit = input => {
         axios
        .put(`http://localhost:5000/api/movies/${movie.id}`,
        {...input,
        id:movie.id,
    stars:input.stars.split(',')})
        .then(res=>{
                    console.log("SUCCESSFUL UPDATE", res)
                    props.updateItems(res.data)
                    
                    // props.updateLoading(true)   
                })
                .catch(err=>
                    console.log("Error Updating element", err))
                    props.history.push("/")

    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        submitWithSplit(movie)
        props.updateLoading(true)
        // updateData(params,movie)
        // axios
        // .put(`http://localhost:5000/api/movies/${movie.id}`,movie)
        // .then(res=>{
        //             console.log("SUCCESSFUL UPDATE", res)
        //             props.updateItems(res.data)
        //             props.history.push("/")
        //             // props.updateLoading(true)   
        //         })
        //         .catch(err=>
                    // console.log("Error Updating element", err))
       
               
                
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