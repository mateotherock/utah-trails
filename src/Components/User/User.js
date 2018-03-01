import React from 'react';
import './User.css';

const User = (props) => (
        <div className="user_container">
            <img src={props.picture} className="user_picture" alt="profile" />
            <div className="user_name_date">{props.name} joined on {props.date}</div>
        </div>
)

export default User;