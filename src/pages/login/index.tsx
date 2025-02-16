import { useRouter } from "next/router";
import { SignInForm } from "@/components/auth/SigninForm";
import { SignInExternal } from "@/components/auth/SignInExternal";
import { SEOHead } from "@/components/SEOHead";
import styles from "../../styles/Login.module.scss";
import { useAuthContext } from "@/contexts/AuthContext";

const Login = () => {
    const {user} = useAuthContext()
    const router = useRouter();

    user !== null &&  router.push("/");
  return (
    <>
      <SEOHead title="Sign in" />

      <div className={styles.login_box}>
        <SignInForm />
      </div>
    </>
  );
};

export default Login;
