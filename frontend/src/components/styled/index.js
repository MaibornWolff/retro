import styled, { css } from "styled-components";

export const AppName = styled.div`
  color: white;
  font-family: "Lobster", cursive;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 20vw;
  margin: 1em;
  border: 1px solid grey;
  border-radius: 2px;
  background-color: white;
  box-shadow: 0 6px 6px -2px lightgrey;
`;

export const ItemContainer = styled.div`
  margin-bottom: 1em;
`;

export const CardContainer = styled.div``;

export const CardWrapper = styled.div`
  position: relative;
  border: ${p => (p.isBlurred ? "1px" : "0px")} solid lightgrey;
  ${CardContainer} {
    filter: blur(${p => (p.isBlurred ? "5px" : 0)});
  }
`;

export const Unblur = styled.a`
  position: absolute;
  top: 4%;
  right: 2%;
  color: black;

  &:hover {
    color: #757575;
  }
`;

export const ItemsContainerStyles = css`
  flex-grow: 1;
  min-height: 100px;
  padding: 1em;
  background-color: ${p => (p.isDraggingOver ? "#f5f5f5" : "inherit")};
  transition: background-color 0.2s ease;
`;

export const ButtonStyles = css`
  box-shadow: 0 4px 4px -2px grey !important;
`;
