import React, {useState} from "react";
import {IconButton,Tooltip} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import {loginModalOpen} from "../../actions/modalsActions/login";
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { makeStyles } from "@material-ui/core/styles";

const Dial = () => {


  const useStyles = makeStyles(() => ({
    greenLike: {
      color: "green"
    }
  }));
  const classes = useStyles();
  const {greenLike} = classes;

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const dispatch = useDispatch()
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const btns = [
    {
      component: <AddComment/>,
      name: "Comment!"
    },
    {
      component: <AddFavorite/>,
      name: "Add Favorite!"
    }, 
    {
      component: <EditPost/>,
      name: "Edit!"
    }, 
    {
      component: <DeletePost/>,
      name: "Delete!"
    }, 
  ]

    return (
        <>
            <SpeedDial
            ariaLabel="SpeedDial"
            hidden={hidden}
            icon={<SpeedDialIcon fontSize="small"/>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={direction}
            >
            <SpeedDialAction
              icon={<AddComment/>}
            />
            </SpeedDial>
        </>
    );
};

export default Dial;
