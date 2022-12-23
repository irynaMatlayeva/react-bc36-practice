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

function GeneralCardItem({ text, id, relation, deleteCard, editCard }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({
    x: 0,
    y: 0,
    clientWidth: 0,
    clientHeight: 0,
  });
  const [showModal, setShowModal] = useState(null);

  const showDropDawn = evt => {
    setShowDropDown(true);
    setDropDownPosition({
      x: evt.clientX,
      y: evt.clientY,
      clientWidth: document.documentElement.clientWidth,
      clientHeight: document.documentElement.clientHeight,
    });
    // this.setState({
    //   showDropDown: true,
    //   dropDownPosition: {
    //     x: evt.clientX,
    //     y: evt.clientY,
    //     clientWidth: document.documentElement.clientWidth,
    //     clientHeight: document.documentElement.clientHeight,
    //   },
    // });
  };

  const toggleDropDawn = () => {
    setShowDropDown(!showDropDown);
    // this.setState(({ showDropDown }) => ({
    //   showDropDown: !showDropDown,
    // }));
  };

  const closeModal = () => {
    setShowModal(null);
    // this.setState(prev => ({ showModal: null }));
  };

  const handleActionBtnClick = action => {
    setShowModal(action);
    setShowDropDown(false);
    // this.setState({ showModal: action, showDropDown: false });
  };

  return (
    <Paper>
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
              <StyledButton
                type="button"
                onClick={() => handleActionBtnClick('edit')}
              >
                <EditBtnIcon />
                Edit
              </StyledButton>
              <StyledButton
                type="button"
                onClick={() => handleActionBtnClick('delete')}
              >
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
            <h2>
              Delete {relation === 'departments' ? 'department' : 'city'}{' '}
            </h2>
            <button onClick={() => deleteCard(id, relation)}>Yes</button>
            <button onClick={closeModal}>No</button>
          </ModalActionContainer>
        </Modal>
      )}
      {showModal === 'edit' && (
        <Modal onClose={closeModal}>
          <ModalActionContainer>
            <AddItemForm
              onSubmit={editCard}
              title={
                relation === 'departments' ? 'Edit department' : 'Edit city'
              }
              idItem={id}
              relation={relation}
            ></AddItemForm>
          </ModalActionContainer>
        </Modal>
      )}
    </Paper>
  );
}

export default GeneralCardItem;
