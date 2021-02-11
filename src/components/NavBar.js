import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React, { Component } from 'react';
import axios from 'axios'

class NavBar extends Component {

    handleLogoutClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true}).then(response => {
            this.props.handleLogout()
        }).catch(error => {
            console.log('logout error', error)
        })
    }
        
    render() {
        return (
            // <Navbar bg="dark" variant="dark">
            <Navbar>
                <Navbar.Brand href="/">MovieMagick</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/browse">Browse</Nav.Link>
                    <Nav.Link href="/myreviews">MyReviews</Nav.Link>
                    <Nav.Link href="/watchlist">Watchlist</Nav.Link>
                    <Nav.Link href='/edit_user' >Settings</Nav.Link>
                    {this.props.loggedInStatus === "LOGGED_IN" ? <Nav.Link onClick={() => {if (window.confirm('Are you sure you want to logout?')) this.handleLogoutClick()}}> Logout </Nav.Link> : null}
                </Nav>
             </Navbar>
        );
    }
}

export default NavBar;
