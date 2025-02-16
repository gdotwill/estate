import Link from "next/link";
import styles from "./styles.module.scss";
import { useAuthContext } from "@/contexts/AuthContext";
import { logOutHandler } from "@/lib/firebase/signInMethod";

export const AuthActions = () => {
  const userContext = useAuthContext();

  const isLoggedIn = userContext.user !== null;
  return (
    <>
      {isLoggedIn ? (
        <div className={styles.wrapper}>
          <ul className={styles.navItems}>
          <Link href={"/sell"}>
              <li className={styles.navItem}> + Add listing</li>
            </Link>
            <Link href={"/listed"}>
              <li className={styles.navItem}>my&#160;properties</li>
            </Link>
            <Link href={"/"}>
              <li className={styles.navItem} onClick={logOutHandler}>
                Log&#160;out
              </li>
            </Link>
          </ul>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <ul className={styles.navItems}>
            <Link href={"/login"}>
              <li className={styles.navItem}>Log&#160;in</li>
            </Link>
          </ul>
          {/* <ul className={styles.navItemsBtn}>
            <Link href={"/register"}>
              <li className={styles.navItemBtn}>
                <button className={styles.button_join}>Register</button>
              </li>
            </Link>
          </ul> */}
        </div>
      )}
    </>
  );
};
