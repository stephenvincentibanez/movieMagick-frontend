import React from 'react';
import ReviewDetails from './ReviewDetails'


const MyReviews = (props) => {

    const renderReviews = () => {
        return props.reviews.map(review => {
            if(review.user_id === props.user.id){
                return(
                    <ReviewDetails review={review} user={props.user} key={review.id}/>
                )
            }
        })
    }

    return (
        <div>
            <h1>MyReviews</h1>
            {console.log(props)}
            {renderReviews()}
        </div>
    );
}

export default MyReviews;
