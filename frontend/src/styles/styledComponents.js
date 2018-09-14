import styled, { css } from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
`;

export const ColumnContainer = styled.div`
  width: 400px;
  margin: 1em;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  box-shadow: 2px 2px 1px lightgrey;
  display: flex;
  flex-direction: column;
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 1em;
`;

export const HeaderContainer = styled.div`
  margin: 1.5em 1em 0em 1em;
  display: flex;
  justify-content: space-between;
`;

export const ItemContainer = styled.div`
  margin-bottom: 1.5em;
  box-shadow: 4px 4px 1px lightgrey;
`;

export const CardFooter = styled.div`
  padding: .5em;
  display: flex;
  justify-content: space-between;
`;

export const CardPoints = styled.div`
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 2em;
  width: 2em;
  margin: .5em;
`;

export const NavbarButton = styled.div`
  margin: .5em;
`;

export const ItemsContainerStyles = css`
  padding: 1em;
  transition: background-color 0.2s ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${p => (p.isDraggingOver ? "lightgrey" : "inherit")};
`;

export const BoardTitleStyles = css`
  margin: 0 !important;
`;

export const ColumnTitleStyles = css`
  padding: 8px;
  margin-bottom: 0 !important;
`;

export const ColumnActionButtonStyles = css`
  margin-left: 0.2em;
`;
