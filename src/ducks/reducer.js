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
    trailsToRender: []
}

const GET_TRAIL = 'GET_TRAIL';
const GET_TRAILS = 'GET_TRAILS';
const FILTER_TRAILS = 'FILTER_TRAILS';

export function getTrail(id) {
    const trail = axios.get(`/api/trail/${id}`).then(resp => {
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
    console.log(obj)
    const trails = axios.post('/api/trails', obj).then(resp => {
        return resp.data;
    })
    return {
        type: FILTER_TRAILS,
        payload: trails
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
                                                trailImage: action.payload.trail_img
             })
        case GET_TRAILS + '_FULFILLED':
             return Object.assign({}, state, { trailsToRender: action.payload })
        case FILTER_TRAILS + '_FULFILLED':
             return Object.assign({}, state, { trailsToRender: action.payload })
        default:
            return state;
    }
}