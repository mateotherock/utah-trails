import React, { Component } from 'react';
import axios from 'axios';
import Header from './../Header/Header.js';
import { connect } from 'react-redux';
import { getUser, addName, addDesc } from './../../ducks/reducer.js';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            desc: '',
            editName: false,
            editDesc: false
        }
    }

    componentWillMount() {
        this.props.getUser()
    }

    componentDidMount() {
        // if (!this.props.user.user_id) {
        //     this.props.history.push('/')
        // }
    }
    
    render() {

        if(this.props.user.date_joined) {
            var dateJoined = this.props.user.date_joined.split('T')[0];
        }

        return (
            <div>
                <Header />
                <div className="profile_card">
                    <div className="profile_card_top">
                        <div className="name_join_date">
                            {(this.props.user.first_name && this.props.user.last_name) 
                            ? 
                            (this.state.editName === false) 
                            ? 
                            <h1 onClick={() => this.setState({ editName: true })}>{this.props.user.first_name} {this.props.user.last_name} </h1>
                            :
                            <form className="edit_name_form">
                                First Name:  <input type="text" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                Last Name: <input type="text" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                <button type='submit' onClick={() => {this.props.addName({firstName: this.state.firstName, lastName: this.state.lastName, id: this.props.user.user_id}); this.setState({ editName: false })}}>Update</button>
                            </form>
                            :
                            <form className="edit_name_form">
                                <p>What is your name?</p>
                                First Name:  <input type="text" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                Last Name: <input type="text" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                <button type='submit' onClick={() => {this.props.addName({firstName: this.state.firstName, lastName: this.state.lastName, id: this.props.user.user_id}); this.setState({ editName: false })}}>Update</button>
                            </form>
                            }
                            Joined: {dateJoined}
                        </div>
                        <div className="profile_card_image">
                            <img src={this.props.user.profile_picture} className="profile_image" alt="profile" />
                        </div>
                    </div>
                    <div className="profile_card_bottom">
                        {(this.props.user.user_overview)
                        ?
                        (this.state.editDesc === false)
                        ?
                        <div onClick={() => this.setState({editDesc: true})}>{this.props.user.user_overview}</div>
                        :
                        <div className="profile_desc">
                            <h5>Tell us about yourself</h5>
                            <textarea className="edit_desc" value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value})} onKeyDown={(e) => {if(e.key === "Enter") {this.props.addDesc({id: this.props.user.user_id, desc: this.state.desc}); this.setState({ editDesc: false })}}}></textarea>
                        </div>
                        :
                        <div className="profile_desc">
                            <h5>Tell us about yourself</h5>
                            <textarea className="edit_desc" value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value})} onKeyDown={(e) => {if(e.key === "Enter") {this.props.addDesc({id: this.props.user.user_id, desc: this.state.desc}); this.setState({ editDesc: false })}}}></textarea>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getUser, addName, addDesc })(Profile);