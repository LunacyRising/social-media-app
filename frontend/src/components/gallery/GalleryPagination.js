import React from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';
import { PaginationItem } from '@material-ui/lab';
import { fetchGalleryImages } from "../../actions/userActions/fetchGalleryImages";


const GalleryPagination = () => {

    const useStyles = makeStyles(() => ({

        pagination: {
            marginTop: 40,
            marginBottom: 40
        }
       
      }));   
  
  const classes = useStyles(); 

  const { pagination } = classes;

  const dispatch = useDispatch()

  const { userId } = useSelector( state => state.authReducer);

  const { gallery, galleryLength, limit} = useSelector( state => state.galleryReducer);

  const handlePageChange = (event, page) => {
    dispatch(fetchGalleryImages(page - 1))
}

  return (
      <>
          <Pagination
           className={pagination}
           color="primary"
           count={Math.round(galleryLength / limit)}
           onChange={handlePageChange}
           renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/gallery/${userId}${`?page=${item.page}`}`}
              {...item}
            />
          )}
           /> 
      </>
  );
};

export default GalleryPagination