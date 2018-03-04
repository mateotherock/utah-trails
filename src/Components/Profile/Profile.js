import React, { Component } from 'react';
import axios from 'axios';
import Header from './../Header/Header.js';
import Review from './../Review/Review.js';
import TrailThumb from './../TrailThumb/TrailThumb.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, addName, addDesc, addPicUrl, getIndividualHeartedTrails } from './../../ducks/reducer.js';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            desc: '',
            picUrl: '',
            editName: false,
            editDesc: false,
            editPic: false,
            individualReviews: []
        }
    }

    componentWillMount() {
        this.props.getUser()
    }

    componentDidMount() {
        // if (!this.props.user.user_id) {
        //     this.props.history.push('/')
        // }
        if (this.props.user.user_id) {
            this.props.getIndividualHeartedTrails(this.props.user.user_id);
            axios.get(`/api/individualReviews/${this.props.user.user_id}`).then(resp => {
                this.setState({ individualReviews: resp.data })
            })
        }
    }
    
    render() {

        if(this.props.user.date_joined) {
            var dateJoined = this.props.user.date_joined.split('T')[0];
        }

        const reviews = this.state.individualReviews.map((review, index) => {
            let date = review.review_date.split('T')[0]
            return <Link to={`/trail/${review.trail_name}`} style={{textDecoration: 'none', color: 'black'}} ><Review key={index} trail={review.trail_name} name={'you'} picture={review.profile_picture} date={date} review={review.review_text} rating={review.rating} /></Link>
        })

        const trails = this.props.individualTrailsToRender.map((trail) =>
            <TrailThumb key={trail.trail_id} 
                        id={trail.trail_id}
                        image={trail.trail_img} 
                        name={trail.trail_name}
                        difficulty={trail.difficulty}
                        area={trail.general_area} 
                        history={this.props.history}/>      
        )

        return (
            <div>
                <Header />
                <div className="profile_card">
                    <div className="profile_card_top">
                        <div className="name_join_date">
                            {(this.props.user.first_name && this.props.user.last_name) 
                            ? 
                            (this.state.editName === false) 
                            ? 
                            <h1 onClick={() => this.setState({ editName: true })}>{this.props.user.first_name} {this.props.user.last_name} </h1>
                            :
                            <form className="edit_name_form">
                                First Name:  <input type="text" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                Last Name: <input type="text" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                <button type='submit' onClick={() => {this.props.addName({firstName: this.state.firstName, lastName: this.state.lastName, id: this.props.user.user_id}); this.setState({ editName: false })}}>Update</button>
                            </form>
                            :
                            <form className="edit_name_form">
                                <p>What is your name?</p>
                                First Name:  <input type="text" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
                                Last Name: <input type="text" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
                                <button type='submit' onClick={() => {this.props.addName({firstName: this.state.firstName, lastName: this.state.lastName, id: this.props.user.user_id}); this.setState({ editName: false })}}>Update</button>
                            </form>
                            }
                            Joined: {dateJoined}
                        </div>
                        <div className="profile_card_image">
                            <img onClick={() => this.setState({editPic: true})} src={this.props.user.profile_picture} className="profile_image" alt="profile" />
                            {(!this.state.editPic) 
                            ?
                            null
                            :
                            <form className="profile_new_url">
                                URL of new picture: <input type="text" value={this.state.picUrl} onChange={(e) => this.setState({ picUrl: e.target.value })} />
                                <button onClick={() => {this.props.addPicUrl({ url: this.state.picUrl, id: this.props.user.user_id}); this.setState({ editPic: false })}}type='submit'>Update</button>
                            </form>
                            }
                        </div>
                    </div>
                    <div className="profile_card_bottom">
                        {(this.props.user.user_overview)
                        ?
                        (this.state.editDesc === false)
                        ?
                        <div onClick={() => this.setState({editDesc: true})}>{this.props.user.user_overview}</div>
                        :
                        <div className="profile_desc">
                            <h5>Tell us about yourself</h5>
                            <textarea className="edit_desc" value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value})} onKeyDown={(e) => {if(e.key === "Enter") {this.props.addDesc({id: this.props.user.user_id, desc: this.state.desc}); this.setState({ editDesc: false })}}}></textarea>
                        </div>
                        :
                        <div className="profile_desc">
                            <h5>Tell us about yourself</h5>
                            <textarea className="edit_desc" value={this.state.desc} onChange={(e) => this.setState({ desc: e.target.value})} onKeyDown={(e) => {if(e.key === "Enter") {this.props.addDesc({id: this.props.user.user_id, desc: this.state.desc}); this.setState({ editDesc: false })}}}></textarea>
                        </div>
                        }
                    </div>
                </div>
                <div className="profile_bottom">
                    <div className="new_reviews_users">
                        <div>
                            <h3>Your Reviews:</h3>
                            <h3></h3>
                            {reviews}
                        </div>
                    </div>
                    <div className="new_reviews_users">
                        <div>
                            <h3>Your Hearted Trails:</h3>
                            {trails}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getUser, addName, addDesc, addPicUrl, getIndividualHeartedTrails })(Profile);