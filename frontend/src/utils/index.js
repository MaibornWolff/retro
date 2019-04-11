import io from "socket.io-client";

export const BACKEND_ENDPOINT =
  process.env.REACT_APP_PROD_URL || "http://localhost:8081";

export const socket_connect = id =>
  io(BACKEND_ENDPOINT, { query: "boardId=" + id });

export const emptyBoard = {
  boardId: "",
  title: "",
  items: {},
  columns: {},
  columnOrder: []
};

export const fetchGET = async url => {
  const response = await fetch(url);
  const json = await response.json();
  const ok = await response.ok;

  return { json, ok };
};
