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
];

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.navItems}>
          {navLinks.map((link, i) => (
            <Link href={link.href} key={i}>
              <li className={styles.navItem}>
              <FontAwesomeIcon
                icon={ faHome }
                style={{ fontSize: 20, color: "white", marginRight: '10px' }}
              />
              Greywill Real Estate
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <AuthActions />
    </div>
  );
};

export default NavBar;
