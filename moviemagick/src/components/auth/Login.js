import React, { Component } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


class Login extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            username: '',
            password: '',
            loginErrors: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = (e) => {
        const {username, password} = this.state
        axios.post('http://localhost:3001/sessions', {
            user: {
                username: username,
                password: password
            }
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.logged_in){
                this.props.handleSuccessfulAuth(response.data)
            }
        }).catch(error => {
            console.log('login error', error)
        })
        e.preventDefault()
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h3> Login </h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        );
    } 
}

export default Login;
