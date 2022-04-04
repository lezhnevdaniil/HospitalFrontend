import React from 'react';

const Doctors = () => {
  const doctors = ['Иванов', 'Петров', 'Сидоров'];

  return (
    <>
      {doctors.map((element) => {
        return <option>{element}</option>;
      })}
    </>
  );
};

export default Doctors;
