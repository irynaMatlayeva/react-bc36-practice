import { AddItemForm, Paper } from 'components';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { ReactComponent as DeleteBtnIcon } from '../../assets/images/delete.svg';
import { ReactComponent as EditBtnIcon } from '../../assets/images/edit.svg';
import {
  StyledButton,
  StyledButtonMenu,
  StyledContainer,
  StyledItem,
  ModalActionContainer,
} from './GeneralCardItem.styled';

import { Modal } from 'components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { deleteCitiesOperation, editCitiesOperation } from 'store/cities/operations';
import { deleteDepartmentsOperation } from 'store/departments/operations';

function GeneralCardItem({ text, id, relation, deleteCard, editCard }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({
    x: 0,
    y: 0,
    clientWidth: 0,
    clientHeight: 0,
  });
  const [showModal, setShowModal] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickToId = evt => {
    if (evt.target.closest('button')) return;
    if (relation !== 'departments') return;
    navigate(`/departments/${id}`);
  };

  const showDropDawn = evt => {
    setShowDropDown(true);
    setDropDownPosition({
      x: evt.clientX,
      y: evt.clientY,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
    });
  };

  const toggleDropDawn = () => {
    setShowDropDown(!showDropDown);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleActionBtnClick = action => {
    setShowModal(action);
    setShowDropDown(false);
    // this.setState({ showModal: action, showDropDown: false });
  };

  return (
    <Paper onClick={onClickToId}>
      <StyledItem>
        <span>{text}</span>
        <StyledButtonMenu onClick={showDropDawn}>
          <BsThreeDotsVertical />
        </StyledButtonMenu>
        {showDropDown && (
          <Modal onClose={toggleDropDawn}>
            <StyledContainer
              x={dropDownPosition.x}
              y={dropDownPosition.y}
              clientWidth={dropDownPosition.clientWidth}
              clientHeight={dropDownPosition.clientHeight}
            >
              <StyledButton type="button" onClick={() => handleActionBtnClick('edit')}>
                <EditBtnIcon />
                Edit
              </StyledButton>
              <StyledButton type="button" onClick={() => handleActionBtnClick('delete')}>
                <DeleteBtnIcon />
                Delete
              </StyledButton>
            </StyledContainer>
          </Modal>
        )}
      </StyledItem>
      {showModal === 'delete' && (
        <Modal onClose={closeModal}>
          <ModalActionContainer>
            <h2>Delete {relation === 'departments' ? 'department' : 'city'} </h2>
            <button
              onClick={() => {
                relation === 'cities'
                  ? dispatch(deleteCitiesOperation(id))
                  : dispatch(deleteDepartmentsOperation(id));
              }}
            >
              Yes
            </button>
            <button onClick={closeModal}>No</button>
          </ModalActionContainer>
        </Modal>
      )}
      {showModal === 'edit' && (
        <Modal onClose={closeModal}>
          <ModalActionContainer>
            <AddItemForm
              onSubmit={editCitiesOperation}
              title={relation === 'departments' ? 'Edit department' : 'Edit city'}
              idItem={id}
              relation={relation}
              textItem={text}
              closeModal={closeModal}
            ></AddItemForm>
          </ModalActionContainer>
        </Modal>
      )}
    </Paper>
  );
}

export default GeneralCardItem;
