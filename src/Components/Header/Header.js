import React, { Component } from 'react';
import logo from './../UtahTrails.png';
import './Header.css';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header className="main_header">
                <div className="main_header_left">
                    <img src={logo} />
                </div>
                <div className="main_header_right">
                    <Link to='/search'><button className="main_header_button">Search Trails</button></Link>
                    <button className="main_header_button">Login/Signup</button>
                </div>
            </header>
        )
    }
}