import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'
import ProtectedRoute from './components/ProtectedRoute';
import { persistor, store } from './store';
import CreatorHome from './pages/creator/CreatorHomePage/Home';
import FanHome from './pages/fan/FanHomePage/Home';
import { registerServiceWorker, setupMessageListener } from './api/fireBaseConfig';
import Landing from './pages/Authentication/LandingPage';
import SignInSignUpPage from './pages/Authentication/SignInSignUpPage';
import EmailVerification from './pages/Authentication/OtpVerificationPage';
import ForgetPasswordPage from './pages/Authentication/ForgetPasswordPage';

registerServiceWorker()
  .then(() => {
    setupMessageListener();
    console.log('Service Worker registered and FCM listener configured');
  })
  .catch((e) => {
    console.warn('Service Worker / FCM setup failed', e);
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<SignInSignUpPage />} />
            <Route path="/emailVerification" element={<EmailVerification />} />
            <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
            <Route element={<ProtectedRoute allowRoles={['fan']} />}>
              <Route path="/fan" element={<FanHome />} />
            </Route>
            <Route element={<ProtectedRoute allowRoles={['creator']} />}>
              <Route path="/creator" element={<CreatorHome />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
)
