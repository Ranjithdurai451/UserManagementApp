export type signUpSchemaType = {
  email: string;
  username: string;
  password: string;
};
export type loginSchemaType = {
  email: string;
  password: string;
};

export type authSliceType = {
  isAuthenticated: boolean;
  user: {
    email: string;
    username: string;
    id: string;
  };
};

export type responseType = {
  status: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  error?: string;

}
