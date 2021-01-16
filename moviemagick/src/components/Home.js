import React, {Component} from 'react';
import axios from 'axios'
import Registration from './auth/Registration'
import Login from './auth/Login'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';


class Home extends Component {
    constructor(props){
        super(props)

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data)
        this.props.history.push('/browse')
    }

    handleLogoutClick() {
        axios.delete('http://localhost:3001/logout', {withCredentials: true}).then(response => {
            this.props.handleLogout()
        }).catch(error => {
            console.log('logout error', error)
        })
    }

    render(){
        return (
            <Container>
                <h1> Welcome to MovieMagick </h1>
                {/* <h1> Status: {this.props.loggedInStatus} </h1> */}
                <p> Welcome! You can use this app to keep track of and review what movies you've seen and keep a watchlist going of movies you want to see.</p>
                <Row>
                    <Col> <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/> </Col>                
                    <Col> <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/> </Col>
                </Row>
                {this.props.loggedInStatus === "LOGGED_IN" ? <Button onClick={() => this.handleLogoutClick()}> Logout </Button> : null}
            </Container>
        );
    }
}

export default Home;
