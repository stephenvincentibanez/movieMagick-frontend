import React, {Component} from 'react';

class Browse extends Component {

    handleEditUserClick = () => {
        this.props.history.push('/edit_user')
    }

    render(){
        return (
            <div>
                <h1> Browse </h1>
                <h1> Status: {this.props.loggedInStatus} </h1>
                <h2> Welcome {this.props.user.username}!</h2>
                <button onClick={() => this.handleEditUserClick()}>Edit User</button>
            </div>
        );
    }
}

export default Browse;
