import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

class Movie extends Component {

    handleSubmit = () => {
        console.log('submit')
    }

    handleChange = e => {
        
    }
    render(){
        return (
            <Container>
                    <h1>{this.props.movie.title} ({this.props.movie.year})</h1>
                    <Button>Add to Watchlist</Button><br/>
                    <img src={this.props.movie.poster}/>
                        <h5>Director: {this.props.movie.director}</h5>
                        <h5>Writer: {this.props.movie.writer}</h5>
                        <h5>Genres: {this.props.movie.genres}</h5>
                        <h5>Starring: {this.props.movie.actors}</h5>
                        <h5>Language: {this.props.movie.language}</h5>
                        <h5>Rated: {this.props.movie.rated}</h5>
                        <h5>Plot: {this.props.movie.plot}</h5>
                    <br/>
                    <Form onSubmit={this.handleSubmit}>
                        <h3> Leave a Review</h3>
                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="rating" name="rating" onChange={this.handleChange} required/>
                            <Form.Label>Review</Form.Label>
                            <Form.Control as="textarea" rows={5}/>
                            <Button>Submit Review</Button>
                        </Form.Group>
                    </Form>
            </Container>
        );
    }
}

export default Movie;
