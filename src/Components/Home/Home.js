import React, { Component } from 'react';
import Header from './../Header/Header.js';
import MapContainer from './../MapContainer/MapContainer.js';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <MapContainer />
            </div>
        )
    }
}