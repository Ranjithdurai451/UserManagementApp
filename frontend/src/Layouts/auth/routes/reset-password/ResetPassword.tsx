import PasswordField from '@/components/PasswordField';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { useResetPassword } from '@/reactquery';
import { responseType } from '@/utils/types';
import { Label } from '@radix-ui/react-label';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  useEffect(() => {
    if (!searchParam.get('token')) {
      navigate('/');
    }
  }, []);

  const [passwordState, setPasswordState] = useState({
    value: '',
    error: '',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target?.value?.length == 0) {
      setPasswordState({ value: '', error: 'Password is required' });
    } else if (e.target?.value?.length < 6) {
      setPasswordState({
        value: '',
        error: 'Password must be at least 6 characters',
      });
    } else {
      setPasswordState({ value: e.target.value, error: '' });
    }
  };
  const { mutateAsync, isPending } = useResetPassword();
  async function submitHandler() {
    if (passwordState.value == '') {
      setPasswordState({ value: '', error: 'Password is required' });
      return;
    }
    if (passwordState.error) {
      return;
    }
    const token = searchParam.get('token');
    if (!token) {
      navigate('/');
      return;
    }
    const res: responseType = await mutateAsync({
      token,
      password: passwordState.value,
    });
    if (!res.status) {
      setErrorMsg(res.message || 'Reset password failed');
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      return;
    }
    setSuccessMsg(res.message);
    setTimeout(() => {
      setSuccessMsg('');
      navigate('/in');
    }, 1000);
  }
  return (
    <Card className="sm:w-[360px] mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Set New Password</CardTitle>
        <CardDescription>
          Enter your new password and confirm it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">New Password</Label>

            <PasswordField
              isReactHookForm={false}
              onChange={handlePasswordChange}
            />
            {passwordState.error && (
              <div className="text-xs text-red-500">{passwordState.error}</div>
            )}
          </div>
          {errorMsg && <div className="text-xs text-red-500">{errorMsg}</div>}
          {successMsg && (
            <div className="text-xs text-green-600 ">{successMsg}</div>
          )}

          <Button
            onClick={submitHandler}
            className="w-full disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
