import {
	EMAIL_VERIFICATION_REQUEST,
	RESEND_OTP_REQUEST,
	SIGNIN_REQUEST,
	SIGNUP_REQUEST
} from './types';
import { CommonPayload } from '../../utils/appModels';

export const signupRequest = (payload: CommonPayload) => ({
	type: SIGNUP_REQUEST,
	...payload,
});

export const signinRequest = (payload: CommonPayload) => ({
	type: SIGNIN_REQUEST,
	...payload,
});

export const emailVerificationRequest = (payload: CommonPayload) => ({
	type: EMAIL_VERIFICATION_REQUEST,
	...payload,
});

export const resendOtpRequest = (payload: CommonPayload) => ({
	type: RESEND_OTP_REQUEST,
	...payload,
});