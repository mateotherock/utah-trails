import React, { Component } from 'react';
import './TrailThumb.css';
import heartNoFill from './../heart-nofill.png';
import heartFill from './../heart-fill.png';
import { connect } from 'react-redux';
import { getHeartedTrails, heartTrail, unheartTrail, getStarredTrails, getOverallTrailRatings } from './../../ducks/reducer.js';
import StarRating from './../StarRating/StarRating.js';

class TrailThumb extends Component {

    componentDidMount() {
        if (this.props.user.user_id) {
            this.props.getHeartedTrails(this.props.user.user_id)
            this.props.getStarredTrails(this.props.user.user_id)
        }
        this.props.getOverallTrailRatings()
    }
    goToTrail(url){
        this.props.history.push(url);
    }
    render() {
        let heart = null;
        if (this.props.heartedTrails.includes(this.props.name)) {
            heart = <img src={heartFill} onClick={(e) => { e.stopPropagation(); this.props.unheartTrail({ user_id: this.props.user.user_id, trail_id: this.props.id })}} className="thumb_heart" width="10%" height="10%" alt="heart filled" />;
        } else {
            heart = <img src={heartNoFill} onClick={(e) => { e.stopPropagation(); this.props.heartTrail({ user_id: this.props.user.user_id, trail_id: this.props.id })}} className="thumb_heart" width="10%" height="10%" alt="heart not filled" /> 
        }

        let rating = this.props.starredTrails.find((trail) => trail.trail_id === this.props.id)
        rating = rating ? rating.rating : 0

        let overallRating = this.props.overallTrailRatings.find((trail) => trail.trail_id === this.props.id)
        overallRating = overallRating ? Math.round(overallRating.avg) : 0
    
        return (
            <div onClick={_=> this.goToTrail(`/trail/${this.props.name}`)} style={{textDecoration: 'none'}}><div style={{backgroundImage: "url(" + this.props.image + ")"}} className="thumb_container">
                <h1 className="thumb_name">{this.props.name}</h1>
                <h2 className="thumb_difficulty">{this.props.difficulty}</h2>
                <h2 className="thumb_area">{this.props.area}</h2>
                {(this.props.user.user_id) ?
                <div>
                    {heart}
                    <div className="thumb_rating">My Rating: <StarRating typeof={"myRating"} rating={rating} userId={this.props.user.user_id} trailId={this.props.id} width={'5%'} height={'10%'} /></div>
                    <div className="thumb_rating">Overall Rating: <StarRating typeof={"overallRating"} rating={overallRating} userId={this.props.user.user_id} trailId={this.props.id} width={'5%'} height={'10%'} /></div>
                </div>
                :
                <div className="thumb_rating" style={{paddingTop: 30}} >Overall Rating: <StarRating typeof={"overallRating"} rating={overallRating} userId={this.props.user.user_id} trailId={this.props.id} width={'5%'} height={'10%'} /></div>
                }
            </div></div>
        )
    }  
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getHeartedTrails, heartTrail, unheartTrail, getStarredTrails, getOverallTrailRatings })(TrailThumb);