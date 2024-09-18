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
