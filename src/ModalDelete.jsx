import React from 'react';
import './ModalDelete.scss';

const ModalDelete = ({children, activeDelete, setActiveDelete, deleteFunction, idDelete}) => {
  return (
    <div className={activeDelete ? 'modal active' : 'modal'} onClick={() => setActiveDelete(false)}>
      <div className={activeDelete ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
        <div className='information'>
          {children}
        </div>
        <div className='message-div'>
          <p onClick = {() => setActiveDelete(false)}>Вы действительно хотите удалить прием?</p>
        </div>
        <div className='button-div'>
          <button  className='buttonCancel' onClick = {() => setActiveDelete(false)}>Cancel</button>
          <button  className='buttonDelete' onClick = {() => {deleteFunction(idDelete); setActiveDelete(false)}}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
