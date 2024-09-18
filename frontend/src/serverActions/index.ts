import { loginSchemaType, signUpSchemaType } from '@/utils/types';

export async function signupAction(data: signUpSchemaType) {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_SIGNUP_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      }
    );


    const resData = await response.json();
    return resData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function verifyOtpAction({ otp, email }: { otp: string; email: string }) {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_VERIFY_OTP_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          otp: otp,
          email: email
        }),
      }
    );
    const resData = await response.json();
    return resData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    console.log(error);
    return null;
  }

}

export async function resendOtpAction({ email }: { email: string }) {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_RESEND_OTP_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          email: email
        }),
      }
    );
    const resData = await response.json();
    return resData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    console.log(error);
    return null;
  }
}
export const loginAction = async (data: loginSchemaType) => {
  try {
    console.log(import.meta.env.VITE_API_BASE_URL);
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_LOGIN_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function logoutAction() {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_LOGOUT_ENDPOINT,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}

export async function forgotPasswordAction(email: string) {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL +
      import.meta.env.VITE_FORGET_PASSWORD_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ email }),
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function resetPasswordAction({
  token,
  password,
}: {
  token: string;
  password: string;
}) {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL +
      import.meta.env.VITE_RESET_PASSWORD_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ token, password }),
      }
    );
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
