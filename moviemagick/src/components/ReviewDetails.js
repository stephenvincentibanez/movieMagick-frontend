import React from 'react';

const ReviewDetails = (props) => {
    return (
        <div>
            <h4>{props.review.movie.title}</h4>
            <img src={props.review.movie.poster}/>
            <h4>{props.review.rating}</h4>
            <p>Review: {props.review.text}</p>
        </div>
    );
}

export default ReviewDetails;
