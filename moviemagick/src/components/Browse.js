import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import MovieCard from './MovieCard'
import Row from 'react-bootstrap/Row'


class Browse extends Component {
    
    renderCards = () => {
        return this.props.movies.map(movie => {
            return(
                <MovieCard movie={movie} handleMovieClick={this.props.handleMovieClick}/>
            )
        })
    }

    render(){
        return (
            <div>
                <h1> Browse </h1>
                <h5> Welcome {this.props.user.username}!</h5>
                <br/>
                <Container>
                    <Row>
                        {this.renderCards()}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Browse;
