import React from 'react';
import ReviewDetails from './ReviewDetails'


const MyReviews = (props) => {

    const renderReviews = () => {
        return props.user.reviews.map(review => {
            // debugger
                return(
                    <ReviewDetails review={review} key={review.id}/>
                )
            }
        )
    }

    return (
        <div>
            <h1>MyReviews</h1>
            {renderReviews()}
        </div>
    );
}

export default MyReviews;
