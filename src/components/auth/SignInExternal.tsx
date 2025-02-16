import { useRouter } from "next/router";
import cls from "classnames";
import styles from "./styles.module.scss";
import { handleAuthProviderLogin } from "@/utils/login/auth_provider_utlis";


export const SignInExternal = () => {
  const router = useRouter();

  const redirect = async () => {
    await router.push("/");
  };

  return (
    <div className={styles.right}>
      <button
        className={cls(styles.social_signin, styles.facebook)}
        type="button"
        onClick={() => handleAuthProviderLogin("facebook", redirect)}
      >
        Log in with facebook
      </button>
      <button
        className={cls(styles.social_signin, styles.github)}
        onClick={() => handleAuthProviderLogin("github", redirect)}
      >
        Log in with GitHub
      </button>
      <button
        className={cls(styles.social_signin, styles.google)}
        onClick={() => handleAuthProviderLogin("google", redirect)}
      >
        Log in with Google
      </button>
    </div>
  );
};
