import React from "react";
import {useDispatch} from "react-redux";
import { Button , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle   } from "@material-ui/core";
import { deletePost } from "../../actions/postsActions/deletePost";


const DeletePostDialog = ({ open, handleClose, postId, title}) => {

    const dispatch = useDispatch()

    const test = () => {
        dispatch(deletePost({postId}));
        handleClose()
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation to delete post"}</DialogTitle>
                <DialogContent> 
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete post {title}... ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => test()} color="primary" autoFocus>
                    Accept
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeletePostDialog;
