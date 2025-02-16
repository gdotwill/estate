import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  num_bedrooms: Yup.string().required(),
  bathrooms: Yup.string().required(),
  area: Yup.number().required(),
  price: Yup.number().required(),
  description: Yup.string().required(),
  phone_number: Yup.number().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  zip: Yup.string().required(),
  country: Yup.string().required(),
});

