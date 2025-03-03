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

              <SellInput name="title" placeholder="Title" label="Title" />
              <div className={styles.flex}>
                <SellInput
                  name="num_bedrooms"
                  placeholder="Bedrooms"
                  label="Bedrooms"
                  type="number"
                />

                <SellInput
                  name="bathrooms"
                  placeholder="Bathrooms"
                  label="Bathrooms"
                  type="number"
                />
              </div>
              <div className={styles.flex}>
                <SellInput
                  name="area"
                  placeholder="Area"
                  label="Area"
                  type="number"
                />
                <SellInput
                  name="price"
                  placeholder="Price"
                  label="Price"
                  type="number"
                />
              </div>

              <TextareaInput
                name="description"
                placeholder="Description"
                label="Description"
              />
              <UploadInput
                name="img"
                uplander={handleImageUpload}
                fileRef={fileRef}
              />

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
