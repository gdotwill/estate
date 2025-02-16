import SectionHeader from "@/components/contact/Header";
import ContactForm from "@/components/contact/Form";
import { SEOHead } from "@/components/SEOHead";
import styled from "../../styles/Contact.module.scss";

const Contact = () => {
  return (
    <>
      <SEOHead title="Contact us" />

      <div className={styled.contact__container}>
        <div className={styled.contact__wrapper}>
          <SectionHeader />
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
