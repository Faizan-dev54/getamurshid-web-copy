import { useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { PersistPartial } from 'redux-persist/es/persistReducer';
import { signupRequest, signinRequest } from '../../../store/actions/session';
import type { AuthState } from '../../../store/reducers/authReducer';
import { cleanEmail, isEmailValid } from '../../../utils/appValidations';
import { CalendarDate, DateValue, today } from "@internationalized/date";
import { getDeviceToken } from '../../../api/fireBaseConfig';
import { useNavigate } from 'react-router-dom';
import { setUserType } from '../../../store/reducers/userType';
import { USER_TYPE } from '../../../utils/appEnums';
import { RootState } from '../../../store/rootReducer';

export type AuthMode = 'signin' | 'signup';
export type UserType = 'fan' | 'creator';

const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
const PASSWORD_LETTER_REGEX = /[a-zA-Z]/;

export function useAuthController() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s: RootState) => s.auth) as AuthState & PersistPartial;
  const userType = useSelector((state: RootState) => state.userType.userType);
  const isAuthenticated = auth.isSignedIn;
  const role = auth.sessionData?.role;
  const [loading, setLoading] = useState(false);
  const [hasAccount, setHasAccount] = useState<AuthMode>('signin');
  // const [userType, setUserType] = useState<UserType>('fan');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState<CalendarDate | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [deviceToken, setDeviceToken] = useState<string>('web');
  const isCreator = useMemo(() => role === 'creator', [role]);
  

  useEffect(() => {
    clearErrors();
  }, []);

  useEffect(() => {
    clearErrors();
  }, [hasAccount]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = await getDeviceToken();
        if (mounted && token) {
          console.log('FCM device token:', token);
          setDeviceToken(token);
        }
      } catch (err) {
        console.warn('Failed to get FCM token, using fallback "web"', err);
        if (mounted) setDeviceToken('web');
      }
    })();
    return () => { mounted = false; };
  }, []);


  const isFormValid = useMemo(() => {
    const cleanedEmail = cleanEmail(email || '');

    if (hasAccount === 'signup') {
      return (
        name.trim().length >= 3 &&
        cleanedEmail.length > 0 &&
        isEmailValid(cleanedEmail) &&
        dob !== null &&
        password.length >= 8 &&
        confirmPassword.length >= 8 &&
        termsAccepted
      );
    }

    return cleanedEmail.length > 0 && isEmailValid(cleanedEmail) && password.length > 0;
  }, [hasAccount, name, email, dob, password, confirmPassword, termsAccepted]);

  const maxDob = useMemo(() => {
    const d = today(Intl.DateTimeFormat().resolvedOptions().timeZone);
    return new CalendarDate(d.year - 13, d.month, d.day);
  }, []);

  const validateName = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Full name is required';
    if (trimmed.length < 3) return 'Name must be at least 3 characters';
    const words = trimmed.split(/\s+/);
    if (words.length < 2) return 'Please enter first and last name';
    return '';
  };

  const validateEmail = (value: string) => {
    const cleaned = cleanEmail(value);
    if (!cleaned) return 'Email is required';
    if (!isEmailValid(cleaned)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (value: string, isSignup: boolean) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!PASSWORD_LETTER_REGEX.test(value)) return isSignup ? 'Password must contain at least one letter' : 'Invalid credentials';
    if (!PASSWORD_SPECIAL_REGEX.test(value)) return isSignup ? 'Password must contain at least one special character' : 'Invalid credentials';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return 'Confirm password is required';
    if (value !== password) return 'Passwords do not match';
    return '';
  };

  const validateDob = (value: DateValue | null) => {
    if (!value) return 'Date of birth is required';
    
    if (!('year' in value && 'month' in value && 'day' in value)) {
      return 'Invalid date format';
    }
    
    const selected = new Date(value.year, value.month - 1, value.day);
    const minAllowed = new Date();
    minAllowed.setFullYear(minAllowed.getFullYear() - 13);
    
    if (selected > minAllowed) return 'You must be at least 13 years old';
    return '';
  };

  const validateTerms = (value: boolean) => {
    if (!value) return 'You must accept Terms & Conditions';
    return '';
  };

  const clearErrors = () => setFieldErrors({});

  const onProfileFileChange = (file?: File | null) => {
    if (!file) {
      setProfileFile(null);
      setProfilePreviewUrl(null);
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.profilePic;
        return updated;
      });
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size && file.size > maxSize) {
      setFieldErrors(prev => ({ ...prev, profilePic: 'Image size must be less than 5 MB' }));
      return;
    }
    setFieldErrors(prev => {
      const updated = { ...prev };
      delete updated.profilePic;
      return updated;
    });
    setProfileFile(file);
    const url = URL.createObjectURL(file);
    setProfilePreviewUrl(url);
  };

  const validateAll = (currentMode: AuthMode) => {
    const errs: Record<string, string> = {};

    if (currentMode === 'signup') {
      const n = validateName(name);
      if (n) errs.name = n;

      const e = validateEmail(email);
      if (e) errs.email = e;

      const d = validateDob(dob);
      if (d) errs.dob = d;

      const p = validatePassword(password, true);
      if (p) errs.password = p;

      const cp = validateConfirmPassword(confirmPassword);
      if (cp) errs.confirmPassword = cp;

      const t = validateTerms(termsAccepted);
      if (t) errs.terms = t;
    } else {
      const e = validateEmail(email);
      if (e) errs.email = e;

      const p = validatePassword(password, false);
      if (p) errs.password = p;
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();

      const ok = validateAll(hasAccount);
      if (!ok) return;

      if (hasAccount === 'signup') {
        signUpMethod();
      } else {
        signInMethod();
      }
    },
    [dispatch, hasAccount, name, email, dob, password, confirmPassword, profileFile, userType, termsAccepted],
  );

  const signUpMethod = () => {
    
    setLoading(true);
    const dobString = dob 
      ? `${dob.year}-${String(dob.month).padStart(2, '0')}-${String(dob.day).padStart(2, '0')}`
      : '';

    const fd = new FormData();
    fd.append('name', name.trim());
    fd.append('email', cleanEmail(email));
    fd.append('date_of_birth', dobString);
    fd.append('password', password);
    fd.append('confirm_password', confirmPassword);
    fd.append('user_type', String(userType));
    fd.append('device_token', deviceToken || 'web');
    fd.append('time_zone', Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    if (profileFile) {
      fd.append('profile_pic', profileFile, profileFile.name);
    }

    dispatch(
      signupRequest({
        payload: fd,
        onSuccess: () => {
          clearErrors();
          setLoading(false);
          navigate("/emailVerification");
        },
        onError: (err: any) => {
          const newErrors: Record<string, string> = {};

          if (typeof err === 'string') {
            newErrors.general = err;
          } else if (err?.fieldErrors) {
            const backendErrors = err.fieldErrors;
            
            if (backendErrors.name?.length) {
              newErrors.name = Array.isArray(backendErrors.name) 
                ? backendErrors.name.join(', ') 
                : String(backendErrors.name);
            }
            if (backendErrors.email?.length) {
              newErrors.email = Array.isArray(backendErrors.email) 
                ? backendErrors.email.join(', ') 
                : String(backendErrors.email);
            }
            if (backendErrors.password?.length) {
              newErrors.password = Array.isArray(backendErrors.password) 
                ? backendErrors.password.join(', ') 
                : String(backendErrors.password);
            }
            if (backendErrors.confirm_password?.length) {
              newErrors.confirmPassword = Array.isArray(backendErrors.confirm_password) 
                ? backendErrors.confirm_password.join(', ') 
                : String(backendErrors.confirm_password);
            }
            if (backendErrors.date_of_birth?.length) {
              newErrors.dob = Array.isArray(backendErrors.date_of_birth) 
                ? backendErrors.date_of_birth.join(', ') 
                : String(backendErrors.date_of_birth);
            }
            if (backendErrors.profile_pic?.length) {
              newErrors.profilePic = Array.isArray(backendErrors.profile_pic) 
                ? backendErrors.profile_pic.join(', ') 
                : String(backendErrors.profile_pic);
            }

            if (Object.keys(newErrors).length === 0) {
              newErrors.general = 'Signup failed. Please try again.';
            }
          } else if (err?.message) {
            newErrors.general = err.message;
          } else if (err?.email) {
            newErrors.email = err.email;
          } else {
            newErrors.general = 'Signup failed. Please try again.';
          }

          setFieldErrors(newErrors);
          setLoading(false);
        },
      }) as any,
    );
  };

  const signInMethod = () => {
    setLoading(true);
    dispatch(
      signinRequest({
        payload: {
          email: cleanEmail(email),
          password,
          device_token: deviceToken || 'web',
          user_type: userType,
        },
        onSuccess: () => {
          clearErrors();
          setLoading(false);
        },
        onError: (err: any) => {
          const newErrors: Record<string, string> = {};

          if (typeof err === 'string') {
            newErrors.general = err;
          } else if (err?.fieldErrors) {
            const backendErrors = err.fieldErrors;
            
            if (backendErrors.email?.length) {
              newErrors.email = Array.isArray(backendErrors.email) 
                ? backendErrors.email.join(', ') 
                : String(backendErrors.email);
            }
            if (backendErrors.password?.length) {
              newErrors.password = Array.isArray(backendErrors.password) 
                ? backendErrors.password.join(', ') 
                : String(backendErrors.password);
            }

            if (Object.keys(newErrors).length === 0) {
              newErrors.general = 'Invalid email or password';
            }
          } else if (err?.message) {
            newErrors.general = err.message;
          } else {
            newErrors.general = 'Invalid email or password';
          }

          setFieldErrors(newErrors);
          setLoading(false);
        },
      }) as any,
    );
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (fieldErrors.name) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.name;
        return updated;
      });
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (fieldErrors.email || fieldErrors.general) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.email;
        delete updated.general;
        return updated;
      });
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (fieldErrors.password || fieldErrors.confirmPassword || fieldErrors.general) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.password;
        delete updated.confirmPassword;
        delete updated.general;
        return updated;
      });
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (fieldErrors.confirmPassword) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.confirmPassword;
        return updated;
      });
    }
  };

  const handleDobChange = (value: CalendarDate | null) => {
    setDob(value);
    if (fieldErrors.dob) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.dob;
        return updated;
      });
    }
  };

  const onChangeProfile = (fileInput?: FileList | null) => {
    const file = fileInput?.[0] ?? null;
    onProfileFileChange(file);
  };

  const toggleTerms = () => {
    setTermsAccepted(v => !v);
    if (fieldErrors.terms) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated.terms;
        return updated;
      });
    }
  };

  const setHasAccountWithReset = (mode: AuthMode) => {
    setFieldErrors({});
    setHasAccount(mode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setDob(null);
    setTermsAccepted(false);
    setProfileFile(null);
    setProfilePreviewUrl(null);
  };

   const onNavigation = (userType: USER_TYPE) => {
        dispatch(setUserType(userType));
    }

  return {
    isAuthenticated,
    userType,
    loading,
    hasAccount,
    email,
    name,
    dob,
    password,
    confirmPassword,
    termsAccepted,
    profileFile,
    profilePreviewUrl,
    isCreator,
    maxDob,
    fieldErrors,
    isFormValid, 

    setHasAccount,
    dispatch,
    onNavigation,
    setName: handleNameChange,
    setEmail: handleEmailChange,
    setDob: handleDobChange,
    setPassword: handlePasswordChange,
    setConfirmPassword: handleConfirmPasswordChange,
    setHasAccountWithReset,
    toggleTerms,
    onChangeProfile,
    clearErrors,
    onSubmit,
    navigate
  };
}

export default useAuthController;
