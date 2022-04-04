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
  const [allAppoint, setAllAppoint] = useState<IData[] | any>([]);
  const [filterAllAppoint, setFilterAllAppoint] = useState<IData[] | any>([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [activeDelete, setActiveDelete] = useState(false);
  const [activeChange, setActiveChange] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [sortCheck, setSortCheck] = useState<string | null>();
  const [direction, setDirection] = useState<string | null>('По возрастанию');
  const [idChange, setIdChange] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateBy, setDateBy] = useState('');
  const [sortName, setSortName] = useState<any | null>();
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [allChange, setAllChange] = useState<IAllChange>({
    name: '',
    doctor: '',
    date: '',
    complaints: '',
  });

  const url = 'http://localhost:8000';

  interface IAllChange {
    name: string;
    doctor: string;
    date: string;
    complaints: string;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const deleteFunction = async (id: string) => {
    await axios.delete(`${url}/deleteAppoint?_id=${id}`).then((res) => {
      const deleteAppoint: IData[] = allAppoint.filter(
        (allAppoint: IData) => allAppoint._id !== id
      );
      setIdDelete('');
      setAllAppoint(deleteAppoint);
    });
  };

  interface INewRec {
    _id?: string;
    token?: string | null;
    user_id?: string | null;
    name: string | any;
    doctor: string | any;
    date: string | any;
    complaints: string | any;
  }

  interface IData {
    _id: string;
    token?: string | null;
    user_id: string;
    name: string;
    doctor: string;
    date: string;
    complaints: string;
  }

  interface IRes {
    data: IData[];
  }

  const functionEffect = async (): Promise<void> => {
    await axios
      .get(`${url}/allAppoints?token=${localStorage.getItem('token')}`)
      .then((res: IRes) => {
        setAllAppoint(res.data);
        setFilterAllAppoint(res.data);
      });
  };

  useEffect(() => {
    functionEffect();
  }, []);

  const appointment = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const doctor = data.get('doctor');
    const date = data.get('date');
    const complaints = data.get('complaints');
    if (name && doctor && date && complaints) {
      const reception = [...allAppoint];
      const newRec: INewRec = {
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

  const sortingReception = (e: string) => {
    allAppoint.sort((a: string, b: string): any => {
      if (sortName === 'ФИО') {
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
  const filteredArray: INewRec[] = [...filterAllAppoint];
  const filterFunction = (arr: INewRec[]) => {
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
              sortingReception(sortName);
              setSortName(e.target.value);
            }}
          >
            <option />
            <SortOptions />
          </select>
          {sortCheck ? (
            <>
              <p>Направление:</p>
              <select
                onChange={(e) => {
                  setDirection(e.target.value);
                  sortingReception(sortName);
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
              onClick={() => {
                setAllAppoint(filterFunction(filteredArray));
              }}
            >
              Фильтровать
            </button>
            <img
              src={logoFilterDelete}
              alt='Упс'
              onClick={() => {
                setActiveFilter(false);
                filterDelete();
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
              {allAppoint.map((item: IData, index: number) => (
                <>
                  {
                    <Table
                      key={item._id}
                      item={item}
                      setActiveDelete={setActiveDelete}
                      setIdDelete={setIdDelete}
                      setActiveChange={setActiveChange}
                      setIdChange={setIdChange}
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
