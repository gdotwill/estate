import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import signUp from "../../lib/firebase/signUpWithEmail";
import styles from "./styles.module.scss";
import { AuthFormInput } from "../shared/AuthInput";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password is required'),
});

type IInitialVal = {
  email: string;
  password: string;
  repeatedPassword: string;
};
const initialValues: IInitialVal = {
  email: "",
  password: "",
  repeatedPassword: "",
};

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  
  const handleForm = async (values: IInitialVal) => {

    setLoading(true);

    try {
      if (values.password !== values.repeatedPassword)
        return setError('Invalid email or password');
  
      const { result, error } = await signUp(values.email, values.password);

      if (error) {
        setError('Invalid email or password');  
      } else {
        return router.push("/") 
      }
      
    } catch (error) {
      console.log(error)
      
    } finally {
      setLoading(false);
    }
  
  
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-14">
      <h1 className="font-roboto text-3xl font-bold text-center text-dark-hard mb-8">
        Register
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleForm}
        validationSchema={schema}
      >
        <Form className={styles.form}>
          <AuthFormInput label="Email" name="email" type="email" />
          <AuthFormInput label="Password" name="password" type="password" />
          <AuthFormInput
            label="Retype password"
            name="repeatedPassword"
            type="password"
          />

          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-900 text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"  
          >
          {
            loading ? (
              <span className="flex flex-col items-center justify-center">
                <div role="status" >
                    <svg aria-hidden="true" className="w-8 h-8 text-white-200 animate-spin dark:text-white-600 fill-white-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
              </span>

            ) : (
              <span>Sign Up </span>
            )
          }   
          </button>
        </Form>
      </Formik>
      <p>Already have an account? <strong><Link href="/login">Login now</Link></strong></p>
    </div> 
  );
};
