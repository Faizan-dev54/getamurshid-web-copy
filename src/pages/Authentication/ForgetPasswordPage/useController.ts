// useController.ts
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 4;

export default function useController() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((s: any) => s.token?.jwt);

  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  const [otp, setOtp] = useState<string>("".padEnd(OTP_LENGTH, ""));
  const [otpError, setOtpError] = useState<string>("");

  const [secondsLeft, setSecondsLeft] = useState<number>(120);
  const [canResend, setCanResend] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string>("");

  const isValidEmail = useCallback((e: string) => {
    return /\S+@\S+\.\S+/.test(e);
  }, []);

  useEffect(() => {
    if (step !== 2) {
      setSecondsLeft(120);
      setCanResend(false);
      return;
    }
    if (secondsLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, secondsLeft]);

  const handleSendCode = async () => {
    setGeneralError("");
    if (!isValidEmail(email)) {
      setGeneralError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      // TODO: dispatch your send-OTP API / redux action
      await new Promise((r) => setTimeout(r, 600));

      setStep(2);
      setOtp("".padEnd(OTP_LENGTH, ""));
      setSecondsLeft(120);
      setCanResend(false);
    } catch (err: any) {
      setGeneralError(err?.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetOtp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    const padded = digits.padEnd(OTP_LENGTH, "");
    setOtp(padded);
    setOtpError("");
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    setGeneralError("");
    const digits = otp.replace(/\s/g, "");
    if (digits.length !== OTP_LENGTH) {
      setOtpError(`Please enter the ${OTP_LENGTH}-digit code.`);
      return;
    }

    setLoading(true);
    try {
      // TODO: dispatch verify OTP
      await new Promise((r) => setTimeout(r, 600));

      setStep(3);
    } catch (err: any) {
      setOtpError(err?.message || "Invalid code, try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setLoading(true);
    setGeneralError("");
    try {
      // TODO: dispatch resend OTP
      await new Promise((r) => setTimeout(r, 600));

      setSecondsLeft(120);
      setCanResend(false);
      setOtp("".padEnd(OTP_LENGTH, ""));
    } catch (err: any) {
      setGeneralError(err?.message || "Could not resend. Try later.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmNewPassword = async () => {
    setPasswordError("");
    setGeneralError("");

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // TODO: dispatch reset password
      await new Promise((r) => setTimeout(r, 800));

      // Reset flow & navigate
      setStep(1);
      setEmail("");
      setOtp("".padEnd(OTP_LENGTH, ""));
      setPassword("");
      setConfirmPassword("");
      navigate("/sign-in");
    } catch (err: any) {
      setGeneralError(err?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setGeneralError("");
    if (step === 1) {
      navigate(-1);
    } else {
      setStep((s) => s - 1);
    }
  };

  return {
    step,
    email,
    otp,
    secondsLeft,
    canResend,
    password,
    confirmPassword,
    loading,
    generalError,
    otpError,
    passwordError,

    setEmail,
    handleSetOtp,
    setPassword,
    setConfirmPassword,

    handleSendCode,
    handleVerifyOtp,
    handleResendOtp,
    handleConfirmNewPassword,
    goBack,
  };
}
