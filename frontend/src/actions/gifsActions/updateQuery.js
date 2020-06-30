import { UPDATE_QUERY_GIF } from "../types";


export const updateQuery = ( gifQuery ) => {

    let gifOffset = 0
    let gifs = []

    return {
      type: UPDATE_QUERY_GIF,
      payload: {
        gifOffset,
        gifQuery,
        gifs
      }
    };
  };
  
  