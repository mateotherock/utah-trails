import React, { Component } from 'react';
import axios from 'axios';
import Header from './../Header/Header.js';
import MapContainer from './../MapContainer/MapContainer.js';
import './Home.css';
import StarRating from './../StarRating/StarRating.js';
import Review from './../Review/Review.js';
import User from './../User/User.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            featuredTrail: {},
            newUsers: [],
            newReviews: []
        }
    }

    componentDidMount() {
        axios.get('/api/featuredTrail').then(resp => {
            this.setState({ featuredTrail: resp.data[0] })
        })
        axios.get('/api/newReviews').then(resp => {
            this.setState({ newReviews: resp.data })
        })
        axios.get('/api/newUsers').then(resp => {
            this.setState({ newUsers: resp.data })
        })
    }

    goToTrail(url){
        this.props.history.push(url);
    }

    render() {

        const reviews = this.state.newReviews.map((review, index) => {
            let date = review.review_date.split('T')[0]
            return <Review key={index} trail={review.trail_name} name={review.first_name + " " + review.last_name} picture={review.profile_picture} date={date} review={review.review_text} rating={review.rating} />
        })

        const users = this.state.newUsers.map((user, index) => {
            let date = user.date_joined.split('T')[0]
            return <User key={index} name={user.first_name + " " + user.last_name} picture={user.profile_picture} date={date} />
        })

        return (
            <div>
                <header>
                    <Header />
                </header>
                {(this.state.featuredTrail.trail_img)
                ?
                <div onClick={_=> this.goToTrail(`/trail/${this.state.featuredTrail.trail_name}`)} style={{backgroundImage: "url(" + this.state.featuredTrail.trail_img + ")"}} className="featured_trail_image" alt="trail" >
                    <h2>Featured Trail: {this.state.featuredTrail.trail_name}</h2>
                    <h2>{this.state.featuredTrail.difficulty}</h2>
                    <h2>{this.state.featuredTrail.general_area}</h2>
                    <div className="featured_overall_rating" >Overall Rating: <StarRating style={{padding: "0 0 0 10px"}} typeof={"overallRating"} rating={Math.round(this.state.featuredTrail.avg)} width={'10%'} height={'15%'} /></div>
                </div>
                :
                <div>Loading Featured Trail ...</div>
                }
                <div className="home_body">
                    <MapContainer />
                </div>
                <div className="home_bottom">
                    <div className="new_reviews_users">
                        <div>
                            <h3>Recent Reviews:</h3>
                            {reviews}
                        </div>
                    </div>
                    <div className="new_reviews_users">
                        <div>
                            <h3>New Users:</h3>
                            {users}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}