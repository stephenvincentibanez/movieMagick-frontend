import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'


const Watchlist = (props) => {

    const handleOnClick = (e, movie) => {
        if(e.target.tagName === 'BUTTON') return
        props.handleMovieClick(movie)
        props.history.push(`/movies/${movie.id}`)
    }

    const handleDelete = (watchlist) => {
        fetch(`http://localhost:3001/watchlists/${watchlist.id}`, {
            method: "DELETE"
        }).then(r => r.json())
        .then(data => props.handleRemoveFromWatchlist(data.watchlist))
    }

    const renderWatchlist = () => {
        return props.user.watchlists.map(watchlist => {
            return (
                <Card style={{width: '18rem'}} key={watchlist.id} onClick={(e) => handleOnClick(e, watchlist.movie)}>
                    <Card.Img variant="top" src={watchlist.movie.poster}/>
                    <Card.Body>
                        <Card.Title> {watchlist.movie.title} </Card.Title>
                        <Card.Text> {watchlist.movie.plot} </Card.Text>
                        <Button variant="danger" onClick={() => handleDelete(watchlist)}>Remove from Watchlist</Button>
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
