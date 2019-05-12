import io from "socket.io-client";

export const BACKEND_ENDPOINT =
  process.env.REACT_APP_PROD_URL || "http://localhost:8081";

export const connectSocket = id =>
  io(BACKEND_ENDPOINT, { query: "boardId=" + id });

export const defaultBoard = {
  boardId: "",
  title: "",
  items: {},
  columns: {},
  columnOrder: [],
  error: false,
  isBlurred: true
};

export const fetchGET = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const ok = await response.ok;

    return { json, ok };
  } catch (error) {
    return error;
  }
};

export const isBoardIdValid = async boardId => {
  try {
    const response = await fetch(`/api/boards/validate/${boardId}`);

    return await response.ok;
  } catch (error) {
    return error;
  }
};

export const isInputEmpty = inputLength => inputLength <= 0;

export const validateInput = (inputLength, minLength, maxLength) => {
  const isEmpty = isInputEmpty(inputLength);
  const isTooLong = inputLength > maxLength;
  const isValid = !isEmpty && !isTooLong;

  return { isEmpty, isTooLong, isValid };
};
