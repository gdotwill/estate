import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";
import { initialValues, validationSchema } from "./utils";
import { FormInput } from "@/components/shared/ContactInput";

type IInitValues = {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const handleSubmit = (
    values: IInitValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Contact form values", values);
    toast("Thank you for message");
    resetForm();
  };

  return (
    <section className={styles.contact_form}>
      <div className={styles.section_content}>
        <h2 className={styles.form_title}>Send us a message</h2>
        <h3 className={styles.form_subtitle}>
          We will get back to you as soon as possible
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormInput label="Your Name" name="name" type="text" />
              <FormInput label="Your Email" name="email" type="email" />
              <FormInput
                label="Your Message"
                name="message"
                type="textarea"
                as="textarea"
              />

              <button
                type="submit"
                className={styles.form_submit}
                disabled={isSubmitting}
              >
                Send Message
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ContactForm;
