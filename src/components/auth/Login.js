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
        axios.post('http://localhost:3001//sessions', {
            user: {
                username: username,
                password: password
            }
        },
        { withCredentials: true }
        ).then(response => {
            console.log(response)
            if (response.data.logged_in){
                this.props.handleSuccessfulAuth(response.data)
            }
            else if (response.data.status === 401){
                alert("Your username or password is incorrect. Please try again.")
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
            <div className="loginForm">
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
                    {this.props.loggedInStatus === "NOT_LOGGED_IN" ? <Button variant="outline-primary" type="submit">Login</Button> : null}
                </Form>
            </div>
        );
    } 
}

export default Login;
