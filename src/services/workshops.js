import axios from 'axios';
export function fetchWorkshops(){
    return axios.get('https://workshops-server.herokuapp.com/workshops')
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(error => {
        throw error;
    })
}