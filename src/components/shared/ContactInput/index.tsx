import { ErrorMessage, Field } from 'formik';
import styles from './styles.module.scss'


type IFormInput = {
    label: string,
     name: string,
      type:string,
    as?: string
  }
  
 export const FormInput = ({ label, name, type, as }: IFormInput) => {
    return (
      <div className={styles.form_group}>
        <label htmlFor={name} className={styles.form_label}>{label}</label>
        <Field as={as} type={type} id={name} name={name} className={styles.form_input} />
        <ErrorMessage name={name} component="div" className={styles.error_message}/>
      </div>
    );
  };

