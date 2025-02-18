import Link from "next/link";
import styles from "./styles.module.scss";

import { AuthActions } from "./AuthActions ";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVectorSquare,
  faSink,
  faBed,
  faHome
} from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { label: "Home", href: "/" },
  // { label: "Buy", href: "/buy" },
  // { label: "Sell", href: "/sell" },
  // { label: "Contact", href: "/contact" },
];

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.navItems}>
       src/components/Navbar/index.tsx
        </ul>
      </div>

      <AuthActions />
    </div>
  );
};

export default NavBar;
