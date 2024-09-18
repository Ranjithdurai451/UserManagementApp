import {
  forgotPasswordAction,
  loginAction,
  logoutAction,
  resendOtpAction,
  resetPasswordAction,
  signupAction,
  verifyOtpAction,
} from '@/serverActions';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () => {
  return useMutation({
    mutationFn: signupAction,
  });
};


export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtpAction,
  });
}

export const useResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpAction,
  });
}
export const useLogin = () => {
  return useMutation({
    mutationFn: loginAction,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutAction,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordAction,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordAction,
  });
};
