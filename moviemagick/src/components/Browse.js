import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'


class Browse extends Component {

    handleEditUserClick = () => {
        this.props.history.push('/edit_user')
    }

    handleOnClick = () => {
        console.log('selecting')
        this.props.history.push('/movie')
    }

    renderCards = () => {
        return this.props.movies.map(movie => 
        <Card onClick={this.handleOnClick} style={{width: '18rem'}}>
            <Card.Img variant="top" src={movie.poster}/>
            <Card.Body>
                <Card.Title> {movie.title} </Card.Title>
                <Card.Text> {movie.plot} </Card.Text>
            </Card.Body>
        </Card>)
    }

    render(){
        return (
            <div>
                {console.log(this.props)}
                <h1> Browse </h1>
                {/* <h1> Status: {this.props.loggedInStatus} </h1> */}
                <h2> Welcome {this.props.user.username}!</h2>
                <Container>
                    {this.renderCards()}
                </Container>
            </div>
        );
    }
}

export default Browse;
