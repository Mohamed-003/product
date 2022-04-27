import { Actiontype } from "../action-types/types";
import { buttonDisable } from "../actions/payment";
import {PaymentAction} from "./interfaces"

interface paymentState {
    razorpayOrderObject:any;
    loading:boolean;
    orderCreated:boolean;
    orderSuccessResponse: any;
    paymentSuccess: boolean | null;
    paymentSuccessObject:any;
    paymentFailureObject:any;
    buttonDisable:boolean
}

const initialState = {
    razorpayOrderObject: null,
    loading:true,
    orderCreated:false,
    orderSuccessResponse:null,
    paymentSuccess:null,
    paymentSuccessObject:null,
    paymentFailureObject:null,
    buttonDisable:false
}

export default function (state:paymentState = initialState,action:PaymentAction){
    switch(action.type){
        case Actiontype.CREATE_RAZORPAY_ORDER:
            return{
                ...state,
                loading:false,
                orderCreated:true,
                razorpayOrderObject:action.payload
            };
        case Actiontype.RAZORPAY_ORDER_CREATION_FAILURE:
            return{
                ...state,
                loading:false,
                orderCreated:false,
                razorpayOrderObject:null
            };
        case Actiontype.PAYMENT_SUCCESS:
            return{
                ...state,
                loading:false,
                paymentSuccess:true,
                paymentSuccessObject:action.payload
            }
        case Actiontype.PAYMENT_FAILURE:
            return{
                ...state,
                loading:false,
                paymentSuccess:false,
                paymentFailureObject:action.payload
            }
            case Actiontype.PAYMENT_BUTTON_DISABLE:
                return{
                    ...state,
                    loading:false,
                    buttonDisable:true,
                }
            case Actiontype.PAYMENT_BUTTON_ENABLE:
                return{
                    ...state,
                    loading:false,
                    buttonDisable:false,
                }
        default:
			return state;
    }
}