import React, { Component } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


class EditUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.user.username,
            password: props.user.password,
            registrationErrors: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password, password_confirmation} = this.state
        const {id} = this.props.user
        axios.patch(`http://localhost:3001/users/${id}`, {
            user: {
                username: username,
                password: password,
                password_confirmation: password_confirmation
            }
        }, 
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'updated'){
                this.props.history.push("/browse")
            }
        }).catch(error => {
            console.log("update error", error)
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    deleteUser = () => {
        const {id} = this.props.user
        axios.delete(`http://localhost:3001/users/${id}`)
        .then(response => {
            if(response.data.status === 'destroyed'){
                this.props.handleLogout()
                this.props.history.push("/")
            }
        })
    }

    render() {
        return (
            <div className="editUser">
                <br/>
                <h1>Edit User</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" placeholder={this.props.user.username} value={this.state.username} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
export default EditUser;