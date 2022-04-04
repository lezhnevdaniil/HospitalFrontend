import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../index';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import Snackbar from '@mui/material/Snackbar';
import Header from '../Header/Header';
import Table from '../Table/Table';
import Doctors from '../Doctors/Doctors';
import ModalChange from '../ModalChange/ModalChange';
import ModalDelete from '../ModalDelete/ModalDelete';
import logoFilter from '../logo/logoFilter.svg';
import logoFilterDelete from '../logo/logoFilterDelete.svg';
import './Reception.scss';
import SortOptions from '../SortOptions/SortOptions';

const Reception = () => {
  const [allAppoint, setAllAppoint] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeDelete, setActiveDelete] = useState(false);
  const [activeChange, setActiveChange] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [sortCheck, setSortCheck] = useState(false);
  const [direction, setDirection] = useState('По возрастанию');
  const [idChange, setIdChange] = useState('');
  const [itemApp, setItemApp] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateBy, setDateBy] = useState('');
  const [allChange, setAllChange] = useState({
    name: '',
    doctor: '',
    date: '',
    complaints: '',
  });
  const [sortName, setSortName] = useState('');
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);

  const url = 'http://localhost:8000';

  const handleClose = () => {
    setOpen(false);
  };

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
    await axios
      .get(`${url}/allAppoints?token=${localStorage.getItem('token')}`)
      .then((res) => {
        setAllAppoint(res.data);
      });
  }, []);

  const appointment = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data)
    const name = data.get('name');
    const doctor = data.get('doctor');
    const date = data.get('date');
    const complaints = data.get('complaints');
    if (name && doctor && date && complaints) {
      const reception = [...allAppoint];
      const newRec = {
        token: localStorage.getItem('token'),
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
    } else {
      setOpen(true);
    }
  };

  const sortingReception = (e) => {
    allAppoint.sort((a, b) => {
      if (e === 'ФИО') {
        if (direction === 'По возрастанию') {
          if (a[sortName] === b[sortName]) return 0;
          return a[sortName] > b[sortName] ? 1 : -1;
        } else {
          if (a[sortName] === b[sortName]) return 0;
          return a[sortName] < b[sortName] ? 1 : -1;
        }
      } else if (e === 'ВРАЧ') {
        if (direction === 'По возрастанию') {
          if (a[sortName] === b[sortName]) return 0;
          return a[sortName] > b[sortName] ? 1 : -1;
        } else {
          if (a[sortName] === b[sortName]) return 0;
          return a[sortName] < b[sortName] ? 1 : -1;
        }
      } else {
        if (direction === 'По возрастанию') {
          if (a[sortName] === b[sortName]) return 0;
          return a[sortName] > b[sortName] ? 1 : -1;
        } else {
          if (a[sortName] === b[sortName]) return 0;
          return a[sortName] < b[sortName] ? 1 : -1;
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
    await axios
      .get(`${url}/allAppoints?token=${localStorage.getItem('token')}`)
      .then((res) => {
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
      <Snackbar
        open={open}
        onClose={handleClose}
        message='Заполните все поля'
      />
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
                <Doctors />
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
              setSortName(e.target.value);
            }}
          >
            <option/>
            <SortOptions />
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
              <img
                src={logoFilter}
                alt='Упс'
                onClick={() => {
                  setActiveFilter(true);
                }}
              ></img>
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
            <img
              src={logoFilterDelete}
              alt='Упс'
              onClick={() => {
                setActiveFilter(false);
                filterDelete(allAppoint);
              }}
            ></img>
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
                      allChange={allChange}
                      setAllChange={setAllChange}
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
          allChange={allChange}
          setAllChange={setAllChange}
        ></ModalChange>
      }
    </>
  );
};

export default Reception;
