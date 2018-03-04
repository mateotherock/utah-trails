import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrails, filterTrails, filterTrailsByTag } from './../../ducks/reducer.js';
import Header from './../Header/Header.js';
import TrailThumb from './../TrailThumb/TrailThumb.js';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulty: '',
            area: '',
            length: 0,
            eGain: 0,
            rating: 'Select',
            tagsArray: []
        }
        this.filterTrailsByTag = this.filterTrailsByTag.bind(this);
        this.filterTrails = this.filterTrails.bind(this);
    }

    componentDidMount() {
        this.props.getTrails()
    }

    filterTrails(e) {
        e.preventDefault();
        let filterObj = Object.assign({}, this.state, {rating: this.state.rating === 'Select' ? 0 : this.state.rating})
        this.props.filterTrails(filterObj);
    }

    onChange(e) {
        const tags = this.state.tagsArray;
        let index;
        if (e.target.checked) {
            tags.push(+e.target.value)
        } else {
            index = tags.indexOf(+e.target.value)
            tags.splice(index, 1)
        }
        this.setState({ tagsArray: tags })
    }

    filterTrailsByTag(e) {
        e.preventDefault();
        this.props.filterTrailsByTag(this.state.tagsArray);
    }

    render() {

        const trails = this.props.trailsToRender.map((trail) =>
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
                <div>
                    <form className="search_form" onSubmit={this.filterTrails}>
                        Difficulty: <select className="search_form_element" name="difficulty" value={this.state.difficulty} onChange={(e) => this.setState({ difficulty: e.target.value })}>
                            <option value="Select" hidden default>Select</option>
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Hard">Hard</option>
                        </select>
                        Minimum Rating: <select className="search_form_element" name="rating" value={this.state.rating} onChange={(e) => this.setState({ rating: e.target.value })}>
                            <option value="Select" hidden default>Select</option>
                            <option value="0">0 Stars</option>
                            <option value="1">1 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                        Location: <select className="search_form_element" name="area" value={this.state.area} onChange={(e) => this.setState({ area: e.target.value })}>
                            <option value="Select" hidden default>Select</option>
                            <option value="Utah County">Utah County</option>
                            <option value="Grand County">Grand County</option>
                            <option value="Washington County">Washington County</option>
                            <option value="Salt Lake County">Salt Lake County</option>
                            <option value="Juab County">Juab County</option>
                        </select>
                        Max Length (Miles): <select className="search_form_element" name="length" value={this.state.length} onChange={(e) => this.setState({ length: e.target.value })}>
                            <option value="Select" hidden default>Select</option>  
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        Max Elevation Gain (Feet): <select className="search_form_element" name="eGain" value={this.state.eGain} onChange={(e) => this.setState({ eGain: e.target.value })}>
                            <option value="Select" hidden default>Select</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                            <option value="4000">4000</option>
                            <option value="5000">5000</option>
                        </select>
                        <button className="search_form_element" type="reset" onClick={() => {this.setState({difficulty: '', area: '', length: 0, eGain: 0, rating: 0})}}>Reset</button>
                        <button className="search_form_element" type="submit">Filter Results</button>
                    </form>
                </div>
                <div>
                    <form className="tag_filters" onSubmit={this.filterTrailsByTag}>
                        <label className="container">Lake
                            <input type="checkbox" value={1} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">River
                            <input type="checkbox" value={2} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Waterfall
                            <input type="checkbox" value={3} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Cave
                            <input type="checkbox" value={4} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Hot springs
                            <input type="checkbox" value={5} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Forest
                            <input type="checkbox" value={6} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Beach
                            <input type="checkbox" value={7} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Views
                            <input type="checkbox" value={8} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Kid friendly
                            <input type="checkbox" value={9} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Pet friendly
                            <input type="checkbox" value={10} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">No pets
                            <input type="checkbox" value={11} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Wheelchair friendly
                            <input type="checkbox" value={12} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Snowshoeing
                            <input type="checkbox" value={13} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Trail running
                            <input type="checkbox" value={14} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Fishing
                            <input type="checkbox" value={15} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Wildlife
                            <input type="checkbox" value={16} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Birding
                            <input type="checkbox" value={17} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Cross country skiing
                            <input type="checkbox" value={18} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Rock climbing
                            <input type="checkbox" value={19} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Historic site
                            <input type="checkbox" value={20} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Bridge
                            <input type="checkbox" value={21} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Flora
                            <input type="checkbox" value={22} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Sunset
                            <input type="checkbox" value={23} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Sunrise
                            <input type="checkbox" value={24} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Fresh water access
                            <input type="checkbox" value={25} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Swimming
                            <input type="checkbox" value={26} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>

                        <label className="container">Cliff jumping
                            <input type="checkbox" value={27} onChange={this.onChange.bind(this)} />
                            <span className="checkmark"></span>
                        </label>
                        <button className="search_form_element" type="reset" onClick={() => {this.setState({ tagsArray: [] })}}>Reset</button>
                        <button className="search_form_element" type="submit">Filter Results</button>
                    </form>
                </div>
                <div className="thumb_grid">{trails}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        trailsToRender: state.trailsToRender
    }
}

export default connect(mapStateToProps, { getTrails, filterTrails, filterTrailsByTag })(Search);