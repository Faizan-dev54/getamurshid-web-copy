import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailVerificationRequest, resendOtpRequest } from "../../../store/actions/session";
import { useNavigate } from "react-router-dom";

export default function useController() {
  const dispatch = useDispatch();

  const initialErrors = {
    otp: "",
    general: "",
  };
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resetBtn, setResetBtn] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const token = useSelector((state: any) => state.token.jwt);
  
  const validateOTP = (value: any) => {
    if (!value) return "OTP is required";
    if (value.length < 4) return "Enter valid OTP";
    return "";
  };

  
  const handleOTPChange = (value: any) => {
    setOtp(value);

    // remove otp error while typing
    // if (errors.otp) {
    //   setErrors({ ...errors, otp: "" });
    // }
    if (value.length === 4) {
      setErrors({ ...errors, otp: "" });
    }
  };

  
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimer(120);
    setResetBtn(false);
    setErrors(initialErrors);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setResetBtn(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  
  const onVerifyOTP = async () => {
    setLoading(true);

    const error = validateOTP(otp);
    if (error) {
      setErrors({ ...errors, otp: error });
      setLoading(false);
      return;
    }

    try {
      dispatch(emailVerificationRequest({
        payload: {
          otp: otp,
          token: token,
          isWebLogin: true
        },
        onSuccess: (data: any) => {
          const role = data?.user_type;

          if (role === "creator") {
            navigate("/creator", { replace: true });
          } else {
            navigate("/fan", { replace: true });
          }
        },
        onError: (err: any) => {
          console.log("otp error", err.message);

        },
      }) as any,
      );

      console.log("OTP Submitted:", otp);

      setErrors(initialErrors);
      setLoading(false);

    } catch (err) {
      setLoading(false);
      setErrors({ ...errors, otp: "Invalid OTP. Please try again." });
    }
  };

  
  const reSendOtp = async () => {
    setLoading(true);

    try {
      dispatch(resendOtpRequest({
        payload: {
          token: token,
          // isWebLogin: true
        },
        onSuccess: (data: any) => {
          console.log("otp success", data);
          // alert({ message: "OTP sent again to your email!" });
        },
        onError: (err: any) => {
          console.log("otp error", err.message);

        },
      }) as any,
      );

      console.log("OTP Resent");
      setLoading(false);
      startTimer();
    } catch (err) {
      setLoading(false);
      // alert({ message: "Failed to resend OTP." });
    }
  };

  return {
    otp,
    loading,
    errors,
    timer,
    resetBtn,

    handleOTPChange,
    navigate,
    onVerifyOTP,
    reSendOtp,
    setOtp
  };
}
