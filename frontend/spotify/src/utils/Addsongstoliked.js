// utils/Addsongstoliked.js

import { makeAuthenticatedPOSTRequest } from "../components/serverHelper";

export const Addsongstoliked = async (currentSong) => {
  if (!currentSong) {
    console.error("No current song available.");
    return;
  }

  const { _id: songId } = currentSong;

  try {
    const response = await makeAuthenticatedPOSTRequest(`/liked/${songId}`);

    if (response) {
      console.log(response);
    } else {
      alert("Empty response or unexpected format");
    }
  } catch (error) {
    console.error("Error in adding song:", error);
  }
};
