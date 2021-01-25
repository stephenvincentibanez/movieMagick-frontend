import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";


const ReviewDetails = (props) => {

    const handleOnClick = (e, movie) => {
        if(e.target.tagName === 'BUTTON') return
        props.handleMovieClick(movie)
        props.history.push(`/movies/${movie.id}`)
    }

    const handleDelete = (review) => {
        fetch(`http://localhost:3001/reviews/${review.id}`, {
            method: "DELETE"
        }).then(r => r.json())
        .then(data => props.handleRemoveReview(data.review))
    }

    return (
        <Card style={{width: '17rem'}} onClick={(e) => handleOnClick(e, props.review.movie)}>
            <Card.Img variant="top" src={props.review.movie.poster}/>
            <Card.Body>
                <Card.Title> {props.review.movie.title} </Card.Title>
                <Card.Text> Rating: {props.review.rating}</Card.Text>
                <Card.Text> Review: {props.review.text} </Card.Text>
                <Button variant="outline-danger" onClick={() => handleDelete(props.review)}>Delete Review</Button>
            </Card.Body>
        </Card>
    );
}

export default withRouter(ReviewDetails);
