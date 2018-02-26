import React, { Component } from 'react';
import axios from 'axios';
import Header from './../Header/Header.js';
import heartNoFill from './../heart-nofill.png';
import heartFill from './../heart-fill.png';
import { connect } from 'react-redux';
import { getTrail, getTrailTags, submitReview, heartTrail, unheartTrail, getTrailReviews } from './../../ducks/reducer.js';
import './Trail.css';
import StarRating from './../StarRating/StarRating.js';
import Review from './../Review/Review.js';

class Trail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trailRating: 0,
            overallTrailRating: 0,
            review: '',
            heartedTrail: false
        }
        this.getTrailRating = this.getTrailRating.bind(this);
        this.getOverallTrailRating = this.getOverallTrailRating.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.getHeartedTrail = this.getHeartedTrail.bind(this);
    }
    componentDidMount() {
        this.props.getTrail(this.props.match.params.name)
        this.props.getTrailTags(this.props.match.params.name)
        this.props.getTrailReviews(this.props.match.params.name)
    }

    componentWillReceiveProps(nextProps){
        if (this.props.user.user_id) {
            this.getTrailRating({ trailName: this.props.match.params.name, userId: this.props.user.user_id});
            this.getHeartedTrail({ trailName: this.props.match.params.name, userId: this.props.user.user_id })
        }
        this.getOverallTrailRating(this.props.match.params.name);
    }

    getTrailRating(obj) {
        axios.post('/api/trailRating', obj).then(resp => {
            this.setState ({
                trailRating: resp.data[0].rating
            })
            return resp.data[0].rating;
        });
    }

    getOverallTrailRating(name) {
        axios.get(`/api/overallTrailRating/${name}`).then(resp => {
            var otr = Math.round(resp.data[0].avg);
            this.setState ({
                overallTrailRating: otr
            })
        });
    }

    getHeartedTrail(obj) {
        axios.post('/api/heartedTrail', obj).then(resp => {
            this.setState ({
                heartedTrail: resp.data[0].exists
            })
        });
    }

    submitReview(e) {
        e.preventDefault()
        this.props.submitReview({
            userId: this.props.user.user_id,
            trailId: this.props.trailId,
            reviewText: this.state.review
        })
        this.setState({
            review: ''
        })
    }

    render() {

        const reviews = this.props.trailReviews.map((review, index) => {
            let date = review.review_date.split('T')[0]
            return <Review key={index} name={review.first_name + " " + review.last_name} picture={review.profile_picture} date={date} review={review.review_text} rating={review.rating} />
        })

        const tags = this.props.trailTags.map((tag, index) => 
            <span key={index} className="tag">{tag}</span>
        )

        let heart = null;
        if (this.state.heartedTrail) {
            heart = <img src={heartFill} onClick={(e) => { e.stopPropagation(); this.props.unheartTrail({ user_id: this.props.user.user_id, trail_id: this.props.trailId })}} width="10%" height="15%" alt="heart filled" />;
        } else {
            heart = <img src={heartNoFill} onClick={(e) => { e.stopPropagation(); this.props.heartTrail({ user_id: this.props.user.user_id, trail_id: this.props.trailId })}} width="10%" height="15%" alt="heart not filled" /> 
        }

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
                    <div style={{backgroundImage: "url(" + this.props.trailImage + ")"}} className="trail_image" alt="trail" >
                        {(this.props.user.user_id) ?
                        <div className="heart_and_ratings">
                            {heart}
                            <div className="my_rating">My Rating: <StarRating typeof={"myRating"} rating={this.state.trailRating} userId={this.props.user.user_id} trailId={this.props.trailId} width={'10%'} height={'15%'} /></div>
                            <div className="overall_rating">Overall Rating: <StarRating typeof={"overallRating"} rating={this.state.overallTrailRating} userId={this.props.user.user_id} trailId={this.props.trailId} width={'10%'} height={'15%'} /></div>
                        </div>
                        :
                        <div className="overall_rating">Overall Rating: <StarRating typeof={"overallRating"} rating={this.state.overallTrailRating} userId={this.props.user.user_id} trailId={this.props.trailId} width={'10%'} height={'15%'} /></div>
                        }
                    </div>
                    <p className="trail_description">{this.props.trailDescription}</p>
                    <a href={`https://www.google.com/maps/dir/Current+Location/${this.props.trailheadLat},${this.props.trailheadLng}`} target="_blank" alt="Google Maps Link">Get directions to Trailhead</a>
                </div>
                {(this.props.user.user_id) ?
                <div className="review_container">
                    <h2>Write a Review</h2>
                    <form onSubmit={this.submitReview}>
                        <div className="review_row">
                            <div className="col_75">
                                <textarea id="review" value={this.state.review} name="review" placeholder="What did you think of the hike?" style={{height: '200px'}} onChange={(e) => this.setState({ review: e.target.value })} ></textarea>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                        <button type="reset" onClick={() => {this.setState({review: ''})}}>Cancel</button>
                    </form>
                </div>
                :
                null}
                {reviews}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getTrail, getTrailTags, submitReview, heartTrail, unheartTrail, getTrailReviews })(Trail);