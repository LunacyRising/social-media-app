import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { IconButton,Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { friendRequest } from "../../actions/friendsActions/friendRequest";

const AddFriend = ({ friendId }) => { 

    const useStyles = makeStyles(() => ({

        btn: {
          width: 20,
          height: 20,
          //marginRight: 5
        }
      })); 

    const classes = useStyles();

    const { btn } = classes;


    const { t } = useTranslation();

    const dispatch = useDispatch(); 
  
    return (
        <>
            <Tooltip title={t("AddToFriendList")}> 
                <IconButton onClick={() => dispatch(friendRequest(friendId))} className={btn}> 
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default AddFriend;
