import React, { Component } from 'react';
import logo from './../UtahTrails.png';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="main_header">
                <div className="main_header_left">
                    <img src={logo} />
                </div>
                <div className="main_header_right">
                    <span>
                        <button>Search Trails</button>
                    </span>
                    <span>
                        <button>Login/Signup</button>
                    </span>
                </div>
            </header>
        )
    }
}