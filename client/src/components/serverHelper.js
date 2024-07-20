import { backendURl } from "./url";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const response = await fetch(backendURl + route, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      //"authorization":`Bearer ${user.token}`
    },
    body: JSON.stringify(body),
  });

  const formattedData = await response.json();
  //console.log(formattedData);
  return formattedData;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(backendURl + route, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const formattedData = await response.json();
  //console.log(formattedData);
  return formattedData;
};

export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const response = await fetch(backendURl + route, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const formattedData = await response.json();
  //console.log(formattedData);
  return formattedData;
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};
