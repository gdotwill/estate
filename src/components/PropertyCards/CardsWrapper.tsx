import { ReactNode } from "react";
import styles from "./styles.module.scss";

export const CardsWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.cards}>{children}</div>
    </div>
  );
};
