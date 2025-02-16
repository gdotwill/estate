import {
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { isMobile } from "react-device-detect";
import { auth } from '@/lib/firebase/signInMethod';

export type IAuthProvider = "google" | "facebook" | "github";

const authProviders = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
    github: new GithubAuthProvider()
}

export const handleAuthProviderLogin = async (
    authProvider: IAuthProvider, redirect: () => Promise<void>
) => {


    const provider = authProviders[authProvider];


    try {
        if (isMobile) {
            await signInWithRedirect(auth, provider);
        } else {

            await signInWithPopup(auth, provider);
        }
        await redirect()
    } catch (err) {
        console.log(err);
    }
};