import React from 'react';
import ReviewDetails from './ReviewDetails'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const MyReviews = (props) => {

    const renderReviews = () => {
        return props.user.reviews.map(review => {
                return(
                    <ReviewDetails 
                        review={review} 
                        key={review.id} 
                        handleRemoveReview={props.handleRemoveReview} 
                        handleMovieClick={props.handleMovieClick}/>
                )
            }
        )
    }

    return (
        <div>
            <br/>
            <h1>MyReviews</h1>
            <Container>
                    {props.user.reviews.length > 0 ? <Row className="justify-content-md-center">{renderReviews()}</Row> : <h3>You haven't written any reviews yet!</h3>}
            </Container>
        </div>
    );
}

export default MyReviews;
