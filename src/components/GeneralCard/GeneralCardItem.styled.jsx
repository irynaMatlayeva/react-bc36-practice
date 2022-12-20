import styled from 'styled-components';

export const StyledList = styled.ul`
  display: flex;
`;

export const StyledItem = styled.li`
  position: relative;
  display: flex;
  padding: 12px 40px;
  width: 370px;
  min-height: 72px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

export const StyledContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 232px;
  height: 112px;
  padding-top: 8px;
  padding-bottom: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

export const StyledButtonMenu = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  width: 32px;
  height: 32px;
  display: block;

  :hover,
  :focus {
    border-radius: 50%;
    background-color: #eceff1;
  }
`;

export const StyledButton = styled.button`
  padding: 10px 24px;
  border: none;
  background-color: white;
  text-align: left;

  :hover,
  :focus {
    background-color: #fafafa;
  }

  svg {
    margin-right: 25px;
  }
`;
