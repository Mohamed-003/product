import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import payment from './payment';
import products from './products';

const reducers = combineReducers({
	alert: alert,
	auth: auth,
	products: products,
	payment: payment
});

export default reducers;

export type State = ReturnType<typeof reducers>;
