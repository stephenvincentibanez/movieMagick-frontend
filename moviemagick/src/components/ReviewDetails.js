import React from 'react';
import Card from 'react-bootstrap/Card'


const ReviewDetails = (props) => {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.review.movie.poster}/>
            <Card.Body>
                <Card.Title> {props.review.movie.title} </Card.Title>
                <Card.Text> Rating: {props.review.rating}</Card.Text>
                <Card.Text> Review: {props.review.text} </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ReviewDetails;
