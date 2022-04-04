import React from 'react';
import axios from 'axios';
import moment from 'moment';
import './ModalChange.scss';

interface IAllChange {
  name: string;
  doctor: string;
  date: string;
  complaints: string;
}

interface IData {
  _id: string;
  user_id: string;
  name: string;
  doctor: string;
  date: string;
  complaints: string;
}

interface IModalChangeProps {
  setActiveChange: (e: boolean) => void;
  activeChange: boolean;
  setAllAppoint: (e: IData[]) => void;
  url: string;
  setIdChange: (e: string) => void;
  idChange: string;
  allChange: IAllChange;
  setAllChange: (e: IAllChange) => void;
}

const ModalChange = ({
  activeChange,
  setActiveChange,
  setAllAppoint,
  url,
  setIdChange,
  idChange,
  allChange,
  setAllChange,
}: IModalChangeProps) => {
  const patchFunction = async (id: string) => {
    await axios
      .patch(`${url}/updateAppoint`, {
        token: localStorage.getItem('token'),
        _id: id,
        name: allChange.name,
        doctor: allChange.doctor,
        date: moment(allChange.date).format('YYYY-MM-DD'),
        complaints: allChange.complaints,
      })
      .then((res) => {
        setAllAppoint(res.data);
      });
  };

  const buildAppoint = (value: string, type: string) => {
    setAllChange({ ...allChange, [type]: value });
  };
  return (
    <div
      className={activeChange ? 'modalChange activeChange' : 'modalChange'}
      onClick={() => setActiveChange(false)}
    >
      <div
        className={
          activeChange
            ? 'modalContentChange activeChange'
            : 'modalContentChange'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className='informationChange'>
          <p>Изменить прием</p>
        </div>
        <div className='messageChange-div'>
          <label>Имя:</label>
          <input
            value={allChange.name}
            onChange={(e) => {
              buildAppoint(e.target.value, 'name');
            }}
          ></input>
          <label>Врач:</label>
          <input
            value={allChange.doctor}
            onChange={(e) => {
              buildAppoint(e.target.value, 'doctor');
            }}
          ></input>
          <label>Дата:</label>
          <input
            className='data'
            value={moment(allChange.date).format('YYYY-MM-DD')}
            type='date'
            onChange={(e) => {
              buildAppoint(e.target.value, 'date');
            }}
          ></input>
          <label>Жалобы:</label>
          <textarea
            value={allChange.complaints}
            onChange={(e) => {
              buildAppoint(e.target.value, 'complaints');
            }}
          ></textarea>
        </div>
        <div className='buttonChange-div'>
          <button
            className='buttonCancel'
            onClick={() => {
              setActiveChange(false);
              setIdChange('');
            }}
          >
            Cancel
          </button>
          <button
            className='buttonSave'
            onClick={() => {
              patchFunction(idChange);
              setIdChange('');
              setActiveChange(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChange;
