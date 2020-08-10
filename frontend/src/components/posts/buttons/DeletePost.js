import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip, Box} from "@material-ui/core";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import DeletePostDialog from "../DeletePostDialog";


const DeletePost = ({ postId, title }) => {

    const useStyles = makeStyles(() => ({

      btn: {
        width: 30,
        height: 30,
        marginRight: 5
      }
    })); 
    
    const classes = useStyles();

    const { btn } = classes;

    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (

        <Box>
            <Tooltip title={t("Delete")}>
                <IconButton className={btn} onClick={() => handleClickOpen()}>
                  <DeleteTwoToneIcon/>
                </IconButton>
              </Tooltip>
              {<DeletePostDialog open={open} handleClose={handleClose} postId={postId} title={title}/>}
        </Box>
    );
};

export default DeletePost;
