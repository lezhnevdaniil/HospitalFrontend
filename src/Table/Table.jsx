import moment from 'moment';
import React from 'react';
import logoDelete from '../logo/logoDelete.svg';
import logoChange from '../logo/logoChange.svg';
import './Table.scss';

const Table = ({
  item,
  setActiveDelete,
  setIdDelete,
  setActiveChange,
  setIdChange,
  setAllChange,
}) => {
  const buildAppoint = (item, type) => {
    setAllChange(item);
  };
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.doctor}</td>
      <td>{moment(item.date).format('DD.MM.YYYY')}</td>
      <td>{item.complaints}</td>
      <td>
        <div className='icon'>
          <img
            src={logoDelete}
            alt='Упс'
            onClick={() => {
              setActiveDelete(true);
              setIdDelete(item._id);
            }}
          ></img>
          <img
            src={logoChange}
            alt='Упс'
            onClick={() => {
              buildAppoint(item);
              setActiveChange(true);
              setIdChange(item._id);
            }}
          ></img>
        </div>
      </td>
    </tr>
  );
};

export default Table;
