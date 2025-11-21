import { useState } from "react";
import ForgetPassPic2 from "../../../assets/icons/forgetPssPic2.svg";
import { ArrowLeft } from "lucide-react";

export default function ForgetPasswordPage() {
    const [step, setStep] = useState(1);

    const next = () => setStep((s) => Math.min(s + 1, 3));
    const back = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side */}
            <div className="bg-[#FFEFED] flex flex-col justify-center items-center p-10">
                <img src="/logo.svg" alt="Brand" className="w-44 mb-6" />

                <h2 className="text-3xl font-bold text-gray-800 text-center">
                    Secure Password Recovery
                </h2>

                <p className="text-gray-600 text-center max-w-md mt-4">
                    Follow the simple steps to recover your account safely.
                </p>

                <div className="mt-10 flex flex-col gap-6">
                    <img src={ForgetPassPic2} className="w-70 h-70" />
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-center px-10 lg:px-24 relative">
                
                {/* Header */}
                <div className="flex items-center my-6 py-2">
                    <button onClick={back}>
                        <ArrowLeft className="stroke-gray-800 w-4.5 h-4.5" />
                    </button>

                    <h1 className="text-2xl font-bold text-gray-800 text-center flex-1">
                        {step === 1 && "Forget Password"}
                        {step === 2 && "Enter OTP"}
                        {step === 3 && "Reset Password"}
                    </h1>
                </div>

                {/* Step 1 */}
                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-4 rounded-xl bg-[#FFEFED] 
                                       border border-transparent
                                       focus:ring-2 focus:ring-[#FFB9B1] outline-none
                                       placeholder:text-black text-black"
                        />

                        <button
                            onClick={next}
                            className="mt-6 w-full py-4 rounded-xl font-medium text-black 
                                       bg-gradient-to-r 
                                       from-[#F87060] via-[#FCA38F] to-[#FFD9CC]"
                        >
                            Submit
                        </button>
                    </>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <>
                        <div className="flex justify-center gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <input
                                    key={i}
                                    maxLength={1}
                                    className="w-14 text-center text-2xl border rounded-xl py-3 
                                               bg-[#FFEFED] text-black
                                               focus:ring-2 focus:ring-[#FFB9B1] outline-none"
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="mt-6 w-full py-4 rounded-xl font-medium text-black 
                                       bg-gradient-to-r 
                                       from-[#F87060] via-[#FCA38F] to-[#FFD9CC]"
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-4 rounded-xl bg-[#FFEFED] mb-4 
                                       border border-transparent
                                       focus:ring-2 focus:ring-[#FFB9B1] outline-none
                                       text-black placeholder:text-black"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-4 rounded-xl bg-[#FFEFED] 
                                       border border-transparent
                                       focus:ring-2 focus:ring-[#FFB9B1] outline-none
                                       text-black placeholder:text-black"
                        />

                        <button
                            className="mt-6 w-full py-4 rounded-xl font-medium text-black 
                                       bg-gradient-to-r 
                                       from-[#F87060] via-[#FCA38F] to-[#FFD9CC]"
                        >
                            Reset Password
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}
