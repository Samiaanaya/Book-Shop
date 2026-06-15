export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
};

export type TUser = {
  email: string | undefined;
  role: string | undefined;
  id: string | undefined;
};
