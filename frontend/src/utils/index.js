import io from "socket.io-client";

export const BACKEND_ENDPOINT =
  process.env.REACT_APP_PROD_URL || "http://localhost:3001";

export const connectSocket = id =>
  io(BACKEND_ENDPOINT, { query: "boardId=" + id });

export const defaultBoard = {
  boardId: "",
  title: "",
  items: {},
  columns: {},
  columnOrder: [],
  error: false,
  isBlurred: true,
  maxVoteCount: 3
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

export const removeFirstOccurenceFromArray = (array, element, shallReturn) => {
  const index = array.indexOf(element);

  if (index > -1) {
    array.splice(index, 1);
  }

  if (shallReturn) {
    return array;
  }
};
