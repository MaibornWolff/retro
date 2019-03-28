import styled, { css } from "styled-components";

export const Hero = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.img});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
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

export const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageNotFoundText = styled.h2`
  font-family: "Permanent Marker", cursive;
  font-size: 280%;
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
