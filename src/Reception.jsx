import React, { useState, useEffect, useContext } from 'react';
import { Context } from './index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from './Header';
import Table from './Table';
import ModalDelete from './ModalDelete';
import './Reception.scss';
import ModalChange from './ModalChange';
import _ from 'lodash';

const Reception = () => {
  const [allAppoint, setAllAppoint] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeDelete, setActiveDelete] = useState(false);
  const [activeChange, setActiveChange] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [sortCheck, setSortCheck] = useState(false);
  const [direction, setDirection] = useState(false);
  const [idChange, setIdChange] = useState('');
  const [itemApp, setItemApp] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateBy, setDateBy] = useState('');
  const [nameChange, setNameChange] = useState('');
  const [doctorChange, setDoctorChange] = useState('');
  const [dateChange, setDateChange] = useState('');
  const [complaintsChange, setComplaintsChange] =
    useState('itemApp.complaints');
  const { store } = useContext(Context);

  const url = 'http://localhost:7000';

  const deleteFunction = async (id) => {
    await axios.delete(`${url}/deleteAppoint?_id=${id}`).then((res) => {
      const deleteAppoint = allAppoint.filter(
        (allAppoint) => allAppoint._id !== id
      );
      setIdDelete('');
      setAllAppoint(deleteAppoint);
    });
  };

  useEffect(async () => {
    await axios.get(`${url}/allAppoints?user_id=${localStorage.getItem('user_id')}`).then((res) => {
      setAllAppoint(res.data);
    });
  }, []);

  const appointment = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const doctor = data.get('doctor');
    const date = data.get('date');
    const complaints = data.get('complaints');
    if (name && doctor && date && complaints) {
      const reception = [...allAppoint];
      const newRec = {
        user_id: localStorage.getItem('user_id'),
        name: name,
        doctor: doctor,
        date: date,
        complaints: complaints,
      };
      await axios.post(`${url}/createAppoint`, newRec).then((res) => {
        newRec._id = res.data._id;
        reception.push(newRec);
        setAllAppoint(reception);
      });
      e.target.reset();
    } else alert('Введите все поля');
  };

  const sortingReception = (e) => {
    allAppoint.sort((a, b) => {
      if (e === 'ФИО') {
        if (direction === 'По возрастанию') {
          if (a.name === b.name) return 0;
          return a.name > b.name ? 1 : -1;
        } else {
          if (a.name === b.name) return 0;
          return a.name < b.name ? 1 : -1;
        }
      } else if (e === 'ВРАЧ') {
        if (direction === 'По возрастанию') {
          if (a.doctor === b.doctor) return 0;
          return a.doctor > b.doctor ? 1 : -1;
        } else {
          if (a.doctor === b.doctor) return 0;
          return a.doctor < b.doctor ? 1 : -1;
        }
      } else {
        if (direction === 'По возрастанию') {
          if (a.date === b.date) return 0;
          return a.date > b.date ? 1 : -1;
        } else {
          if (a.date === b.date) return 0;
          return a.date < b.date ? 1 : -1;
        }
      }
    });
  };

  if (sortCheck) {
    sortingReception(sortCheck);
  }

  const filteredArray = [...allAppoint];

  const filterFunction = (arr) => {
    if (activeFilter) {
      if (dateBy && dateFrom) {
        arr = _.filter(filteredArray, (item) =>
          moment(item.date).isBetween(dateFrom, dateBy, 'date', '[]')
        );
      } else if (dateFrom) {
        arr = _.filter(filteredArray, (item) =>
          moment(item.date).isAfter(dateFrom)
        );
      } else if (dateBy) {
        arr = _.filter(filteredArray, (item) =>
          moment(item.date).isBefore(dateBy)
        );
      }
      return arr;
    } else {
      arr = sortingReception;
    }
    return arr;
  };

  const filterDelete = async () => {
    await axios.get(`${url}/allAppoints`).then((res) => {
      setAllAppoint(res.data);
    });
  };

  return (
    <>
      <Header>
        <h1>Приемы</h1>
        <Link to='/authorization'>
          <button onClick={() => store.logout()} className='buttonEnd'>
            Выход
          </button>
        </Link>
      </Header>
      <form onSubmit={appointment}>
        <div className='info'>
          <div className='main-div'>
            <div className='label'>
              <label>Имя:</label>
              <input name='name'></input>
            </div>
            <div className='label'>
              <label>Врач:</label>
              <select name='doctor'>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className='label'>
              <label>Дата:</label>
              <input name='date' type='date'></input>
            </div>
            <div className='label'>
              <label>Жалобы:</label>
              <input name='complaints'></input>
            </div>
            <div className='buttonAdd'>
              <button>Добавить</button>
            </div>
          </div>
        </div>
      </form>
      <div className='filter'>
        <div className='filterTop'>
          <p>Сортировать по:</p>
          <select
            onChange={(e) => {
              setSortCheck(e.target.value);
              sortingReception(e.target.value);
            }}
          >
            <option></option>
            <option>ФИО</option>
            <option>ВРАЧ</option>
            <option>ДАТА</option>
          </select>
          {sortCheck ? (
            <>
              <p>Направление:</p>
              <select
                onChange={(e) => {
                  setDirection(e.target.value);
                  sortingReception(e.target.value);
                }}
              >
                <option>По возрастанию</option>
                <option>По убыванию</option>
              </select>
            </>
          ) : (
            ''
          )}
          {!activeFilter ? (
            <>
              <p>Добавить фильтр по дате</p>
              <svg
                onClick={() => {
                  setActiveFilter(true);
                }}
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M26.6667 0H3.33333C1.48333 0 0 1.5 0 3.33333V26.6667C0 28.5 1.48333 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM23.3333 16.6667H16.6667V23.3333H13.3333V16.6667H6.66667V13.3333H13.3333V6.66667H16.6667V13.3333H23.3333V16.6667Z'
                  fill='black'
                  fill-opacity='0.8'
                />
              </svg>
            </>
          ) : (
            ''
          )}
        </div>
        {activeFilter ? (
          <div className='filterBottom'>
            <div className='settingFilter'>
              <p>с:</p>
              <input
                onChange={(e) => {
                  setDateFrom(e.target.value);
                }}
                type={'date'}
              ></input>
            </div>
            <div className='settingFilter'>
              <p>по:</p>
              <input
                onChange={(e) => {
                  setDateBy(e.target.value);
                }}
                type={'date'}
              ></input>
            </div>
            <button
              onClick={(e) => {
                setAllAppoint(filterFunction(e));
              }}
            >
              Фильтровать
            </button>
            <svg
              onClick={() => {
                setActiveFilter(false);
                filterDelete(allAppoint);
              }}
              width='24'
              height='30'
              viewBox='0 0 24 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.00004 26.6667C2.00004 28.5 3.50004 30 5.33337 30H18.6667C20.5 30 22 28.5 22 26.6667V6.66667H2.00004V26.6667ZM5.33337 10H18.6667V26.6667H5.33337V10ZM17.8334 1.66667L16.1667 0H7.83337L6.16671 1.66667H0.333374V5H23.6667V1.66667H17.8334Z'
                fill='black'
              />
            </svg>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='divTable'>
        <div className='divTableChild'>
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Врач</th>
                <th>Дата</th>
                <th>Жалобы</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allAppoint.map((item, index) => (
                <>
                  {
                    <Table
                      url={url}
                      key={item._id}
                      item={item}
                      setAllAppoint={setAllAppoint}
                      setIdDelete={setIdDelete}
                      setActiveChange={setActiveChange}
                      setActiveDelete={setActiveDelete}
                      activeChange={activeChange}
                      idChange={idChange}
                      setIdChange={setIdChange}
                      itemApp={itemApp}
                      setItemApp={setItemApp}
                      setNameChange={setNameChange}
                      setDoctorChange={setDoctorChange}
                      setDateChange={setDateChange}
                      setComplaintsChange={setComplaintsChange}
                    />
                  }
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {
        <ModalDelete
          idDelete={idDelete}
          deleteFunction={deleteFunction}
          setActiveDelete={setActiveDelete}
          activeDelete={activeDelete}
          activeChange={activeChange}
        />
      }
      {
        <ModalChange
          setActiveChange={setActiveChange}
          activeChange={activeChange}
          setAllAppoint={setAllAppoint}
          url={url}
          setIdChange={setIdChange}
          idChange={idChange}
          nameChange={nameChange}
          setNameChange={setNameChange}
          doctorChange={doctorChange}
          setDoctorChange={setDoctorChange}
          dateChange={dateChange}
          setDateChange={setDateChange}
          complaintsChange={complaintsChange}
          setComplaintsChange={setComplaintsChange}
        ></ModalChange>
      }
    </>
  );
};

export default Reception;
