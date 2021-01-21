import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'



const Watchlist = (props) => {

    const handleOnClick = (movie) => {
        props.handleMovieClick(movie)
        props.history.push(`/movies/${movie.id}`)
    }

    const renderWatchlist = () => {
        return props.user.watchlists.map(watchlist => {
            return (
                <Card onClick={() => handleOnClick(watchlist)} style={{width: '18rem'}} key={watchlist.id}>
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
            <Container>
                <Row>
                    {renderWatchlist()}
                </Row>
            </Container>
        </div>
    );
}

export default Watchlist;
