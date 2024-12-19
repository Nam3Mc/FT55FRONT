import IUser from "../interfaces/user"

export default interface IAuthState {
    token: string | null;
    user: IUser | null;
    error: string;
    successMessage: string;
    setToken: (token: string | null) => void;
    setUser: (user: IUser | null) => void;
    setError: (error: string) => void;
    setSuccessMessage: (message: string) => void;
    clearMessages: () => void;
    resetForm: () => void;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
  }