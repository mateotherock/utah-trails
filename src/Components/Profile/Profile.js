import React, { Component } from 'react';
import axios from 'axios';
import Header from './../Header/Header.js';
import { connect } from 'react-redux';
import { getUser, addName } from './../../ducks/reducer.js';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount() {
        this.props.getUser()
        if (!this.props.user.user_id) {
            this.props.history.push('/')
        }
    }

    render() {

        if(this.props.user.date_joined) {
            var dateJoined = this.props.user.date_joined.split('T')[0];
        }

        return (
            <div>
                <Header />
                {(this.props.user.first_name && this.props.user.last_name) ? 
                <h1>{this.props.user.first_name} {this.props.user.last_name} </h1>
                :
                <div>
                    <p>What is your name?</p>
                    First Name:  <input type="text" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                    Last Name: <input type="text" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                    <button type='submit' onClick={() => {this.props.addName({firstName: this.state.firstName, lastName: this.state.lastName, id: this.props.user.user_id})}}>Add Name</button>
                </div>
                }
                <div>
                    <img src={this.props.user.profile_picture} />
                    Joined: {dateJoined}
                </div>
                <div>This is the profile component</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getUser, addName })(Profile);