import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, FormControl, Input, InputLabel, Box  } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CSSTransition } from 'react-transition-group' 
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { fetchPosts } from "../../actions/postsActions/fetchPostsAction";
import { handleQuery } from "../../actions/postsActions/queryAction";

const SearchBar = () => {

  const useStyles = makeStyles((theme) => ({

    bar1: {
      position: "absolute",
      bottom: -40,
      left: 0,
      width: "100%",
      transition: "0.5s ease-in-out",
      backgroundColor: theme.palette.background.paper,
      "@media (min-width: 1024px)": {
        display: "none"
      }
    },
    bar2: {
      display: "none",
      "@media (min-width: 1024px)": {
        position: "initial",
        display: "block",
        width: "initial"
      }
    },
    icon: {
        cursor: "pointer"
    },
    searchIcon:{
      width: 30,
      height: 30,
      marginLeft: 10,
      color: "white",
      transition: "0.2s ease-in-out",
      "&:hover":{
        color: theme.palette.primary.main
      },  
      "@media (min-width: 1024px)": {
        display: "none"
      },
    }
  }));
  const classes = useStyles(); 

  const { bar1, bar2, icon, searchIcon} = classes;

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

  const [ searchOpen, setSearchOpen ] = useState(false);

    return (
        <>
          <IconButton className={searchIcon} onClick={() => setSearchOpen(prev => !prev)}>
            <SearchRoundedIcon/>
          </IconButton>
          <CSSTransition in={searchOpen} timeout={500} unmountOnExit={true} classNames="search-bar">
            <TextField
            className={bar1}
            size="small"
            InputProps={{
                endAdornment:<InputAdornment className={icon} onClick={searchPosts} position="end"><SearchRoundedIcon/></InputAdornment>,
            }}
            color="primary"
            onChange={handleChange}
            value={query} 
            variant="outlined"/>
          </CSSTransition>
          <TextField
            className={`${bar1} ${bar2}`}
            size="small"
            InputProps={{
                endAdornment:<InputAdornment className={icon} onClick={searchPosts} position="end"><SearchRoundedIcon/></InputAdornment>,
            }}
            color="primary"
            onChange={handleChange}
            value={query} 
            variant="outlined"/>
        </>
    );
};

export default SearchBar;
