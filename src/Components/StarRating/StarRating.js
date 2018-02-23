import React, { Component } from 'react';
import starNoFill from './../star-nofill.png';
import starFill from './../star-fill.png';
import { connect } from 'react-redux';
import { starTrail } from'./../../ducks/reducer.js';

class StarRating extends Component {

    render() {
        let star = null;
        if (this.props.userId) {
            if (this.props.rating === 1) {
                star = <div className="star_container">
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                        </div>
            } else if (this.props.rating === 2) {
                star = <div className="star_container">
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                        </div>
            } else if (this.props.rating === 3) {
                star = <div className="star_container">
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                        </div>
            } else if (this.props.rating === 4) {
                star = <div className="star_container">
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                        </div>
            } else if (this.props.rating === 5) {
                star = <div className="star_container">
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starFill} className="thumb_star" width="20%" alt="star rating" />
                        </div>
            } else if (this.props.typeof === 'myRating') {
                star = <div className="star_container">
                            <img src={starNoFill} onClick={(e) => { e.stopPropagation(); this.props.starTrail({ user_id: this.props.userId, trail_id: this.props.trailId, rating: 1 })}} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} onClick={(e) => { e.stopPropagation(); this.props.starTrail({ user_id: this.props.userId, trail_id: this.props.trailId, rating: 2 })}} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} onClick={(e) => { e.stopPropagation(); this.props.starTrail({ user_id: this.props.userId, trail_id: this.props.trailId, rating: 3 })}} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} onClick={(e) => { e.stopPropagation(); this.props.starTrail({ user_id: this.props.userId, trail_id: this.props.trailId, rating: 4 })}} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} onClick={(e) => { e.stopPropagation(); this.props.starTrail({ user_id: this.props.userId, trail_id: this.props.trailId, rating: 5 })}} className="thumb_star" width="20%" alt="star rating" />
                        </div>
            } else {
                star = <div className="star_container">
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                            <img src={starNoFill} className="thumb_star" width="20%" alt="star rating" />
                        </div>
            }
        }
        return (
            <div>
             {star}
            </div>
        )
    }
}

export default connect(null, { starTrail })(StarRating);