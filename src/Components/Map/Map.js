import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Map extends Component {
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
            axios.get('http://localhost:3001/api/markers').then(resp => {
                resp.data.map((marker) => {
                    const markers = new google.maps.Marker({
                        position: {
                            lat: marker.trailhead_lat, lng: marker.trailhead_lng,
                        },
                        map: this.map
                    })
                    var infowindow = new google.maps.InfoWindow({
                        content: `<h3>${marker.trail_name}</h3>
                        <a href="http://localhost:3000/#/trail/${marker.trail_name}">Hike this Trail</a>`
                    })
                    markers.addListener('click', function() {
                        infowindow.open(this.map, markers);
                    })
                });
            })
        }
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