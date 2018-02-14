import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './../Map/Map.js';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    
        return (
            <Map google={this.props.google}>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBXU427m2VA7jcmbiTEF_VpXzBsWDPMbR4' 
})(MapContainer);