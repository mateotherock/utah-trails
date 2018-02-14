import React, { Component } from 'react';
import Header from './../Header/Header.js';
import { connect } from 'react-redux';
import { getTrail } from './../../ducks/reducer.js';

class Trail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTrail(this.props.match.params.id)
    }

    render() {

        console.log(this.props)
        return (
            <div>
                <Header />
                <h1>{this.props.trailName}</h1>
                <h1>{this.props.trailDifficulty}</h1>
                <h1>{this.props.generalArea}</h1>
                <h1>{this.props.trailLength} miles</h1>
                <h1>{this.props.elevationGain} feet</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getTrail })(Trail);