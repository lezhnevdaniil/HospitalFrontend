import React from 'react';

const SortOptions = () => {
  const SortOptions = ['ФИО', 'ВРАЧ', 'ДАТА'];
  const value = ['name', 'doctor', 'date'];

  return (
    <>
      {SortOptions.map((element, index) => {
        return <option value={value[index++]}>{element}</option>;
      })}
    </>
  );
};

export default SortOptions;
