import { Formik, Form } from "formik";
import styles from "./styles.module.scss";
import { RangeSearch } from "../shared/SearchInputs/RangeSearch";
import { TextSearch } from "../shared/SearchInputs/TextSearch";
import { bedroomsRange, priceRange } from "@/utils/search/dropdownRanges";
import { formatPrice } from "@/utils/search/formatPrice";
import { IInitSearch } from "@/utils/search/type";
import { filterData } from "@/utils/search/filterData";
import { IEstateData } from "@/types/estate";
import { validation } from "./validation";

export const initialSearch = {
  title: "",
  minPrice: 0,
  maxPrice: 0,
  minBedrooms: 0,
  maxBedrooms: 0,
};

export type ISearch = {
  setSearchItems: React.Dispatch<React.SetStateAction<IEstateData[]>>;
  properties: IEstateData[];
};

export const SearchBar = ({ setSearchItems, properties }: ISearch) => {
  const handleSubmit = (
    values: IInitSearch,
    { resetForm }: { resetForm: () => void }
  ) => {
    const propertyQuery = filterData(values, properties);
    setSearchItems(propertyQuery);

    resetForm();
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialSearch}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {(formik) => (
          <Form>
            <div className={styles.barWrapper}>
              <TextSearch name={"title"} />
              <button type="submit" disabled={!formik.dirty || !formik.isValid}>
                Search
              </button>
            </div>
            <div className={styles.selectsWrapper}>
              <div className={styles.range}>
                <RangeSearch
                  label={"Min Price"}
                  name={"minPrice"}
                  options={priceRange}
                  formatPrice={formatPrice}
                  formik={formik}
                />
                <RangeSearch
                  label={"Max Price"}
                  name={"maxPrice"}
                  options={priceRange}
                  formatPrice={formatPrice}
                  formik={formik}
                />
              </div>
              <div className={styles.range}>
                <RangeSearch
                  label={"Min Bedrooms"}
                  name={"minBedrooms"}
                  options={bedroomsRange}
                  formik={formik}
                />
                <RangeSearch
                  label={"Max Bedrooms"}
                  name={"maxBedrooms"}
                  options={bedroomsRange}
                  formik={formik}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
