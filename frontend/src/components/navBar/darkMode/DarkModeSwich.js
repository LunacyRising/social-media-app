import React  from "react";
import { useDispatch,useSelector} from "react-redux";
import {  Zoom, IconButton, Tooltip } from "@material-ui/core";
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import Brightness7TwoToneIcon from '@material-ui/icons/Brightness7TwoTone';
import { makeStyles } from "@material-ui/core/styles";
import { darkModeOn } from "../../../actions/darkModeAction/darkMode";
import { closeDrawer } from "../../../actions/modalsActions/drawer";



const DarkModeSwich = () => {
  const useStyles = makeStyles(() => ({
    btn: {
      width: 30,
      height: 30,
      marginRight: 5,
      color: "white"
    }
  }));

  const classes = useStyles();

  const { btn } = classes;

  const dispatch = useDispatch();

  const { darkMode } = useSelector(state => state.darkModeReducer);

  const { openDrawer } = useSelector(state => state.modalsReducer);

  const toogleDarkMode = () => {
    dispatch(darkModeOn());
    openDrawer && dispatch(closeDrawer())
  }

  return (
    <>  
        <Tooltip TransitionComponent={Zoom} title="Toogle Dark Mode" arrow>
          <IconButton className={btn} onClick={() =>toogleDarkMode()}>
              {darkMode ? <Brightness7TwoToneIcon/> : <Brightness4TwoToneIcon/> }
          </IconButton>
        </Tooltip>
    </>
  );
};

export default DarkModeSwich;
