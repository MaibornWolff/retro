export const BACKEND_ENDPOINT =
  process.env.REACT_APP_PROD_URL || "http://localhost:8081";

export const closeModal = () =>
  document.querySelector(".custom-modal > button").click();
