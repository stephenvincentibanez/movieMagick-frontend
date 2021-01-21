import React, { Component } from 'react';
import Review from './Review'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

class Movie extends Component {

    state={
        rating: '',
        text: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/reviews', {
            review: {
                movie_id: this.props.movie.id,
                user_id: this.props.user.id,
                rating: this.state.rating,
                text: this.state.text
            }
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created'){
                this.setState({
                    rating: '',
                    text: ''
                })
            }
        }).catch(error => {
            console.log('review creation error', error)
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleWatchlist = (movie) => {
        if(!this.props.user.watchlists.find(m => m.movie.title === movie.title)){
            this.props.handleAddToWatchlist(movie)
        }
        else{
            fetch(`http://localhost:3001/watchlists/${movie.id}`, {
            method: "DELETE"
            }).then(r => r.json())
            .then(data => this.props.handleRemoveFromWatchlist(data.watchlist))
            // this.props.handleRemoveFromWatchlist(movie)
        }
    }

    renderReviews = () => {
        return this.props.reviews.map(review => {
            if(review.movie.id === this.props.movie.id){
                return (
                    <Review review={review} user={this.props.user}/>
                )
            }
        })
    }

    render(){
        console.log(this.props)
        return (
            <Container>
                <h1>{this.props.movie.title} ({this.props.movie.year})</h1>
                {this.props.user.watchlists.find(movie => movie.movie.title === this.props.movie.title) ? <Button onClick={() => this.handleWatchlist(this.props.movie)}> Remove from Watchlist </Button> : <Button onClick={() => this.handleWatchlist(this.props.movie)}>Add to Watchlist</Button> }
                {/* <Button onClick={() => this.handleWatchlist(this.props.movie)}>Add to Watchlist</Button><br/><br/> */}
                <Row>
                    <Col>
                        <br/>
                        <h5>Director: {this.props.movie.director}</h5>
                        <h5>Writer: {this.props.movie.writer}</h5>
                        <h5>Genres: {this.props.movie.genres}</h5>
                        <h5>Starring: {this.props.movie.actors}</h5>
                        <h5>Language: {this.props.movie.language}</h5>
                        <h5>Rated: {this.props.movie.rated}</h5>
                        <h5>Plot: {this.props.movie.plot}</h5>

                    </Col>
                    <Col>
                    <img src={this.props.movie.poster}/><br/><br/>
                    </Col>
                </Row>
                    <br/>
                    <Form>
                        <h3> Leave a Review</h3>
                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as="select" type="rating" name="rating" value={this.state.rating} onChange={this.handleChange} required >
                                <option>1 star</option>
                                <option>2 stars</option>
                                <option>3 stars</option>
                                <option>4 stars</option>
                                <option>5 stars</option>
                            </Form.Control>    
                            <Form.Label>Review</Form.Label>
                            <Form.Control as="textarea" name="text" rows={5} value={this.state.text} onChange={this.handleChange} required/>
                            <Button onClick={this.handleSubmit}>Submit Review</Button>
                        </Form.Group>
                    </Form>
                    {this.props.movie.reviews > 0 ? <h3>User Reviews</h3> : null}
                    {this.renderReviews()}
            </Container>
        );
    }
}

export default Movie;
