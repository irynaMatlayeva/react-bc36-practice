import { render } from '@testing-library/react';
import { Paper } from 'components';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { ReactComponent as DeleteBtnIcon } from '../../assets/images/delete.svg';
import { ReactComponent as EditBtnIcon } from '../../assets/images/edit.svg';
import {
  StyledButton,
  StyledButtonMenu,
  StyledContainer,
  StyledItem,
} from './GeneralCardItem.styled';

class GeneralCardItem extends React.Component {
  state = {
    showDropDown: false,
  };

  toggleDropDawn = () => {
    this.setState(({ showDropDown }) => ({
      showDropDown: !showDropDown,
    }));
  };

  render() {
    const { text, deleteCard, id, relation } = this.props;
    // console.log(id, relation);
    return (
      <Paper>
        <StyledItem>
          <span>{text}</span>
          <StyledButtonMenu onClick={this.toggleDropDawn}>
            <BsThreeDotsVertical />
          </StyledButtonMenu>
          {this.state.showDropDown && (
            <StyledContainer>
              <StyledButton type="button">
                <EditBtnIcon />
                Edit
              </StyledButton>
              <StyledButton
                type="button"
                onClick={() => deleteCard(id, relation)}
              >
                <DeleteBtnIcon />
                Delete
              </StyledButton>
            </StyledContainer>
          )}
        </StyledItem>
      </Paper>
    );
  }
}

export default GeneralCardItem;
