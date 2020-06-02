import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import {IconButton,Tooltip} from "@material-ui/core";

const EditPost = ({ editPostModal }) => {

  const useStyles = makeStyles(() => ({

    btn: {
        width: 30,
        height: 30,
        marginRight: 5
      }        
    }));

    const classes = useStyles();

    const { btn } = classes;

  /////////////////////////////////////////////////////////

    return (
        <>
            <Tooltip title="Edit!">
                <IconButton className={btn} onClick={editPostModal} >
                  <EditTwoToneIcon/>
                </IconButton>
              </Tooltip>
        </>
    );
};

export default EditPost;
