import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import signIn from "@/lib/firebase/signInMethod";
import styles from "./styles.module.scss";
import { AuthFormInput } from "../shared/AuthInput";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type IInitialVal = {
  email: string;
  password: string;
};
const initialValues: IInitialVal = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const router = useRouter();
  
  const handleForm = async (values: IInitialVal) => {
    const { result, error } = await signIn(values.email, values.password);

    if (error) {
      return <p>Sorry, an error has occurred. Please try again later.</p>;
    }

    console.log(result);
    return router.push("/");
  };

  return (
    <div className={styles.left}>
      <h1 className={styles.header}>Log in</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleForm}
        validationSchema={schema}
      >
        <Form className={styles.form}>
          <AuthFormInput label="email" name="email" type="email" />
          <AuthFormInput label="password" name="password" type="password" />

          <button className={styles.input} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};
