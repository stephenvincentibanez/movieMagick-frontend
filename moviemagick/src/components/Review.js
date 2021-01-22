import React from 'react';
import Card from 'react-bootstrap/Card'

const Review = (props) => {
    return (
            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>User: {props.review.user.username} </Card.Title>
                    <Card.Text> Rating: {props.review.rating}</Card.Text>
                    <Card.Text> Review: {props.review.text} </Card.Text>
                </Card.Body>
            </Card>
    );
}

export default Review;
