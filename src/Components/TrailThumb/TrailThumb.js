import React, { Component } from 'react';
import './TrailThumb.css';

export default class TrailThumb extends Component {
    render() {
        return (
            <div style={{backgroundImage: "url(" + this.props.image + ")"}} className="thumb_container">
                <h1 className="thumb_name">{this.props.name}</h1>
                <h2 className="thumb_difficulty">{this.props.difficulty}</h2>
                <h2 className="thumb_area">{this.props.area}</h2>
            </div>
        )
    }  
}