import React, { Component } from 'react';
import Header from './../Header/Header.js';
import { connect } from 'react-redux';
import { getTrail, getTrailTags } from './../../ducks/reducer.js';
import './Trail.css';

class Trail extends Component {
    componentDidMount() {
        this.props.getTrail(this.props.match.params.name)
        this.props.getTrailTags(this.props.match.params.name)
    }
    render() {

        const tags = this.props.trailTags.map((tag, index) => 
            <span key={index} className="tag">{tag}</span>
        )

        return (
            <div>
                <Header />
                <div className="trail_container">
                    <h1>{this.props.trailName}</h1>
                    <div className="trail_deets">
                        <p>Difficulty: {this.props.trailDifficulty}</p>
                        <p>Area: {this.props.generalArea}</p>
                        <p>Length: {this.props.trailLength} miles</p>
                        <p>Elevation Gain: {this.props.elevationGain} feet</p>
                    </div>
                    <div className="tag_group">{tags}</div>
                    <img className="trail_image" src={this.props.trailImage} alt="Trail" />
                    <p className="trail_description">Description: {this.props.trailDescription}</p>
                    <a href={`https://www.google.com/maps/dir/Current+Location/${this.props.trailheadLat},${this.props.trailheadLng}`} target="_blank" alt="Google Maps Link">Get directions to Trailhead</a>
                </div>
                <div className="review_container">
                    <form className="trail_review">
                        <h2>Write a Review</h2>
                        <h3>What did you think of the hike?</h3>
                        <input className="review_input" id="review"></input>
                        <button type="submit">Submit</button>
                        <button type="reset">Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getTrail, getTrailTags })(Trail);