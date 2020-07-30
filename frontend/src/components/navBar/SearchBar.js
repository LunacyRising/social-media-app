import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { fetchPosts } from "../../actions/postsActions/fetchPostsAction";
import { handleQuery } from "../../actions/postsActions/queryAction";

const SearchBar = () => {

  const useStyles = makeStyles((theme) => ({

    searchBar: {
     width: 150,
     height: 40,
     backgroundColor: theme.palette.background.paper,
     "@media(min-width: 469px) and (max-width: 768px)": {
        width: 200
      },
      "@media(min-width: 769px)": {
        position: "absolute",
        left: "50%",
        bottom: -20,
        transform: "translateX(-35%)",
        width: 250
      }
    },
    icon: {
        cursor: "pointer"
    } 
  }));
  const classes = useStyles(); 

  const { searchBar, icon} = classes;

  const { query } = useSelector(state => state.postReducer); 

  const handleChange = e => {
    const inputValue = e.target.value;
    const skip = 0;
    const amounOfPosts = 0;
    dispatch(handleQuery(skip, inputValue, amounOfPosts)) 
  };

  const dispatch = useDispatch()

  const searchPosts = (e) => {
    e.preventDefault();
    query && dispatch(fetchPosts(query));
  }
    return (
        <>
            <TextField
            InputProps={{
                className: searchBar,
                endAdornment:<InputAdornment className={icon} onClick={(e) => searchPosts(e)} position="end"><SearchRoundedIcon/></InputAdornment>,
            }}
            color="primary"
            onChange={handleChange}
            value={query} 
            variant="outlined"/>
        </>
    );
};

export default SearchBar;
