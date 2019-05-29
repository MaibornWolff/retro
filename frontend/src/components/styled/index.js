import styled, { css } from "styled-components";

export const Hero = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${props => props.img});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22vw;
  margin: 0.8em;
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

export const CardAuthor = styled.p`
  max-width: 15vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardText = styled.p`
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
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
  min-height: 100px;
  flex-grow: 1;
  padding: 1em;
  background-color: ${p => (p.isDraggingOver ? "#f5f5f5" : "inherit")};
  transition: background-color 0.2s ease;
`;

export const ButtonStyles = css`
  box-shadow: 0 4px 4px -2px grey !important;
`;
