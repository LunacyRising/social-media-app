import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle   } from "@material-ui/core";
import { deletePost } from "../../actions/postsActions/deletePost";


const DeletePostDialog = ({ open, handleClose, postId, title}) => {

    const { t } = useTranslation();

    const dispatch = useDispatch()

    const deletePostAction = () => {
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
                <DialogTitle >{t("ConfirmationDeletePost")}</DialogTitle>
                <DialogContent> 
                <DialogContentText id="alert-dialog-description">
                    {t("DeleteText")} {title}... ?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t("Cancel")}
                </Button>
                <Button onClick={() => deletePostAction()} color="primary" autoFocus>
                    {t("Accept")}
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeletePostDialog;
