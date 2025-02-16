import { Field, ErrorMessage, FieldProps } from "formik";
import styles from "./styles.module.scss";

type IInputProps = {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
};

export const SellInput = ({
  name,
  placeholder,
  label,
  type = "text",
}: IInputProps) => (
  <label>
    <Field name={name}>
      {({ field }: FieldProps) => (
        <>
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={styles.input}
          ></input>
          <span className={styles.span}>{label.toUpperCase()}</span>
          <ErrorMessage name={name} />
        </>
      )}
    </Field>
  </label>
);
