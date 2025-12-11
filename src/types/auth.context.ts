export interface EmailPass {
  email: string;
  password: string;
}

export interface client extends EmailPass {
  currentPassword: string;
  fullName: string;
}

export interface AuthContextType {
  handleForm: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  credentials: EmailPass;
  setCredentials: React.Dispatch<EmailPass>;
  clientCredentials: client;
  setClientCredentials: React.Dispatch<client>;
}
