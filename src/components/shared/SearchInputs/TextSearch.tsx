import { Field } from "formik";

export const TextSearch = ({ name }: { name: string }) => {
  return (
    <label htmlFor={name}>
      <Field type="text" id={name} name={name} />
    </label>
  );
};
