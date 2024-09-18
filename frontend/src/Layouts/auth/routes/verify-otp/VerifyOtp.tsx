import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useResendOtp, useVerifyOtp } from '@/reactquery';
import { setUser } from '@/store/slices/authSlice';
import { setIsLoading } from '@/store/slices/loaderSlice';
import { AppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  var [email, setEmail] = useState('');
  const [resendOtpEnabled, setResendOtpEnabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  var [otpState, setOtpState] = useState({
    otp: '',
    error: '',
  });
  function changeHandler(value: string) {
    if (value.length < 4) {
      setOtpState({
        otp: otpState.otp + value,
        error: ' Please enter a valid OTP',
      });
    } else {
      setOtpState({
        otp: value,
        error: '',
      });
    }
  }

  const { mutateAsync, isPending } = useVerifyOtp();
  async function verifyOtpHandler(e: any) {
    e.preventDefault();
    if (otpState.otp.length < 4) {
      setOtpState({
        otp: '',
        error: 'Please enter a valid OTP',
      });
      return;
    }
    try {
      dispatch(setIsLoading(true));
      const res = await mutateAsync({ otp: otpState.otp, email });
      if (res.error) {
        setOtpState({
          otp: '',
          error: res.message,
        });
        dispatch(setIsLoading(false));
        return;
      } else {
        dispatch(setUser(res.data));
        navigate('/in');
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  }

  useEffect(() => {
    var email = searchParams.get('email');
    if (email) {
      setEmail(email);
    }
  }, []);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendOtpEnabled(true);
    }
  }, [countdown]);

  const { mutateAsync: resendOtp, isPending: resendOtpPending } =
    useResendOtp();

  const handleResendOtp = async (e: any) => {
    e.preventDefault();
    try {
      await resendOtp({ email });
      setResendOtpEnabled(false);
      setCountdown(60);
    } catch (error) {
      console.error('Error resending OTP', error);
    }
  };

  return (
    <form>
      <Card className="sm:w-[360px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Confirm it's you</CardTitle>
          <CardDescription>
            Please enter the verification code that has been sent to
            <p className="inline-block ml-2 text-white">
              <b>{email}</b>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                onChange={(value) => changeHandler(value)} //changeHandler(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-[50px] h-[60px]" />
                  <InputOTPSlot index={1} className="w-[50px] h-[60px]" />
                  <InputOTPSlot index={2} className="w-[50px] h-[60px]" />
                  <InputOTPSlot index={3} className="w-[50px] h-[60px]" />
                  <InputOTPSlot index={4} className="w-[50px] h-[60px]" />
                  <InputOTPSlot index={5} className="w-[50px] h-[60px]" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {otpState.error && (
              <p className="text-xs text-red-500">{otpState.error}</p>
            )}

            {!resendOtpEnabled && (
              <p className="text-sm text-center">Resend code in {countdown}s</p>
            )}
            {resendOtpEnabled && (
              <button
                onClick={(e) => handleResendOtp(e)}
                className="text-sm text-blue-600"
              >
                {resendOtpPending ? 'Resending...' : 'Resend code'}
              </button>
            )}
            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:opacity-45"
              onClick={(e) => verifyOtpHandler(e)}
              disabled={isPending}
            >
              {isPending ? 'Verifying...' : 'Verify'}
            </Button>

            <Button variant={'outline'}>
              <Link to="/login" className="w-full ">
                Cancel
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default VerifyOtp;
