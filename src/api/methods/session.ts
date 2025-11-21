import { postRequest } from "..";
import { authUrl } from "../urlHelpers";

export const signinAPI = (payload: any) => postRequest(`${authUrl()}/login`, payload);
export const signupAPI = (payload: any) =>
	postRequest(`${authUrl()}/register`, payload, {
		headers: {
			'Content-Type': payload instanceof FormData ? 'multipart/form-data' : 'application/json',
		},
	});
export const emailVerificationAPI = (payload: any) => {
	const query = payload?.isWebLogin ? "?isWebLogin=true" : "";
	return postRequest(`${authUrl()}/verify-email${query}`, payload);
};
export const resendOtpemailAPI = (payload: any) => postRequest(`${authUrl()}/resend-otp`, payload);

