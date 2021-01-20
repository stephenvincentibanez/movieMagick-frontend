import React from 'react';

const Review = (props) => {
    return (
        <div>
            <h5>{props.user.username}</h5>
            {/* <h5>{props.review.user}</h5> */}
            <h5>{props.review.rating}</h5>
            <p>{props.review.text}</p>
        </div>
    );
}

export default Review;
