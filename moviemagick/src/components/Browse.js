import React, {Component} from 'react';
import MovieCard from './MovieCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


class Browse extends Component {
    
    state={
        search: ''
    }

    handleSubmit = (e, value) => {
        e.preventDefault()
        const query = e.target.value.split(" ").join("+")
        fetch(`http://localhost:3001/search?search=${query}`)
        .then(r => r.json())
        .then(movies => this.props.handleSearch(movies))
        .then(
            this.setState({
                search: e.target.value
            })
        )
        //callback to app
    }

    handleChange = e => {
        this.setState({
            search: e.target.value
        })
    }


    renderCards = () => {
            return this.props.movies.map(movie => {
                return(
                    <MovieCard 
                        movie={movie} 
                        handleMovieClick={this.props.handleMovieClick}
                        user={this.props.user}
                        handleAddToWatchlist={this.props.handleAddToWatchlist}
                        handleRemoveFromWatchlist={this.props.handleRemoveFromWatchlist} 
                        />
                )
            })
        }

    render(){
        return (
            <div>
                <div className="welcome">
                    <h1> Browse </h1>
                    <h5> Welcome {this.props.user.username}!</h5>
                </div>
                <br/>
                <form onSubmit={(e, value) => this.handleSubmit(e, value)}>
                    <input type="text" placeholder="Search for a movie!" value={this.state.search} onChange={(e,value) => this.handleChange(e,value)}></input>
                    {/* <input type="submit" value="Search"/> */}
                </form>
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
