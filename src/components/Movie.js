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
        rating: '1 star',
        text: ''
    }

    handleSubmit = (e, review) => {
        e.preventDefault()
        if(this.props.movie.users.find(u => u.username === this.props.user.username)){
            alert("You've already reviewed this movie!")
            this.setState({
                text: ''
            })
        }
        else{
            axios.post('https://movie-magick-api.herokuapp.com/reviews', {
                review: {
                    movie_id: this.props.movie.id,
                    user_id: this.props.user.id,
                    rating: this.state.rating,
                    text: this.state.text
                }
            },
            { withCredentials: true }
            ).then(response => {
                if (response.status === 201){
                    this.setState({
                        rating: '',
                        text: ''
                    })
                    alert("Your review has been posted!")
                    this.props.handleAddReview(review)
                    }
                })
                .catch(error => {
                console.log('review creation error', error)
                alert("Your review can't be blank!")
            })
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleWatchlist = (movie) => {
        const watchlist = this.props.user.watchlists.find(m => m.movie.title === movie.title)
        if(!watchlist){
            axios.post('https://movie-magick-api.herokuapp.com/watchlists', {
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
            fetch(`https://movie-magick-api.herokuapp.com/watchlists/${watchlist.id}`, {
                method: "DELETE"
            }).then(r => r.json())
            .then(response => {
                if(response.status === "destroyed"){
                    this.props.handleRemoveFromWatchlist(movie)
                }
            })
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
        return (
            <div>
                <h1>{this.props.movie.title} ({this.props.movie.year})</h1>
            <Container>
                {/* <br/> */}
                {this.props.user.watchlists.find(movie => movie.movie.title === this.props.movie.title) ? 
                <Button variant="outline-danger" onClick={() => this.handleWatchlist(this.props.movie)}>Remove from Watchlist</Button> : 
                <Button variant="outline-primary" onClick={() => this.handleWatchlist(this.props.movie)}>Add to Watchlist</Button> }
                <br/><br/>
                <Row>
                    <Col className="left">
                        <br/>
                        <h5>Director: {this.props.movie.director}</h5>
                        <h5>Writer: {this.props.movie.writer}</h5>
                        <h5>Starring: {this.props.movie.actors}</h5>
                        <h5>Genres: {this.props.movie.genres}</h5>
                        <h5>Rated: {this.props.movie.rated}</h5>
                        <h5>Released: {this.props.movie.released}</h5>
                        <h5>Runtime: {this.props.movie.runtime}</h5>
                        <h5>IMDB Rating: {this.props.movie.ratings}</h5>
                        <h5>Awards: {this.props.movie.awards}</h5>
                        <h5>Language: {this.props.movie.language}</h5>
                        <h5>Production Company: {this.props.movie.production}</h5> 
                        <h5>Plot: {this.props.movie.plot}</h5>

                    </Col>
                    <Col>
                        <img src={this.props.movie.poster}/><br/><br/>
                    </Col>
                </Row>
                    <br/>
                <Form className="reviewForm">
                    <h3> Leave a Review</h3>
                    <Form.Group>
                        <h5>Rating</h5>
                        <Form.Control as="select" type="rating" name="rating" value={this.state.rating} onChange={this.handleChange} >
                            <option>1 star</option>
                            <option>2 stars</option>
                            <option>3 stars</option>
                            <option>4 stars</option>
                            <option>5 stars</option>
                        </Form.Control><br/>
                        <h5>Review</h5>
                        <Form.Control as="textarea" name="text" rows={5} value={this.state.text} onChange={this.handleChange} required/>
                        <Button variant="outline-primary" onClick={this.handleSubmit}>Submit Review</Button>
                    </Form.Group>
                </Form>
                {/* {this.props.movie.reviews.length > 0 ? <h3>User Reviews</h3> : null} */}
            </Container>
            <Container>
                <Row className="justify-content-md-center">
                    {this.renderReviews()}
                </Row>
            </Container>
            </div>
        );
    }
}

export default Movie;
