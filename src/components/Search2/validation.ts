import * as yup from 'yup';

export const validation = yup.object().shape({
  title: yup.string().min(3),
  maxBedrooms: yup
    .number()
    .test(
      "bedrooms",
      "Maximum cannot be less than minimum",
      (value, { parent }) => value !== undefined && value >= parent.minBedrooms
    ),
  maxPrice: yup
    .number()
    .test(
      "price",
      "Maximum cannot be less than minimum",
      (value, { parent }) => value !== undefined && value >= parent.minPrice
    ),
});
