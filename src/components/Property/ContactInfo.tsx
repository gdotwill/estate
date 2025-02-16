import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import { IProperty } from "@/components/Property/types";

export const ContactInfo = ({ property }: { property: IProperty }) => {
  return (
    <div className={styles.contact_wrapper}>
      <p className={styles.contact}>Contact:</p>
      <div>
        <p>
          <FontAwesomeIcon
            icon={faPhone}
            style={{
              fontSize: 13,
              color: "gray",
              paddingRight: "5px",
            }}
          />

          {property.phone_number}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{
              fontSize: 13,
              color: "gray",
              paddingRight: "5px",
              marginTop: "10px",
            }}
          />

          {property.email}
        </p>
      </div>
    </div>
  );
};
