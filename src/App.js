import {Button, Container, Row, Col} from 'react-bootstrap'
import { useState } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';

function App() {

  const [moviesState, setMoviesState] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = ()=>{
    setIsLoading(true);
    fetch('https://swapi.dev/api/films').then(response =>{
      
      setError(null);
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
     return response.json();
    }).then(data=>{
      const transformMoviesData = data.results.map(movieData=>{
        return {
          id : movieData.episode_id,
          title : movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date

        }
      })
      setMoviesState(transformMoviesData)
      setIsLoading(false)
    }).catch(error=> {
      setError(error.message)
      setIsLoading(false)
    })
  }

let content = <p style={{color: "white", textAlign: "center"}}>Found no movies!</p>
if(moviesState.length > 0){
  content = <MoviesList movies={moviesState}/>
}

if(error){
  content = <p style={{color: "white", textAlign: "center"}}>{error}</p>
}
if(isLoading){
  content = <p style={{color: "white", textAlign: "center"}}>Loading...</p>
}

  return (
    <>
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
