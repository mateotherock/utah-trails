import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getTrails, filterTrails } from './../../ducks/reducer.js';
import Header from './../Header/Header.js';
import TrailThumb from './../TrailThumb/TrailThumb.js';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulty: '',
            area: '',
            length: 0,
            eGain: 0
        }

        this.filterTrails = this.filterTrails.bind(this);
    }

    componentDidMount() {
        this.props.getTrails()
    }

    filterTrails(e) {
        e.preventDefault();
        this.props.filterTrails(this.state);
    }

    render() {

        const trails = this.props.trailsToRender.map((trail) =>
            <TrailThumb key={trail.trail_id} 
                        image={trail.trail_img} 
                        name={trail.trail_name}
                        difficulty={trail.difficulty}
                        area={trail.general_area} />
        )

        return (
            <div>
                <Header />
                <div>
                    <form onSubmit={this.filterTrails}>
                        Difficulty: <select name="difficulty" value={this.state.difficulty} onChange={(e) => this.setState({ difficulty: e.target.value })}>
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Hard">Hard</option>
                        </select>
                        {/* <select name="Minimum Average Rating">
                            <option value="0 stars">0 Stars</option>
                            <option value="1 star">1 Stars</option>
                            <option value="2 stars">2 Stars</option>
                            <option value="3 stars">3 Stars</option>
                            <option value="4 stars">4 Stars</option>
                            <option value="5 stars">5 Stars</option>
                        </select> */}
                        Area: <select name="area" value={this.state.area} onChange={(e) => this.setState({ area: e.target.value })}>
                            <option value="Utah County">Utah County</option>
                            <option value="Grand County">Grand County</option>
                        </select>
                        Max Length in Miles: <select name="length" value={this.state.length} onChange={(e) => this.setState({ length: e.target.value })}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        Max Elevation Gain in Feet: <select name="eGain" value={this.state.eGain} onChange={(e) => this.setState({ eGain: e.target.value })}>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                            <option value="4000">4000</option>
                            <option value="5000">5000</option>
                        </select>
                        <button type="reset">Reset</button>
                        <button type="submit">Filter Results</button>
                    </form>
                </div>
                <div className="thumb_grid">{trails}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        trailsToRender: state.trailsToRender
    }
}

export default connect(mapStateToProps, { getTrails, filterTrails })(Search);