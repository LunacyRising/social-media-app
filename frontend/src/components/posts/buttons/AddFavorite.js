import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import { IconButton,Tooltip } from "@material-ui/core";
import { createFavorite } from "../../../actions/favoritesActions/createFavorite";
import {loginModalOpen} from "../../../actions/modalsActions/login";


const AddFavorite = ({ postId }) => {

    const useStyles = makeStyles(() => ({

        btn: {
            width: 30,
            height: 30,
            marginRight: 5
        }        
    }));

    const classes = useStyles();

    const { btn } = classes;   

    const { isAuthenticated } = useSelector(state => state.authReducer);

    const { t } = useTranslation();

    const dispatch = useDispatch(); 

    const addFavorite = () => {
        isAuthenticated ? dispatch(createFavorite({postId})) : dispatch(loginModalOpen());
    };
  
    return (
        <>
            <Tooltip title={t("AddFavorites")}>
                <IconButton className={btn}  onClick={() => addFavorite()}>
                    <StarTwoToneIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default AddFavorite;
