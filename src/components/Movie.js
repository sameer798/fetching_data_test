import { Button } from 'react-bootstrap'
import classes from './Movie.module.css'
const Movie = props =>{
    
       
    

    return <li className={classes.list}>
        <h2>{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
        <Button className='mb-2 m-2' variant='danger' onClick={props.onDelete.bind(null, props.id)}>Delete</Button>
        <Button className='mb-2 m-2'>Edit</Button>
    </li>
}

export default Movie