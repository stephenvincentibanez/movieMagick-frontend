import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'


class Browse extends Component {

    state={
        display: false
    }

    handleEditUserClick = () => {
        this.props.history.push('/edit_user')
    }

    handleOnClick = (movie) => {
        this.props.handleMovieClick(movie)
        console.log(movie)
        this.props.history.push(`/movies/${movie.id}`)
        // console.log(id)
    }

    handleHover = () => {
        this.setState({
            display: true
        })
    }
    
    renderCards = () => {
        return this.props.movies.map(movie => {
            return(
            <Card onClick={() => this.handleOnClick(movie)} onMouseEnter={this.handleHover} style={{width: '18rem'}} key={movie.id}>
                <Card.Img variant="top" src={movie.poster}/>
                <Card.Body>
                    <Card.Title> {movie.title} </Card.Title>
                    <Card.Text> {movie.plot} </Card.Text>
                </Card.Body>
            </Card>
            )
        })
    }

    render(){
        return (
            <div>
                <h1> Browse </h1>
                {/* <h1> Status: {this.props.loggedInStatus} </h1> */}
                <h2> Welcome {this.props.user.username}!</h2>
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
