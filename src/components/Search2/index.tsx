'use client'
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
import { useState } from 'react';

export const initialSearch = {
  title: ""
};

export type ISearch = {
  searchTerm: string;
  setSearchTerms: React.Dispatch<React.SetStateAction<IEstateData[]>>;
  properties: IEstateData[];
};

interface SearchProps {
  data: ISearch[];
}

export const Search: React.FC<SearchProps> = ({ data }) => {
  // const handleSubmit = (
  //   values: IInitSearch,
  //   { resetForm }: { resetForm: () => void }
  // ) => {
  //   const propertyQuery = filterData(values, properties);
  //   setSearchTerms(propertyQuery);

  //   resetForm();
  // };



  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchQuery = e.target.value;
  //   setQuery(searchQuery);
  //   setFilteredData(
  //     data.filter((item) =>
  //       item.searchTerm.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // };


  return (
    <div className="mx-auto">
       {/* <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      /> */}
      <Formik
        initialValues={initialSearch}
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

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};




