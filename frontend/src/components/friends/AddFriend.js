import React from "react";
import { useDispatch } from "react-redux";
import { IconButton,Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import { addFriends } from "../../actions/friendsActions/addFriend";

const AddFriend = ({ creatorUserName, avatar}) => { 

    const useStyles = makeStyles(() => ({
        btn: {
          width: 30,
          height: 30,
          marginRight: 5
        }
      })); 
      const classes = useStyles();

      const { btn } = classes;

    const dispatch = useDispatch(); 
  
    return (
        <>
            <Tooltip title="add to friendlist!">
                <IconButton onClick={() => dispatch(addFriends({userName : creatorUserName, avatar}))} className={btn}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default AddFriend;
