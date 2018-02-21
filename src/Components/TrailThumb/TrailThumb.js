import React, { Component } from 'react';
import './TrailThumb.css';
import heartNoFill from './../heart-nofill.png';
import heartFill from './../heart-fill.png';
import starNoFill from './../star-nofill.png';
import starFill from './../star-fill.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHeartedTrails, heartTrail, unheartTrail, getStarredTrails } from './../../ducks/reducer.js';

class TrailThumb extends Component {

    componentDidMount() {
        if (this.props.user.user_id) {
            this.props.getHeartedTrails(this.props.user.user_id)
            this.props.getStarredTrails(this.props.user.user_id)
        }
    }
    goToTrail(url){
        this.props.history.push(url);
    }
    render() {
        let heart = null;
        if (this.props.user.user_id) {
            if (this.props.heartedTrails.includes(this.props.name)) {
                heart = <img src={heartFill} onClick={(e) => { e.stopPropagation(); this.props.unheartTrail({ user_id: this.props.user.user_id, trail_id: this.props.id })}} className="thumb_heart" width="10%" height="15%" />;
            } else {
                heart = <img src={heartNoFill} onClick={(e) => { e.stopPropagation(); this.props.heartTrail({ user_id: this.props.user.user_id, trail_id: this.props.id })}} className="thumb_heart" width="10%" height="15%" /> 
            }
        }

        let star = null;
        if (this.props.user.user_id) {
            star = this.props.starredTrails.map((starredTrail => {
                if (starredTrail.rating === 1 && starredTrail.trail_id === this.props.id) {
                    return <div className="star_container">
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                            </div>
                } else if (starredTrail.rating === 2 && starredTrail.trail_id === this.props.id) {
                    return <div className="star_container">
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                            </div>
                } else if (starredTrail.rating === 3 && starredTrail.trail_id === this.props.id) {
                    return <div className="star_container">
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                            </div>
                } else if (starredTrail.rating === 4 && starredTrail.trail_id === this.props.id) {
                    return <div className="star_container">
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                            </div>
                } else if (starredTrail.rating === 5 && starredTrail.trail_id === this.props.id) {
                    return <div className="star_container">
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starFill} className="thumb_star" width="10%" height="15%"/>
                            </div>
                } else {
                    return <div className="star_container">
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                                <img src={starNoFill} className="thumb_star" width="10%" height="15%"/>
                            </div>
                }
            }))
        }

        return (
            <div onClick={_=> this.goToTrail(`/trail/${this.props.name}`)} style={{textDecoration: 'none'}}><div style={{backgroundImage: "url(" + this.props.image + ")"}} className="thumb_container">
                <h1 className="thumb_name">{this.props.name}</h1>
                <h2 className="thumb_difficulty">{this.props.difficulty}</h2>
                <h2 className="thumb_area">{this.props.area}</h2>
                {heart}
                {star}
            </div></div>
        )
    }  
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getHeartedTrails, heartTrail, unheartTrail, getStarredTrails })(TrailThumb);