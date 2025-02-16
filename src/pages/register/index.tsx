import { SignUpForm } from "@/components/auth/SignupForm";
import { SEOHead } from "@/components/SEOHead";
import styles from "../../styles/Join.module.scss";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const Login = () => {
    const {user} = useAuthContext()
    const router = useRouter();

    user !== null &&  router.push("/");
  return (
    <>
      <SEOHead title="Sign up" />

      <div className={styles.signin_box}>
        <SignUpForm />
      </div>
    </>
  );
};

export default Login;
