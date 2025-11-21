import { call, put } from 'redux-saga/effects';
import { signupAPI, signinAPI, emailVerificationAPI, resendOtpemailAPI } from '../../api/methods/session';
import { CommonPayload } from '../../utils/appModels';
import { AxiosResponse } from 'axios';
import { onSessionChange } from '../reducers/authReducer';
import { setToken } from '../reducers/jwtToken';


export function* signupAsync(action: CommonPayload): Generator {
  const { payload, onSuccess, onError } = action;
  try {
    const response: AxiosResponse = yield call(signupAPI, payload);
    const data = response?.data ?? response;

    console.log('signupAsync response:', data);

    yield put(setToken(data?.authentication?.jwt_token));
    // navigate('/signin');
    onSuccess?.(data);
  } catch (err: any) {
    const data = err?.response?.data;

    let message: any =
      data?.error ||
      err?.message ||
      'Signup failed';

    if (Array.isArray(data?.formErrors) && data.formErrors.length > 0) {
      message = data.formErrors.join(', ');
    } else if (data?.fieldErrors) {
      message = data.fieldErrors;
    }
    onError?.(
      data?.fieldErrors ? { fieldErrors: data.fieldErrors } : message
    );
  }
}

export function* signinAsync(action: CommonPayload): Generator {
  const { payload, onSuccess, onError } = action;
  try {
    console.log('signinAsync payload:', payload);

    const response: AxiosResponse = yield call(signinAPI, {
      ...payload,
      device_token: payload.device_token ?? 'web',
    });
    const data = response?.data ?? response;
    yield put(onSessionChange(data));
    onSuccess?.(data);

  } catch (err: any) {
    const data = err?.response?.data;

    let message: any =
      data?.error ||
      err?.message ||
      'Login failed';

    if (Array.isArray(data?.formErrors) && data.formErrors.length > 0) {
      message = data.formErrors.join(', ');
    } else if (data?.fieldErrors) {
      message = data.fieldErrors;
    }

    onError?.(
      data?.fieldErrors ? { fieldErrors: data.fieldErrors } : message
    );
  }
}


export function* emailVerificationAsync(action: CommonPayload): Generator {
  const { payload, onSuccess, onError } = action;
  try {
    // console.log('emailVerificationAsync-payload:', payload);

    const response: AxiosResponse = yield call(emailVerificationAPI, payload);
    // console.log("emailVerificationAsync", response)
    const data = response?.data ?? response;
    yield put(onSessionChange(data));
    onSuccess?.(data);
  } catch (error: any) {
    const data = error?.response?.data;

    let message: any = data?.error || error.message || "emailVerificationAsync failed";

    if (data?.formErrors?.length) {
      message = data.formErrors.join(", ");
    } else if (data?.fieldErrors) {
      message = data.fieldErrors;
    }

    onError?.(message);
    console.log('emailVerificationAsync-catch-error', JSON.stringify(message));
  }
}

export function* resendOtpEmailAsync({ payload, onSuccess, onError }: CommonPayload) {
  try {
    const response: AxiosResponse = yield call(resendOtpemailAPI, payload);
    // console.log("resendOtpEmailAsync", JSON.stringify(response))
    if(response){
      onSuccess?.(response.data)
      //  yield put(setLoading(false))
    }
    
  } catch (error: any) {
    //  yield put(setLoading(false))
    onError?.(error)
    console.log('resendOtpEmailAsync-error', error.response.data);
  } finally {
    // yield put(resetLoading())
  }
}

