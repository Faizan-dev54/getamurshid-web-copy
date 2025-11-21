import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Card, Button, InputOtp } from "@heroui/react";
import { motion } from "framer-motion";
import useController from "./useController";
import ForgetPassPic2 from "../../../assets/icons/forgetPssPic2.svg";


export default function EmailVerification() {
  const {
    otp,
    loading,
    timer,
    resetBtn,
    errors,
    setOtp,
    onVerifyOTP,
    reSendOtp,
  } = useController();
   
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
      <Header />

      <div className="flex justify-center py-12 mt-10">
        <Card className="w-full max-w-lg p-10 rounded-3xl shadow-xl bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <img src={ForgetPassPic2} alt="Verification" className="w-48" />
            </div>

            <h1 className="text-3xl font-bold text-center mb-2">
              Email Verification
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Please enter the 6-digit verification code sent to your email.
            </p>
            <div className="flex justify-center mb-2 p-2 rounded-md">
              <InputOtp
                isRequired
                aria-label="OTP input field"
                placeholder="Enter code"
                name="otp"
                length={6}
                value={otp}
                onValueChange={setOtp}
                onComplete={(val) => setOtp(val)}
                className="gap-3"
              />
            </div>

            {errors.otp && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center text-sm mb-4"
              >
                {errors.otp}
              </motion.p>
            )}

            {!resetBtn ? (
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-center text-lg font-semibold text-gray-700 mt-4"
              >
                0:{timer.toString().padStart(2, "0")}
              </motion.div>
            ) : (
              <p className="text-center text-md font-semibold text-red-500 mt-4">
                OTP expired
              </p>
            )}

            {resetBtn && (
              <div className="text-center mt-4">
                <Button
                  variant="ghost"
                  onPress={reSendOtp}
                  className="text-blue-600 font-semibold underline"
                >
                  Resend OTP
                </Button>
              </div>
            )}

            <Button
              isLoading={loading}
              onPress={onVerifyOTP}
              className="w-full mt-8 bg-red-400 text-white text-lg py-6 rounded-xl"
            >
              Verify
            </Button>
          </motion.div>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
