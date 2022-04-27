import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import http from '../../utils/http-common';
import { Actiontype } from '../action-types/types';
import { setAlert } from './alert';
import { deleteCart, placeOrder } from './auth';

export const createRazorpayOrder = (
	cakepointOrderObject: any,
	user: any,
	setopen: any
) => {
	return async (dispatch: Dispatch) => {
		dispatch<any>(buttonDisable());
		const { orderItems, orderId } = cakepointOrderObject;
		const body = JSON.stringify({ orderItems, orderId });
		try {
			const res = await http.post('api/razorpay/payment-order', body);
			dispatch({ type: Actiontype.CREATE_RAZORPAY_ORDER, payload: res.data });

			const loadRazorPay = () => {
				return new Promise((resolve) => {
					const script = document.createElement('script');
					script.src = 'https://checkout.razorpay.com/v1/checkout.js';
					document.body.appendChild(script);
					script.onload = () => resolve(true);
					script.onerror = () => resolve(false);
				});
			};
			const scriptLoaded = await loadRazorPay();
			if (!scriptLoaded) {
				alert('Razor pay failed to load.Sorry for the inconvinience');
				dispatch<any>(
					setAlert(
						'Razor pay failed to load. Sorry for the inconvinience. Try again after some time.',
						'success'
					)
				);
				return;
			}
			let options = {
				key: process.env.RZP_LIVE_API_KEY,
				amount: res.data.amount,
				currency: 'INR',
				name: 'The Cake Point',
				description: 'Paying The Cake Point',
				image:
					'https://cakepoints3buckets.s3.ap-south-1.amazonaws.com/cakepoint-cakes/CAKEPOINT_LOGO.jpg',
				order_id: res.data.id,
				handler: function (response: {
					razorpay_payment_id: string;
					razorpay_order_id: string;
					razorpay_signature: string;
				}) {
					cakepointOrderObject.paymentDone = true;
					dispatch<any>(paymentSuccess(response));
					dispatch<any>(placeOrder(cakepointOrderObject, response));
					setopen(true);
					dispatch<any>(deleteCart());
				},
				modal: {
					ondismiss: function () {
						dispatch<any>(buttonEnable());
					},
				},
				prefill: {
					name: user.userName ? user.userName : '',
					email: '',
					contact: user.phoneNumber ? user.phoneNumber : '',
				},
				notes: {
					key: 'sdfsdfsfds',
				},
				theme: {
					color: '#de3838',
				},
			};
			const _window = window as any;
			var rzp1 = new _window.Razorpay(options);
			rzp1.open();
			rzp1.on('payment.failed', function (response: any) {
				dispatch<any>(paymentFailure(response.error));
			});
		} catch (error) {
			dispatch({ type: Actiontype.RAZORPAY_ORDER_CREATION_FAILURE });
		}
	};
};

export const paymentSuccess = (successObject: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: Actiontype.PAYMENT_SUCCESS, payload: successObject });
		dispatch<any>(setAlert('Payment Successful', 'success'));
	};
};

export const storePaymentDetails = (successObject: any, orderObject: any) => {
	return async (dispatch: Dispatch) => {
		const object = { ...successObject, orderId: orderObject.orderId };
		const body = JSON.stringify({ ...object });
		try {
			const res = await http.post('api/razorpay/payment-details', body);
			// if (res.status === 400) {
			// 	dispatch<any>(setAlert(res.data, 'error'));
			// 	return;
			// }
			res.data &&
				dispatch({ type: Actiontype.PAYMENT_SUCCESS, payload: res.data });
		} catch (err: any) {
			const errors = err.response.data.errors;
			console.log(err.response.data);
			if (errors) {
				errors.forEach((error: any) => {
					return dispatch<any>(setAlert(error.msg, 'error'));
				});
			}
		}
	};
};

export const paymentFailure = (FailureObject: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: Actiontype.PAYMENT_FAILURE, payload: FailureObject });
		dispatch<any>(setAlert(FailureObject.description, 'error'));
	};
};

export const buttonDisable = () => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: Actiontype.PAYMENT_BUTTON_DISABLE });
	};
};
export const buttonEnable = () => {
	return async (dispatch: Dispatch) => {
		dispatch({ type: Actiontype.PAYMENT_BUTTON_ENABLE });
	};
};
