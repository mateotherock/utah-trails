import React, { Component } from 'react';
import logo from './../UtahTrails.png';
import './Header.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from './../../ducks/reducer.js';

class Header extends Component {

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        return (
            <header className="main_header">
                <div className="main_header_left">
                    <Link to='/'><img src={logo} alt="Utah Trails Logo" width='60%' height='100%' /></Link>
                </div>
                <div className="main_header_right">
                    <Link to='/search'><button className="main_header_button">Search Trails</button></Link>
                    {(this.props.user.user_id) ? 
                    <div>
                        <Link to='/profile'><button className="main_header_button">Profile</button></Link>
                        <a href={`${process.env.REACT_APP_BACKEND}/logout`}><button className="main_header_button">Logout</button></a>
                    </div>
                    :
                    <a href={ process.env.REACT_APP_LOGIN + `?url=${process.env.REACT_APP_FRONTEND_MINUS_SLASH}${this.props.location.pathname}` } ><button className="main_header_button">Login/Signup</button></a>}
                </div>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, { getUser })(Header));