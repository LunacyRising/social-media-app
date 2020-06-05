import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { fetchPosts } from "../../actions/postsActions/fetchPostsAction";
import {handleQuery} from "../../actions/postsActions/queryAction";

const SearchBar = () => {

  const useStyles = makeStyles((theme) => ({

    searchBar: {
     height: 40,
     backgroundColor: theme.palette.background.paper,
     "@media(min-width: 769px)": {
      marginLeft: 130
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
    e.preventDefault();
    let query = e.target.value;
    let skip = 0;
    let amounOfPosts = 0;
    dispatch(handleQuery({skip, query, amounOfPosts})) 
  };

  const dispatch = useDispatch()

  const searchPosts = () => {
    dispatch(fetchPosts(query));
  }
    return (
        <>
            <TextField 
            InputProps={{
                className: searchBar,
                endAdornment:<InputAdornment className={icon} onClick={() => searchPosts()} position="end"><SearchRoundedIcon/></InputAdornment>,
            }}
            color="primary"
            onChange={handleChange} 
            value={query} 
            variant="outlined"/>
        </>
    );
};

export default SearchBar;
