import React, {Component} from 'react';
import MovieCard from './MovieCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


class Browse extends Component {
    
    renderCards = () => {
        return this.props.movies.map(movie => {
            return(
                <MovieCard 
                    movie={movie} 
                    handleMovieClick={this.props.handleMovieClick}
                    user={this.props.user}
                    handleAddToWatchlist={this.props.handleAddToWatchlist}
                    handleRemoveFromWatchlist={this.props.handleRemoveFromWatchlist} />
            )
        })
    }

    render(){
        return (
            <div>
                <br/>
                <h1> Browse </h1>
                <h5> Welcome {this.props.user.username}!</h5>
                <br/>
                <Container className="moviesContainer">
                    <Row className="justify-content-md-center">
                        {this.renderCards()}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Browse;
