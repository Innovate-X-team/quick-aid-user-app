import axios from 'axios';

const verifyJWT = (jwt) => {
    axios.post('http://192.168.0.102:8000/api/verify-jwt', {
        'JWT': jwt,
    }).then(response=> {
        return response.status;
    });
};

export default verifyJWT;
