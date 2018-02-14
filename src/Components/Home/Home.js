import React, { Component } from 'react';
import Header from './../Header/Header.js';
import MapContainer from './../MapContainer/MapContainer.js';
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <header>
                    <Header />
                </header>
                <div className="home_body">
                    <MapContainer />
                </div>
            </div>
        )
    }
}