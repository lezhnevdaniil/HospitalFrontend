import React from 'react';

const Doctors = () => {
  const doctors = [
    {
      doctor: 'Иванов',
    },
    {
      doctor: 'Петров',
    },
    {
      doctor: 'Сидоров',
    },
  ];

  return (
    <>
      {doctors.map((element) => {
        return <option>{element.doctor}</option>;
      })}
    </>
  );
};

export default Doctors;
