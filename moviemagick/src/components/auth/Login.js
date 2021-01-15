import React, { Component } from 'react';
import axios from 'axios'

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
                <form onSubmit={this.handleSubmit}>
                    <input type='username' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} required />
                    <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} required />
                    <button type='submit' >Login</button>
                </form>
            </div>
        );
    } 
}

export default Login;
