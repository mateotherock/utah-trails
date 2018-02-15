import axios from 'axios';

let initialState = {
    trailName: '',
    trailDifficulty: '',
    averageRating: '',
    trailDescription: '',
    generalArea: '',
    trailLength: 0,
    elevationGain: 0,
    trailImage: '',
    trailheadLat: 0,
    trailheadLng: 0,
    trailsToRender: [],
    trailTags: []
}

const GET_TRAIL = 'GET_TRAIL';
const GET_TRAILS = 'GET_TRAILS';
const FILTER_TRAILS = 'FILTER_TRAILS';
const GET_TRAIL_TAGS = 'GET_TRAIL_TAGS';

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

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRAIL + '_FULFILLED':
            return Object.assign({}, state, { trailName: action.payload.trail_name,
                                                trailDifficulty: action.payload.difficulty,
                                                averageRating: action.payload.average_rating,
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
             return Object.assign({}, state, { trailTags:action.payload })
        default:
            return state;
    }
}