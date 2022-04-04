import moment from 'moment';
import React from 'react';
import logoDelete from '../logo/logoDelete.svg';
import logoChange from '../logo/logoChange.svg';
import './Table.scss';

interface IData {
  _id: string;
  user_id: string;
  name: string;
  doctor: string;
  date: string;
  complaints: string;
}

interface IAllChange {
  name: string;
  doctor: string;
  date: string;
  complaints: string;
}

interface ITableProps {
  item: IData;
  setActiveDelete: (e: boolean) => void;
  setIdDelete: (e: string) => void;
  setActiveChange: (e: boolean) => void;
  setIdChange: (e: string) => void;
  setAllChange: (e: IAllChange) => void;
}

const Table = ({
  item,
  setActiveDelete,
  setIdDelete,
  setActiveChange,
  setIdChange,
  setAllChange,
}: ITableProps) => {
  const buildAppoint = (item: IAllChange) => {
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
