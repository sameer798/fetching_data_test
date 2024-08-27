import {Button, Container, Row, Col} from 'react-bootstrap'
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

function App() {

  const [moviesState, setMoviesState] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(()=>{
    setIsLoading(true);
    fetch('https://react-http-9cccd-default-rtdb.firebaseio.com/movies.json').then(response =>{
      
      setError(null);
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
     return response.json();
    }).then(data=>{
     
      const loadedMovies = [];
      for(let key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      // const transformMoviesData = data.results.map(movieData=>{
      //   return {
      //     id : movieData.episode_id,
      //     title : movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date

      //   }
      // })
      
      setMoviesState(loadedMovies)
      setIsLoading(false)
    }).catch(error=> {
      setError(error.message)
      setIsLoading(false)
    })
  },[])

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler])


  const addMovieHandler = async (movie)=>{
  const response = await fetch('https://react-http-9cccd-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data)
    fetchMoviesHandler();
   
  }


  async function deleteHndler(id) {
     await fetch(`https://react-http-9cccd-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: 'DELETE'       
    })

    setMoviesState((prevMovies) => prevMovies.filter(movie => movie.id !== id));
  
}


let content = <p style={{color: "white", textAlign: "center"}}>Found no movies!</p>
if(moviesState.length > 0){
  content = <MoviesList movies={moviesState} onDeleteMovie={deleteHndler}/>
}

if(error){
  content = <p style={{color: "white", textAlign: "center"}}>{error}</p>
}
if(isLoading){
  content = <p style={{color: "white", textAlign: "center"}}>Loading...</p>
}



  return (
    <>
    <section>
      <AddMovie onAddMovie={addMovieHandler} />
    </section>
       <Container className='mt-5'>
        <Row className="justify-content-center">
          <Col xs='auto'>
              <Button variant='success' onClick={fetchMoviesHandler}>Fetch movies</Button>
          </Col>
        </Row>
       </Container>
       {/* {!isLoading && moviesState.length > 0 && <MoviesList movies={moviesState}/>}
       {!isLoading && moviesState.length === 0 && !error && <p style={{color: "white", textAlign: "center"}}>data not found...</p>}
       {isLoading && <p style={{color: "white", textAlign: "center"}}>Loading...</p>}
       {!isLoading && error && <p style={{color: "white", textAlign: "center"}}>{error}</p>} */}
       {content}
    </>
  );
}

export default App;
