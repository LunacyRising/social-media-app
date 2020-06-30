import axios from "axios";
import { returnMessages, snackOpen } from "../messagesActions";
import { FETCH_GALLERY_SUCCESS,  FETCH_GALLERY_FAIL, GALLERY_LOADING } from "../types";

export const fetchGalleryImages = (page) => async (dispatch, getState) => { 

  // pagina actual
  console.log(page)

  const { userName } = getState().authReducer;

  const { limit } = getState().galleryReducer;

  dispatch({type: GALLERY_LOADING});

  try {
    const response = await axios.post(
      `http://localhost:5001/gallery/${userName}`,
       {
        // index de donde va a comenzar a fetchear las imagenes en el backend, ej: 0 * 5 = primera pagina y 5 imagenes.
        skip : page * limit ,
        // limite de imagenes a fetchear, fijado a 5
        limit
       }
    );
  
    console.log(response)

    dispatch({
      type: FETCH_GALLERY_SUCCESS,
      payload: {
        images: response.data.images,
        amountOfImages: response.data.amountOfImages,
        galleryLength: response.data.galleryLength,
        currentPage: page === undefined ? 0 : page
      }
    });

    dispatch(snackOpen());

    const messageCode = response.data.code;

    dispatch(returnMessages(messageCode));

  } catch (err) {
    let errorCode = err.response ? err.response.data.code : 500;
    let error = err.response && err.response.data.error;
    dispatch(returnMessages(errorCode, error));
    dispatch({
      type: FETCH_GALLERY_FAIL
    });
  }
};
