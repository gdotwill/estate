import { Field, ErrorMessage } from "formik";
import { ChangeEvent, LegacyRef } from "react";
import styles from "./styles.module.scss";

type IUploadProps = {
  name: string;
  uplander: (e: ChangeEvent<HTMLInputElement>) => void;
  fileRef: LegacyRef<HTMLInputElement>;
};

export const UploadInput = ({ fileRef, name, uplander }: IUploadProps) => {
  return (
    <label>
      <Field name={name}>
        {() => (
          <div className={styles.input}>
            <input
              name={name}
              type="file"
              accept="image/*"
              onChange={(e) => uplander(e)}
              ref={fileRef}
            />
            <ErrorMessage name={name} />
          </div>
        )}
      </Field>
    </label>
  );
};
