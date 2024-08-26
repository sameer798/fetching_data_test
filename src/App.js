import {Button, Container, Row, Col} from 'react-bootstrap'
import { useState } from 'react';
import './App.css';
import MoviesList from './components/MoviesList';

// const DUMMY_MOVIES = [
//   {id:1, title: "Some dummy movie", releaseDate: "2022-02-11", openingText : "This is opening text of movie"},
//   {id:2, title: "Some dummy movie", releaseDate: "2022-02-11", openingText : "This is opening text of movie"},
//   {id:3, title: "Some dummy movie", releaseDate: "2022-02-11", openingText : "This is opening text of movie"},
//   {id:4, title: "Some dummy movie", releaseDate: "2022-02-11", openingText : "This is opening text of movie"},
// ]

function App() {

  const [moviesState, setMoviesState] = useState([])
  const fetchMoviesHandler = ()=>{
    fetch('https://swapi.dev/api/films').then(response =>{
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
       <MoviesList movies={moviesState}/>
    </>
  );
}

export default App;
