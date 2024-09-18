import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/reactquery';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailState, setEmailState] = useState({ error: '', value: '' });
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.value?.length == 0) {
      setEmailState({ error: 'Email is required', value: '' });
    } else if (
      !e.target.value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      setEmailState({ error: 'Invalid email', value: '' });
    } else {
      setEmailState({ error: '', value: e.target.value });
    }
  }
  const { mutateAsync, isPending } = useForgotPassword();
  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailState.value == '') {
      setEmailState({ error: 'Email is required', value: '' });
      return;
    }
    if (emailState.error) {
      return;
    }

    const res = await mutateAsync(emailState.value);

    if (res.error) {
      setError(res.message || 'Forgot password failed');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    setSuccess(res.message);
  }
  return (
    <form onSubmit={submitHandler}>
      <Card className="sm:w-[360px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot password?</CardTitle>
          <CardDescription>
            For security purposes, a reset link will be sent to your registered
            email address.
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
                onChange={handleEmailChange.bind(this)}
              />

              {emailState.error && (
                <p className="text-sm text-red-500">{emailState.error}</p>
              )}
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-green-600">{success}</p>}
            <Button
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:opacity-45"
              disabled={isPending || success !== ''}
            >
              {isPending ? 'Sending...' : 'Send'}
            </Button>
            <Button variant={'outline'}>
              <Link to="/login?email=" className="w-full ">
                Cancel
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default ForgotPassword;
