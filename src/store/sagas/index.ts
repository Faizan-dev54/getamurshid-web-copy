import { all, takeLatest } from "redux-saga/effects";
import {
  SIGNUP_REQUEST,
  SIGNIN_REQUEST,
  EMAIL_VERIFICATION_REQUEST,
  RESEND_OTP_REQUEST
} from "../actions/types";
import {
  signupAsync,
  signinAsync,
  emailVerificationAsync,
  resendOtpEmailAsync
} from "./session";

export default function* rootSaga() {
  yield all([
    takeLatest(SIGNUP_REQUEST as any, signupAsync),
    takeLatest(SIGNIN_REQUEST as any, signinAsync),
    takeLatest(EMAIL_VERIFICATION_REQUEST as any, emailVerificationAsync),
    takeLatest(RESEND_OTP_REQUEST as any, resendOtpEmailAsync),

    


  ]);
}