import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
//import {IconButton,Tooltip, List, ListItem, ListItemText, ListItemIcon, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { registerModalOpen } from "../../../../actions/modalsActions/register";

const RegisterBtn = () => {


  const useStyles = makeStyles(() => ({
      
    btn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
        transition: ".2s ease all",
        marginRight: 10,
        "&:hover": {
          textDecoration: "none",
          color: "#8b70d2",
          backgroundColor: "transparent"
        },
      }
  }));
  const classes = useStyles();
  const { btn } = classes;


  const dispatch = useDispatch()


    return (
            <>
                <Link className={btn} onClick={() => dispatch(registerModalOpen())}>
                    Register
                </Link>
            </>
        )
    }
export default RegisterBtn
