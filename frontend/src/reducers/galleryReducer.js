import {FETCH_GALLERY_SUCCESS, FETCH_GALLERY_FAIL, UPLOAD_IMAGE_GALLERY_SUCCESS, UPLOAD_IMAGE_GALLERY_FAILED, IMAGE_LOADING, GALLERY_LOADING, CHANGE_PAGE} from "../actions/types";  
  
  const initialState = {
    imageLoading: false,
    galleryLoading: false,
    gallery: [],
    skip: 0, 
    limit: 4,
    currentPage: 0,
    amountOfImages: 0,
    galleryLength: 0
  };
  
  const galleryReducer = (state = initialState, action) => { 
    switch (action.type) {
        case IMAGE_LOADING:
            return {
                ...state,
                imageLoading: true
            };
        case GALLERY_LOADING:
            return {
                ...state,
                galleryLoading: true
            } 
        case FETCH_GALLERY_SUCCESS:
            return {
            ...state,
            galleryLoading: false,
            gallery: action.payload.images,
            amountOfImages: action.payload.amountOfImages,
            galleryLength: action.payload.galleryLength,
            currentPage: action.payload.currentPage 
        };
        case FETCH_GALLERY_FAIL:
            return {
            ...state,
            imageLoading: false,
        };
        case CHANGE_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        case UPLOAD_IMAGE_GALLERY_SUCCESS:  
            return {
            ...state,
            imageLoading: false, 
            gallery: [action.payload, ...state.gallery]
        };
        case UPLOAD_IMAGE_GALLERY_FAILED:
            return {
            ...state,
            imageLoading: false
        };
        default:
        return state;
    }
  };
  
  export default galleryReducer;
  