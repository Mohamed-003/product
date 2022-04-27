import axios from 'axios';

export default axios.create({
	baseURL: 'https://cakepoint-backend.herokuapp.com/',
	// baseURL: 'http://localhost:5000/',
	headers: {
		'Content-type': 'application/json',
	},
	timeout: 20000,
});
