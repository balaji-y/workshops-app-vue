import axios from 'axios';

export function fetchWorkshop(id){
    return axios.get(`https://workshops-server.herokuapp.com/workshops/${id}`)
    .then(response => {
        return response.data
    })
    .catch(error=>{
        throw error;
    })
}

export function fetchWorkshopSessions(id){
    return axios.get(`https://workshops-server.herokuapp.com/workshops/${id}/sessions`)
    .then(response => {
        return response.data;
    })
    .catch(error =>{
        throw error;
    })
}

export function upvoteSession(sessionId){
    return axios.put(`https://workshops-server.herokuapp.com/sessions/${sessionId}/upvote`)
    .then( response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    })
}

export function downvoteSession(sessionId){
    return axios.put(`https://workshops-server.herokuapp.com/sessions/${sessionId}/downvote`)
    .then( response => {
        return response.data;
    })
    .catch(error => {
        throw error;
    })
}