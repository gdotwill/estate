import { ErrorMessage, Field, FormikProps } from "formik";
import styles from "./styles.module.scss";

type ISelect = {
  label: string;
  name: string;
  options: number[];
  formik: FormikProps<any>;
  formatPrice?: (price: number) => any;
};

export const RangeSearch = ({
  label,
  name,
  options,
  formatPrice,
  formik,
  ...rest
}: ISelect) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>
        <Field as="select" id={name} name={name} {...rest}>
          <option value="">{label}</option>
          {options.map((value) => {
            let range = value;
            if (formatPrice) {
              range = formatPrice(value);
            }
            return (
              <option key={value} value={value}>
                {range}
              </option>
            );
          })}
        </Field>
      </label>
      {formik.touched && (
        <ErrorMessage className={styles.error} component={"span"} name={name} />
      )}
    </div>
  );
};
