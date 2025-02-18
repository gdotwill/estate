'use client'

import { useContext, useState, useEffect } from "react";

import { Field } from "formik";

export const TextSearch = ({ name }: { name: string }) => {

  return (
    <label htmlFor={name}>
      <Field 
        type="text" 
        id={name} 
        name={name} 
        placeholder="Search ...."
        className="block w-xl p-4 ps-10 text-3xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:border-blue-500"
        style={{ width: '100%' }}
      />
    </label>
  );
};
