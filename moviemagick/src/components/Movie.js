import React from 'react';

const Movie = (props) => {
    return (
        <div>
            <h1>Movie show card</h1>
            <h1>{props.movie.title}</h1>
        </div>
    );
}

export default Movie;
