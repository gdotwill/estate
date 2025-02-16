import {  useRef } from "react";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import Link from "next/link";
import styles from "@/styles/Sell.module.scss";
import { SEOHead } from "@/components/SEOHead";
import { SellInput } from "@/components/shared/SellInput/SellInput";
import { TextareaInput } from "@/components/shared/SellInput/SellTextarea";
import { FormValues } from "@/types/sellForm";
import { initialValues } from "@/utils/listingProperty/initialValues";
import { validationSchema } from "@/utils/listingProperty/validation";
import addProperty from "../../lib/firebase/addToDB";
import { useAuthContext } from "@/contexts/AuthContext";
import { UploadInput } from "@/components/shared/SellInput/UploadInput";
import useImageUpload from "@/lib/hooks/useImageUpload ";

const Sell = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { imgLink, handleImageUpload, uploadFile } = useImageUpload();
  const { user } = useAuthContext();

  if (user === null) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.info}>
          You must be{" "}
          <Link className={styles.link} href={"/login"}>
            logged in
          </Link>{" "}
          to sell property.{" "}
        </h2>
      </div>
    );
  }

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (user === null) return;
    uploadFile();

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    const { result, error } = await addProperty({
      ...values,
      email: user.email,
      img: imgLink || "",
    });
    toast("Wonderful you list your property");
    resetForm();

    if (error) console.log(error);
  };

  return (
    <div>
      <SEOHead title="Sell your property" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <div className={styles.container}>
            <Form className={styles.form}>
              <p className={styles.title}>List Your Property for Sale</p>
              <p className={styles.message}>
                Provide us with the details of the property you are selling.
              </p>

              <SellInput name="title" placeholder="title" label="title" />
              <div className={styles.flex}>
                <SellInput
                  name="num_bedrooms"
                  placeholder="bedrooms"
                  label="bedrooms"
                  type="number"
                />

                <SellInput
                  name="bathrooms"
                  placeholder="bathrooms"
                  label="bathrooms"
                  type="number"
                />
              </div>
              <div className={styles.flex}>
                <SellInput
                  name="area"
                  placeholder="area"
                  label="area"
                  type="number"
                />
                <SellInput
                  name="price"
                  placeholder="price"
                  label="price"
                  type="number"
                />
              </div>

              <TextareaInput
                name="description"
                placeholder="description"
                label="description"
              />
              <UploadInput
                name="img"
                uplander={handleImageUpload}
                fileRef={fileRef}
              />
              <div className={styles.flex}>
                <SellInput
                  name="phone_number"
                  placeholder="phone number"
                  label="phone number"
                  type="tel"
                />
              </div>
              <SellInput name="street" placeholder="street " label="street" />

              <div className={styles.flex}>
                <SellInput name="city" placeholder="city" label="city" />
                <SellInput name="state" placeholder="state" label="state" />
              </div>
              <div className={styles.flex}>
                <SellInput name="zip" placeholder="post code" label="zip" />
                <SellInput
                  name="country"
                  placeholder="country"
                  label="country"
                />
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Sell;
