import React from 'react';
import axios from 'axios';
import moment from 'moment';
import './ModalChange.scss';

const ModalChange = ({activeChange, setActiveChange, setAllAppoint, url, setIdChange, idChange, nameChange, setNameChange,
  doctorChange, setDoctorChange, dateChange, setDateChange,
  complaintsChange, setComplaintsChange, itemApp}) => {

  const patchFunction = async (id) => {
    console.log(complaintsChange)
    await axios
      .patch(`${url}/updateAppoint`, {
        _id: id,
        name: nameChange,
        doctor: doctorChange,
        date: moment(dateChange).format('YYYY-MM-DD'),
        complaints: complaintsChange,
      })
      .then((res) => {
        setAllAppoint(res.data);
      });
  };
  return (
    <div className={activeChange ? 'modalChange activeChange' : 'modalChange'} onClick={() => setActiveChange(false)}>
      <div className={activeChange ? 'modalContentChange activeChange' : 'modalContentChange'} onClick={e => e.stopPropagation()}>
        <div className='informationChange'>
            <p>Изменить прием</p>
          </div>
          <div className='messageChange-div'>
            <label>Имя:</label>
            <input
              value={nameChange}
              onChange={(e) => {
                setNameChange(e.target.value);
              }}
            ></input>
            <label>Врач:</label>
            <input
              value={doctorChange}
              onChange={(e) => {
                setDoctorChange(e.target.value);
              }}
            ></input>
            <label>Дата:</label>                     
            <input
              className='data'
              value={moment(dateChange).format('YYYY-MM-DD')}
              type='date'
              onChange={(e) => {
                setDateChange(e.target.value);
              }}
            ></input>
            <label>Жалобы:</label>
            <textarea
              value={complaintsChange}
              onChange={(e) => {
                setComplaintsChange(e.target.value);
              }}
            ></textarea>
          </div>
          <div className='buttonChange-div'>
            <button
              className='buttonCancel'
              onClick={() => {setActiveChange(false); 
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
                setNameChange();
                setDoctorChange();
                setDateChange();
                setComplaintsChange();
              }}
            >
              Save
            </button>
          </div>
      </div>
    </div>
  );
}

export default ModalChange;