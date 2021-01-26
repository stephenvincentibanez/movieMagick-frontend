import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";
import axios from 'axios'

class MovieCard extends Component {

    state={
        display: false
    }

    handleOnClick = (e, movie) => {
        if(e.target.tagName === 'BUTTON') return
        this.props.handleMovieClick(movie)
        this.props.history.push(`/movies/${movie.id}`)
    }

    handleHover = () => {
        this.setState({
            display: true
        })
    }

    handleUnhover = () => {
        this.setState({
            display: false
        })
    }

    handleWatchlist = (movie) => {
        const watchlist = this.props.user.watchlists.find(m => m.movie.title === movie.title)
        if(!watchlist){
            axios.post('http://localhost:3001/watchlists', {
                watchlist: {user_id: this.props.user.id, movie_id: movie.id}
            },
            { withCredentials: true }
            ).then(response => {
            if (response.status === 201){
                this.props.handleAddToWatchlist(response.data)
            }
            }).catch(error => {
            console.log('add watchlist error', error)
        })
        }
        else{
            fetch(`http://localhost:3001/watchlists/${watchlist.id}`, {
                method: "DELETE"
            }).then(r => r.json())
            .then(response => {
                if(response.status === "destroyed"){
                    this.props.handleRemoveFromWatchlist(movie)
                }
            })
        }
    }

    renderWatchlistButton = () => {
        if(!this.props.user.watchlists.find(m => m.movie.title === this.props.movie.title)){
            return <Button onClick={() => this.handleWatchlist(this.props.movie)} variant="outline-primary" size="sm" >Add to Watchlist</Button>
        }
        else{
            return <Button onClick={() => this.handleWatchlist(this.props.movie)} variant="outline-danger" size="sm">Remove from Watchlist</Button>
        }
    }

    render() {
        return (
            <Card
                onClick={(e) => this.handleOnClick(e,this.props.movie)} 
                onMouseEnter={this.handleHover} 
                onMouseLeave={this.handleUnhover}
                key={this.props.movie.id}>
                <Card.Img variant="top" src={this.props.movie.poster}/>
                <Card.Body>
                    <Card.Title> {this.props.movie.title} </Card.Title>
                    <Card.Text className="left">{this.props.movie.plot}</Card.Text>
                    <div className="watchlistBtnParent">
                        <div className="watchlistBtn">
                            {this.state.display === true ?
                            this.renderWatchlistButton() :
                            <span style={{height: '3rem'}}>&nbsp;&nbsp;</span>}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(MovieCard);
