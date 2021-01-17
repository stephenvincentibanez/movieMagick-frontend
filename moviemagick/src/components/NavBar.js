import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'

import React from 'react';

const NavBar = () => {
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
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
         </Navbar>
    );
}

export default NavBar;
