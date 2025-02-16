import { ErrorMessage, Field } from "formik";
import styles from "./styles.module.scss";

type IFormInput = {
  label: string;
  name: string;
  type: string;
};

export const AuthFormInput = ({ label, name, type }: IFormInput) => {
  return (
    <div className="flex flex-col mb-6 w-full mt-14">
      <label htmlFor={name} className="text-[#5a7184] font-semibold block">{name}</label>
      <Field
        placeholder={label}
        type={type}
        id={name}
        name={name}
        className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
        />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};
