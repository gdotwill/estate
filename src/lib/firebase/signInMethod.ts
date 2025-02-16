import firebase_app from ".";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

export const auth = getAuth(firebase_app);

const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

export default signIn;



export const logOutHandler = () => {
  signOut(auth)
}
