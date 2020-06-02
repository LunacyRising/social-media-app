import React, {useState} from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const SearchBar = () => {

  const useStyles = makeStyles((theme) => ({

    searchBar: {
     backgroundColor: theme.palette.background.paper,
     marginLeft: 130,
    },
    icon: {
        cursor: "pointer"
    }
  }));
  const classes = useStyles(); 

  const { searchBar, icon} = classes;

  const [query, setQuery] = useState(""); 

  const handleChange = e => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  const dispatch = useDispatch()

    return (
        <>
            <TextField 
            InputProps={{
                className: searchBar,
                endAdornment:<InputAdornment className={icon} onClick={() => console.log(query)} position="end"><SearchRoundedIcon/></InputAdornment>,
            }}
            color="primary"
            onChange={handleChange} 
            value={query} 
            variant="outlined"/>
        </>
    );
};

export default SearchBar;
