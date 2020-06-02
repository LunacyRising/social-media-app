import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";

const FavoritesBtn = () => {


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

  const dispatch = useDispatch();

    return (
            <>
                <Link className={btn} onClick={() =>dispatch(closeDrawer())} to="/favorites">Favorites</Link>
            </>
        )
    }
export default FavoritesBtn
