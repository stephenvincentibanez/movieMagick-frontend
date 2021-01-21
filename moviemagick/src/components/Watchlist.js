import React from 'react';
import Card from 'react-bootstrap/Card'


const Watchlist = (props) => {

// const handleOnClick = (movie) => {
//     this.props.handleMovieClick(movie)
//     this.props.history.push(`/movies/${movie.id}`)
// }

    const renderWatchlist = () => {
        debugger
        return props.user.watchlists.map(watchlist => {
            return (
                <Card style={{width: '18rem'}} key={watchlist.id}>
                    <Card.Img variant="top" src={watchlist.movie.poster}/>
                    <Card.Body>
                        <Card.Title> {watchlist.movie.title} </Card.Title>
                        <Card.Text> {watchlist.movie.plot} </Card.Text>
                    </Card.Body>
                </Card>
            )
        })    
    }


    return (
        <div>
            <h1>Watchlist</h1>
            {renderWatchlist()}
        </div>
    );
}

export default Watchlist;
