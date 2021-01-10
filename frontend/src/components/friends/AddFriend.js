import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { friendRequest } from "../../actions/friendsActions/friendRequest";

const AddFriend = ({ friendId }) => { 

    const useStyles = makeStyles(() => ({

        btn: {
          width: 20,
          height: 20,
        },
        container: {
            marginTop: 15
        }
      })); 

    const classes = useStyles();

    const { btn, container } = classes;


    const { t } = useTranslation();

    const dispatch = useDispatch(); 
  
    return (
        <>
            <Box className={container}>
                <Tooltip title={t("AddToFriendList")}> 
                    <IconButton onClick={() => dispatch(friendRequest(friendId))} className={btn}> 
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
};

export default AddFriend;
