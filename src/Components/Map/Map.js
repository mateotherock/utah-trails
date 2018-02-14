import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
            this.loadMap()
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom = 6;
            let lat = 40.296898;
            let lng = -111.694649;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                mapTypeId: 'terrain'
            })
            this.map = new maps.Map(node, mapConfig);

            const markers = axios.get('http://localhost:3001/api/markers').then(resp => {
                resp.data.map((marker) => {

                    const markers = new google.maps.Marker({
                        position: {
                            lat: marker.trailhead_lat, lng: marker.trailhead_lng,
                        },
                        map: this.map,
                    })
                    var infowindow = new google.maps.InfoWindow({
                        content: `<a href="http://localhost:3000/#/trail/${marker.trail_id}"><img src="${marker.trail_img}" heigh="70%" width="70%" alt=""/></a>
                        <h3>${marker.trail_name}</h3>`
                    })
                    markers.addListener('click', function() {
                        infowindow.open(this.map, markers);
                    })
                });
            })
        }
        // ...
    }

    render() {

        const style = {
            width: '80vw',
            height: '50vh'
        }

        return (
            <div ref="map" style={style}>
                Loading map...
            </div>
        )
    }
}