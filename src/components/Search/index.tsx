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
    <div className="mx-auto">
      <Formik
        initialValues={initialSearch}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {(formik) => (
          <Form style={{ width: '500px', borderRadius: "10%" }}>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative wrapper w-xl">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <TextSearch name={"title"} />
                {/* <button type="submit" className="text-white absolute end-5 bottom-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5">Search</button> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};




