import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { signUpSchemaType } from '@/utils/types';
import { signupSchema } from '@/utils/schemas';
import { useSignup } from '@/reactquery';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setIsLoading } from '@/store/slices/loaderSlice';
// import { setUser } from '@/store/slices/authSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<signUpSchemaType>({
    resolver: joiResolver(signupSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });
  const { mutateAsync, isPending } = useSignup();
  async function submitHandler(data: signUpSchemaType) {
    dispatch(setIsLoading(true));
    const user = await mutateAsync(data);
    if (user.error) {
      setErrorMsg(user.message);
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
    <Card className="mx-auto sm:w-[360px] ">
      <form onSubmit={handleSubmit(submitHandler)}>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="vimal"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? 'Signing up...' : 'Sign Up'}
            </Button>
          </div>
          <div className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default SignUp;
