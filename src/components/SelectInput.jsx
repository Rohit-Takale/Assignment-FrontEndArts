import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SelectInput({ options, label, onChange,id , value }) {
   const optionList = Array.isArray(options) && options.length > 0 ? 
   ['Choose an option', ...options] :
   ['Choose an option'];
   
  return (
    <>
      <div className="relative inline-block w-64">
        <label
          htmlFor="custom-select"
          className="block text-sm font-medium text-gray-700"
        >
          {label ? label : "Choose an option"}
        </label>
        <select
          id={id}
          name="custom-select"
          className="mt-1 block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={onChange}
          value={value}
        >


          {/* {optionList && options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))} */}
          {optionList.map((option, index) => (
          <option key={index} value={option === 'Choose an option' ? '' : option}>
            {option}
          </option>
        ))}
        </select>
        <div className="absolute inset-y-0 right-0 top-5 flex items-center px-2 pointer-events-none">
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-gray-400 h-4 w-4"
          />
        </div>
      </div>
    </>
  );
}
