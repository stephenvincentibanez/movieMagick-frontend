import React, { Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

class Registration extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            username: '',
            password: '',
            password_confirmation: '',
            registrationErrors: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = e => {
        const {username, password, password_confirmation} = this.state
        axios.post('http://localhost:3001/registrations', {
            user: {
                username: username,
                password: password,
                password_confirmation: password_confirmation
            }
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created'){
                this.props.handleSuccessfulAuth(response.data)
            }
        }).catch(error => {
            console.log('registration error', error)
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
                <h3> Register </h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" placeholder="Enter username" value={this.state.username} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        );
    } 
}

export default Registration;
