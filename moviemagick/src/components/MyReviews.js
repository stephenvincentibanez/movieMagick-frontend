import React from 'react';
import ReviewDetails from './ReviewDetails'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'




const MyReviews = (props) => {

    const renderReviews = () => {
        return props.user.reviews.map(review => {
                return(
                    <ReviewDetails review={review} key={review.id}/>
                )
            }
        )
    }

    return (
        <div>
            <h1>MyReviews</h1>
            <Container>
                <Row>
                    {renderReviews()}
                </Row>
            </Container>
        </div>
    );
}

export default MyReviews;
