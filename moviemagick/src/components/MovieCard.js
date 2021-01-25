import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { withRouter } from "react-router";

class MovieCard extends Component {

    state={
        display: false
    }

    handleOnClick = (movie) => {
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

    render() {
        return (
            <Card
                onClick={() => this.handleOnClick(this.props.movie)} 
                onMouseEnter={this.handleHover} 
                onMouseOut={this.handleUnhover}
                style={{width: '17rem'}} 
                key={this.props.movie.id}>
                <Card.Img variant="top" src={this.props.movie.poster}/>
                <Card.Body>
                    <Card.Title> {this.props.movie.title} </Card.Title>
                    <Card.Text className="left"> {this.props.movie.plot} </Card.Text>
                    {this.state.display === true ? <Button variant="outline-primary">Add to Watchlist</Button> : null}
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(MovieCard);
