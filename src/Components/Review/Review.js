import React from 'react';
import './Review.css';

const Review = (props) => (
        <div className="review_container">
            <div className="individual_review_heading">
                <img src={props.picture} className="individual_review_picture" />
                <div className="individual_review_name">{props.name} said:</div>
                <div className="individual_review_date_rating">{props.date}</div>
                {/* rating */}
            </div>
            <p>{props.review}</p>
        </div>
)

export default Review;