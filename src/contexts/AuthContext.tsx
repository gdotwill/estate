import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { onAuthStateChanged, User, getAuth } from "firebase/auth";
import firebase_app from "../lib/firebase";

const auth = getAuth(firebase_app);

type IUser = User | null;
type ContextState = { user: IUser };

export const AuthContext = createContext<ContextState>({} as ContextState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
      <AuthContext.Provider value={{ user }}>
        {loading ?  
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
          </div>
        : children
        }
      </AuthContext.Provider>
    );
};
