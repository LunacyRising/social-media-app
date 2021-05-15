import apiUtil from "../../utils/apiUtil/apiUtil";
import { returnMessages, snackOpen } from "../messagesActions";
import { FETCH_GALLERY_SUCCESS,  FETCH_GALLERY_FAIL, GALLERY_LOADING } from "../types";

export const fetchGalleryImages = (page) => async (dispatch, getState) => { 

  // pagina actual
  console.log(page)

  const { userName } = getState().authReducer;

  const { limit } = getState().galleryReducer;

  dispatch({type: GALLERY_LOADING});

  try {
    const response = await apiUtil.post(`/gallery/${userName}`,{skip : page * limit , limit}
    );
    
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
    dispatch(returnMessages(errorCode));
    dispatch({
      type: FETCH_GALLERY_FAIL
    });
  }
};
