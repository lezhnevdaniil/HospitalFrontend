import React from 'react';
import './ModalDelete.scss';

interface IAModalDeleteProps {
  idDelete: string;
  deleteFunction: (e: string) => void;
  setActiveDelete: (e: boolean) => void;
  activeDelete: boolean;
}

const ModalDelete = ({
  activeDelete,
  setActiveDelete,
  deleteFunction,
  idDelete,
}: IAModalDeleteProps) => {
  return (
    <div
      className={activeDelete ? 'modal active' : 'modal'}
      onClick={() => setActiveDelete(false)}
    >
      <div
        className={activeDelete ? 'modalContent active' : 'modalContent'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='information'></div>
        <div className='message-div'>
          <p onClick={() => setActiveDelete(false)}>
            Вы действительно хотите удалить прием?
          </p>
        </div>
        <div className='button-div'>
          <button
            className='buttonCancel'
            onClick={() => setActiveDelete(false)}
          >
            Cancel
          </button>
          <button
            className='buttonDelete'
            onClick={() => {
              deleteFunction(idDelete);
              setActiveDelete(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
