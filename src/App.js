import {Button, Container, Row, Col} from 'react-bootstrap'
import { useState } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';

function App() {

  const [moviesState, setMoviesState] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = ()=>{
    fetch('https://swapi.dev/api/films').then(response =>{
      setIsLoading(true);
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
    })
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
       {!isLoading && moviesState.length > 0 && <MoviesList movies={moviesState}/>}
       {!isLoading && moviesState.length === 0 && <p style={{color: "white", textAlign: "center"}}>data not found...</p>}
       {isLoading && <p style={{color: "white", textAlign: "center"}}>Loading...</p>}
    </>
  );
}

export default App;
