import axios from 'axios';

let initialState = {
    user: {
        user_id: null
    },
    trailId: null,
    trailName: '',
    trailDifficulty: '',
    trailDescription: '',
    generalArea: '',
    trailLength: 0,
    elevationGain: 0,
    trailImage: '',
    trailheadLat: 0,
    trailheadLng: 0,
    trailsToRender: [],
    trailTags: [],
    heartedTrails: [],
    starredTrails: [],
    overallTrailRatings: [],
    trailReviews: []
}

const GET_TRAIL = 'GET_TRAIL';
const GET_TRAILS = 'GET_TRAILS';
const FILTER_TRAILS = 'FILTER_TRAILS';
const GET_TRAIL_TAGS = 'GET_TRAIL_TAGS';
const GET_USER = 'GET_USER';
const ADD_NAME = 'ADD_NAME';
const GET_HEARTED_TRAILS = 'GET_HEARTED_TRAILS';
const HEART_TRAIL = 'HEART_TRAIL';
const UNHEART_TRAIL = 'UNHEART_TRAIL';
const GET_STARRED_TRAILS = 'GET_STARRED_TRAILS';
const STAR_TRAIL = 'STAR_TRAIL';
const GET_OVERALL_TRAIL_RATINGS = 'GET_OVERALL_TRAIL_RATINGS';
const SUBMIT_REVIEW = 'SUBMIT_REVIEW'

export function getUser() {
    const user = axios.get('/auth/me').then(res => {
        return res.data;
    })

    return {
        type: GET_USER,
        payload: user
    }
}

export function addName(obj) {
    const user = axios.post('/api/addName', obj).then(resp => {
        return resp.data[0]
    })
    return {
        type: ADD_NAME,
        payload: user
    }
}

export function getTrail(name) {
    const trail = axios.get(`/api/trail/${name}`).then(resp => {
        return resp.data;
    });
    return {
        type: GET_TRAIL,
        payload: trail
    }
}

export function getTrails() {
    const trails = axios.get('/api/trails').then(resp => {
        return resp.data;
    });
    return {
        type: GET_TRAILS,
        payload: trails
    }
}

export function filterTrails(obj) {
    const trails = axios.post('/api/trails', obj).then(resp => {
        return resp.data;
    })
    return {
        type: FILTER_TRAILS,
        payload: trails
    }
}

export function getTrailTags(name) {
    const tags = axios.get(`/api/tags/${name}`).then(resp => {
        return resp.data;
    });
    return {
        type: GET_TRAIL_TAGS,
        payload: tags
    }
}

export function getHeartedTrails(id) {
    const heartedTrails = axios.get(`/api/heartedTrails/${id}`).then(resp => {
        let trailNames = resp.data.map(object => object.trail_name)
        return trailNames;
    })
    return {
        type: GET_HEARTED_TRAILS,
        payload: heartedTrails
    }
}

export function heartTrail(obj) {
    const heartedTrails = axios.post('/api/heartTrail', obj).then(resp => {
        let trailNames = resp.data.map(object => object.trail_name)
        return trailNames;
    })
    return {
        type: HEART_TRAIL,
        payload: heartedTrails
    }
}

export function unheartTrail(obj) {
    console.log(obj)
    const heartedTrails = axios.post('/api/unheartTrail', obj).then(resp => {
        let trailNames = resp.data.map(object => object.trail_name)
        return trailNames;
    })
    return {
        type: UNHEART_TRAIL,
        payload: heartedTrails
    }
}

export function getStarredTrails(id) {
    const starredTrails = axios.get(`/api/starredTrails/${id}`).then(resp => {
        return resp.data;
    })
    return {
        type: GET_STARRED_TRAILS,
        payload: starredTrails
    }
}

export function starTrail(obj) {
    const starredTrails = axios.post('/api/starTrail', obj).then(resp => {
        return resp.data;
    })
    return {
        type: STAR_TRAIL,
        payload: starredTrails
    }
}

export function getOverallTrailRatings() {
    const overallTrailRatings = axios.get('/api/trailRatings').then(resp => {
        return resp.data
    })
    return {
        type: GET_OVERALL_TRAIL_RATINGS,
        payload: overallTrailRatings
    }
}

export function submitReview(obj) {
    const reviews = axios.post('/api/submitReview', obj).then(resp => {
        return resp.data
    })
    return {
        type: SUBMIT_REVIEW,
        payload: reviews
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case ADD_NAME + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload })
        case GET_TRAIL + '_FULFILLED':
            return Object.assign({}, state, {   trailId: action.payload.trail_id,
                                                trailName: action.payload.trail_name,
                                                trailDifficulty: action.payload.difficulty,
                                                trailDescription: action.payload.trail_description,
                                                generalArea: action.payload.general_area,
                                                trailLength: action.payload.trail_length,
                                                elevationGain: action.payload.elevation_gain,
                                                trailheadLat: action.payload.trailhead_lat,
                                                trailheadLng: action.payload.trailhead_lng,
                                                trailImage: action.payload.trail_img
             })
        case GET_TRAILS + '_FULFILLED':
             return Object.assign({}, state, { trailsToRender: action.payload })
        case FILTER_TRAILS + '_FULFILLED':
             return Object.assign({}, state, { trailsToRender: action.payload })
        case GET_TRAIL_TAGS + '_FULFILLED':
             return Object.assign({}, state, { trailTags: action.payload })
        case GET_HEARTED_TRAILS + '_FULFILLED':
             return Object.assign({}, state, { heartedTrails: action.payload })
        case HEART_TRAIL + '_FULFILLED':
             return Object.assign({}, state, { heartedTrails: action.payload })
        case UNHEART_TRAIL + '_FULFILLED':
             return Object.assign({}, state, { heartedTrails: action.payload })
        case GET_STARRED_TRAILS + '_FULFILLED':
             return Object.assign({}, state, { starredTrails: action.payload })
        case STAR_TRAIL + '_FULFILLED':
             return Object.assign({}, state, { starredTrails: action.payload })
        case GET_OVERALL_TRAIL_RATINGS + '_FULFILLED':
             return Object.assign({}, state, { overallTrailRatings: action.payload})
        case SUBMIT_REVIEW + '_FULFILLED':
             return Object.assign({}, state, { trailReviews: action.payload })
        default:
            return state;
    }
}