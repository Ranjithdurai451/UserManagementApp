import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/reactquery';
import { setIsLoading } from '@/store/slices/loaderSlice';
import { AppDispatch } from '@/store/store';
import { loginSchema } from '@/utils/schemas';
import { loginSchemaType } from '@/utils/types';
import { joiResolver } from '@hookform/resolvers/joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginSchemaType>({
    resolver: joiResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutateAsync, isPending } = useLogin();
  async function submitHandler(data: loginSchemaType) {
    dispatch(setIsLoading(true));
    const res = await mutateAsync(data);
    if (res.error) {
      setErrorMsg(res.message);
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
      dispatch(setIsLoading(false));
      return;
    }

    navigate('/verify-otp?email=' + data.email);
    dispatch(setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card className="sm:w-[360px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="inline-block ml-auto text-xs underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:opacity-45"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </div>
          <div className="mt-4 text-xs text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Login;
