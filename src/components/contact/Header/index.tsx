import DOMPurify from "dompurify";
import styles from "./styles.module.scss";

const contactInfo = [
  "123 Main Street<br />Anytown, USA",
  "Office Hours:<br />Monday - Friday: 9:00am - 5:00pm<br />Saturday: 10:00am - 2:00pm<br />Sunday: Closed",
  "(555) 555 5555",
  "info@myrealestatecompany.com",
];

function SectionHeader() {
  return (
    <section className={styles.section_header}>
      <div className={styles.section_content}>
        <h1 className={styles.section_title}>Contact Us</h1>
        <h2 className={styles.section_subtitle}>
          We would love to hear from you
        </h2>
        <h2 className={styles.section_subtitle}>
          Thank you for your interest in our real estate services. Please feel
          free to contact us with any questions, comments or concerns. We are
          always happy to assist you.
        </h2>
        <div className={styles.contact_info}>
          {contactInfo.map((info, i) => (
            <div key={i} className={styles.contact_info_item}>
              <i className={styles.contact_info_icon}></i>
              <div className={styles.contact_info_text}>
                <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info) }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionHeader;
