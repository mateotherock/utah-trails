import React from 'react';
import './Review.css';
import StarRating from './../StarRating/StarRating.js';

const Review = (props) => (
        <div className="review_container">
            <div className="individual_review_heading">
                <img src={props.picture} className="individual_review_picture" alt="profile" />
                <div className="name_date_rating">
                    <div className="individual_review_name">{(props.trail) ? `On ${props.trail}, ${props.name} said...` : `${props.name} said...` }</div>
                    <div className="date_rating">
                        <div className="individual_review_date_rating">{props.date}</div>
                        <div className="individual_review_date_rating"><StarRating rating={props.rating} /></div>
                    </div>
                </div>
            </div>
            <p>{props.review}</p>
        </div>
)

export default Review;