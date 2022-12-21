import { render } from '@testing-library/react';
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

class GeneralCardItem extends React.Component {
  state = {
    showDropDown: false,
    dropDownPosition: {
      x: 0,
      y: 0,
      clientWidth: 0,
    },
    showModal: null,
  };

  showDropDawn = evt => {
    console.dir(document.documentElement);
    this.setState({
      showDropDown: true,
      dropDownPosition: {
        x: evt.clientX,
        y: evt.clientY,
        clientWidth: document.documentElement.clientWidth,
      },
    });
  };

  toggleDropDawn = () => {
    this.setState(({ showDropDown }) => ({
      showDropDown: !showDropDown,
    }));
  };

  closeModal = () => {
    this.setState(prev => ({ showModal: null }));
  };

  handleActionBtnClick = action => {
    this.setState({ showModal: action, showDropDown: false });
  };

  editItem = () => {
    console.log('Edit Item');
  };

  render() {
    const { text, id, relation, deleteCard } = this.props;
    // console.log(id, relation);
    return (
      <Paper>
        <StyledItem>
          <span>{text}</span>
          <StyledButtonMenu onClick={this.showDropDawn}>
            <BsThreeDotsVertical />
          </StyledButtonMenu>
          {this.state.showDropDown && (
            <Modal onClose={this.toggleDropDawn}>
              <StyledContainer
                x={this.state.dropDownPosition.x}
                y={this.state.dropDownPosition.y}
                clientWidth={this.state.dropDownPosition.clientWidth}
              >
                <StyledButton type="button" onClick={() => this.handleActionBtnClick('edit')}>
                  <EditBtnIcon />
                  Edit
                </StyledButton>
                <StyledButton type="button" onClick={() => this.handleActionBtnClick('delete')}>
                  <DeleteBtnIcon />
                  Delete
                </StyledButton>
              </StyledContainer>
            </Modal>
          )}
        </StyledItem>
        {this.state.showModal === 'delete' && (
          <Modal onClose={this.closeModal}>
            <ModalActionContainer>
              <h2>Delete {relation === 'departments' ? 'department' : 'city'} </h2>
              <button onClick={() => deleteCard(id, relation)}>Yes</button>
              <button onClick={this.closeModal}>No</button>
            </ModalActionContainer>
          </Modal>
        )}
        {this.state.showModal === 'edit' && (
          <Modal onClose={this.closeModal}>
            <ModalActionContainer>
              <AddItemForm
                onSubmit={this.editItem}
                title={relation === 'departments' ? 'Edit department' : 'Edit city'}
              ></AddItemForm>
            </ModalActionContainer>
          </Modal>
        )}
      </Paper>
    );
  }
}

export default GeneralCardItem;
