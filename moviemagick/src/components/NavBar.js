import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import React, { Component } from 'react';

// import React from 'react';

class NavBar extends Component {

    state={
        search: ''
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('searching...')
    }

    handleChange = e => {
        this.setState({
            search: e.target.value
        })
    }
        
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">MovieMagick</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/browse">Browse</Nav.Link>
                    <Nav.Link href="/myreviews">MyReviews</Nav.Link>
                    <Nav.Link href="/watchlist">Watchlist</Nav.Link>
                    <Nav.Link href='/edit_user' >Settings</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.search} onChange={this.handleChange}/>
                    <Button variant="outline-info" onClick={this.handleSubmit}>Search{this.state.search}</Button>
                </Form>
             </Navbar>
        );
    }
}

export default NavBar;
