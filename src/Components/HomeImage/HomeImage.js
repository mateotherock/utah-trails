import React, { Component } from 'react';
import 'aframe';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import aFramePic from './../360.jpg';
import './HomeImage.css';
import { Link } from 'react-router-dom';

export default class HomeImage extends Component {
    render() {

        return (
            <Scene embedded={true} className="moveable_scene">
                    <Entity primitive="a-sky" src={aFramePic} />
                    <Link to='/search'><button className="moveable_scene_button">Search Trails</button></Link>
            </Scene>
        )
    }
}