import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const ReviewDetails = (props) => {

    const handleClick = (review) => {
        fetch(`http://localhost:3001/reviews/${review.id}`, {
            method: "DELETE"
        }).then(r => r.json())
        .then(data => props.handleRemoveReview(data.review))

        // .then(this.forceUpdate())
    }

    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.review.movie.poster}/>
            <Card.Body>
                <Card.Title> {props.review.movie.title} </Card.Title>
                <Card.Text> Rating: {props.review.rating}</Card.Text>
                <Card.Text> Review: {props.review.text} </Card.Text>
                <Button variant="danger" onClick={() => handleClick(props.review)}>Delete Review</Button>
            </Card.Body>
        </Card>
    );
}

export default ReviewDetails;
