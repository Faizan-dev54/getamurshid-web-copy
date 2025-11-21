import { useRef } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useAuthController from "./useController";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Avatar,
  Checkbox,
  Badge,
  CalendarDate,
} from "@heroui/react";
import { DatePicker } from "@heroui/react";
import { UploadCloud } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { USER_TYPE } from "../../../utils/appEnums";
import { motion } from "framer-motion";


export default function SignInSignUpPage() {
  const location = useLocation();
  const returnTo = (location.state as any)?.from?.pathname as string | undefined;

  const {
    isAuthenticated,
    userType,
    loading,
    hasAccount,
    name,
    email,
    dob,
    password,
    confirmPassword,
    termsAccepted,
    profilePreviewUrl,
    isCreator,
    maxDob,
    fieldErrors,
    isFormValid,

    setPassword,
    setDob,
    onNavigation,
    setName,
    setEmail,
    setConfirmPassword,
    toggleTerms,
    onChangeProfile,
    setHasAccountWithReset,
    onSubmit,
    navigate,
  } = useAuthController();

  const fileRef = useRef<HTMLInputElement | null>(null);

  if (isAuthenticated) {
    if (returnTo) return <Navigate to={returnTo} replace />;
    return <Navigate to={isCreator ? "/creator" : "/fan"} replace />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 py-12 mt-10">
        <div className="order-2 lg:order-1 w-full max-w-ld mx-auto border">
          <Card shadow="sm" className="overflow-hidden rounded-xl">
            <CardHeader className="p-8 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {hasAccount === "signin" ? "Sign In" : "Create account"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {hasAccount === "signin"
                      ? "Welcome back — sign in to continue."
                      : "Join GetAMurshid and start connecting with experts."}
                  </p>
                </div>
                <Badge size="md" variant="flat" className="self-start">
                  {hasAccount === "signin" ? "Returning" : "New"}
                </Badge>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Account Type</label>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigation(USER_TYPE.FAN)}
                    className={`px-4 py-2 rounded-lg border ${userType === "fan" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
                      }`}
                  >
                    Fan
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigation(USER_TYPE.CREATOR)}
                    className={`px-4 py-2 rounded-lg border ${userType === "creator" ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
                      }`}
                  >
                    Creator
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardBody className="p-8 bg-white">
              <form onSubmit={onSubmit} className="space-y-4">
                {hasAccount === "signup" && (
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={profilePreviewUrl || undefined}
                      alt="profile"
                      size="lg"
                      className="ring-1 ring-gray-100"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <input
                          ref={fileRef}
                          accept="image/*"
                          type="file"
                          onChange={(e) => onChangeProfile(e.target.files)}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="p-2 border rounded-lg hover:bg-gray-100"
                        >
                          <UploadCloud />
                        </button>
                        <span className="text-sm text-gray-600">Upload profile photo</span>
                      </div>
                      {fieldErrors.profilePic && (
                        <div className="text-red-600 text-sm mt-2">{fieldErrors.profilePic}</div>
                      )}
                    </div>
                  </div>
                )}

                {hasAccount === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full name</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last name"
                      variant="bordered"
                    />
                    {fieldErrors.name && <div className="text-red-600 text-sm mt-1">{fieldErrors.name}</div>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    variant="bordered"
                    required
                  />
                  {fieldErrors.email && <div className="text-red-600 text-sm mt-1">{fieldErrors.email}</div>}
                </div>

                {hasAccount === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of birth</label>
                    <div className="relative mt-1">
                      <DatePicker
                        // label="Select date"
                        value={dob}
                        placeholderValue={maxDob}
                        maxValue={maxDob}
                        isReadOnly={false}
                        // suffix={<Calendar />}
                        onChange={(value: CalendarDate | null) => {
                          setDob(value);
                          if (!value) return;

                          let jsDate: Date;
                          if ("year" in value && "month" in value && "day" in value) {
                            jsDate = new Date(value.year, value.month - 1, value.day);
                          } else {
                            jsDate = new Date(String(value));
                          }

                          console.log("Selected date:", jsDate.toISOString().slice(0, 10));
                        }}
                      />
                    </div>
                    {fieldErrors.dob && <div className="text-red-600 text-sm mt-1">{fieldErrors.dob}</div>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    variant="bordered"
                    required
                  />
                  {fieldErrors.password && <div className="text-red-600 text-sm mt-1">{fieldErrors.password}</div>}
                  <div
                   onClick={() => navigate('/forgetPassword')}
                   style={{ cursor: 'pointer' }}
                   className="text-xs decoration-none text-sm mt-2"
                   >
                     {"Forgot Password?"}
                  </div>
                </div>

                {hasAccount === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      variant="bordered"
                    />
                    {fieldErrors.confirmPassword && (
                      <div className="text-red-600 text-sm mt-1">{fieldErrors.confirmPassword}</div>
                    )}
                  </div>
                )}

                {hasAccount === "signup" && (
                  <div className="flex items-start gap-2">
                    <Checkbox checked={termsAccepted} onChange={() => toggleTerms()} />
                    <div className="text-sm text-gray-700">
                      I accept the{" "}
                      <Link to="/terms" className="text-indigo-600 hover:underline">
                        Terms & Conditions
                      </Link>
                    </div>
                  </div>
                )}
                {fieldErrors.terms && <div className="text-red-600 text-sm">{fieldErrors.terms}</div>}
                {fieldErrors.general && <div className="text-red-600 text-sm">{fieldErrors.general}</div>}
                {/* {error && <div className="text-red-600 text-sm">{error}</div>} */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className={`w-full transition-opacity ${!isFormValid ? "opacity-80 cursor-not-allowed" : ""}`}
                    color="primary"
                    radius="lg"
                    size="lg"
                  >
                    {loading ? "Please wait..." : hasAccount === "signin" ? "Sign In" : "Create Account"}
                  </Button>
                </div>
              </form>
            </CardBody>

            <CardFooter className="bg-gray-50 p-6 flex flex-col gap-4 items-center">
              <div className="text-sm">
                {hasAccount === "signin" ? (
                  <>
                    Don’t have an account?{" "}
                    <button className="text-indigo-600 font-medium" onClick={() => setHasAccountWithReset("signup")}>
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button className="text-indigo-600 font-medium" onClick={() => setHasAccountWithReset("signin")}>
                      Sign In
                    </button>
                  </>
                )}
              </div>

              <div className="text-sm">
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  Back to Home
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="order-1 lg:order-2 px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Card className="overflow-hidden shadow-lg rounded-xl">
              <div className="p-10 bg-gradient-to-br from-indigo-50 to-purple-50">
                <h3 className="text-3xl font-bold">Welcome to GetAMurshid</h3>
                <p className="mt-3 text-gray-600">
                  Join as a fan or creator and start building meaningful connections.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6">
                  <div className="rounded-xl bg-white/60  p-6 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white shadow">
                      <Avatar size="md" src="/logo.svg" />
                    </div>
                    <div>
                      <div className="font-semibold">Verified Experts</div>
                      <div className="text-sm text-gray-600">Find carefully vetted mentors.</div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/60  p-6 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white shadow">
                    </div>
                    <div>
                      <div className="font-semibold">Flexible Scheduling</div>
                      <div className="text-sm text-gray-600">Book slots that suit you.</div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/60  p-6 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white shadow">
                      <UploadCloud />
                    </div>
                    <div>
                      <div className="font-semibold">Profile & Media</div>
                      <div className="text-sm text-gray-600">Show examples of your work.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/50 flex items-center justify-between">
                <div className="text-sm text-gray-600">Already on GetAMurshid?</div>
                <div>
                  <Button as={Link} to="/auth" variant="bordered" radius="lg" size="sm">
                    Learn more
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
