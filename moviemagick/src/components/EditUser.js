import React, { Component } from 'react';
import axios from 'axios'
class EditUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: props.user.username,
            registrationErrors: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {username} = this.state
        const {id} = this.props.user
        axios.patch(`http://localhost:3001/users/${id}`, {
            user: {
                username: username
            }
        }, 
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'updated'){
                this.props.history.push("/browse")
            }
        }).catch(error => {
            console.log("registration error", error)
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
            <div>
                <h1>EDIT USER</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        name="username"
                        placeholder={this.props.user.username}
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Save Changes</button>
                    <button onClick={this.deleteUser}>Delete User</button>
                </form>
            </div>
        );
    }
}
export default EditUser;