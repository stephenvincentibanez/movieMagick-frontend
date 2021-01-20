import React from 'react';

const ReviewDetails = (props) => {
    return (
        <div>
            {/* since passing down review, should be able to access user and movie */}
            <h5>{props.review.movie.title}</h5>
            <h5>{props.review.user.username}</h5>
            <h5>{props.review.rating}</h5>
            <h5>{props.review.text}</h5>
        </div>
    );
}

export default ReviewDetails;
