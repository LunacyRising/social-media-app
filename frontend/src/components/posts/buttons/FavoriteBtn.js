import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import { IconButton,Tooltip } from "@material-ui/core";
import { createFavorite } from "../../../actions/favoritesActions/createFavorite";
import { deleteFavorite } from "../../../actions/favoritesActions/deleteFavorite";
import { itemExists } from "../itemExists";

const FavoriteBtn = ({ postId }) => {

    const useStyles = makeStyles((theme) => ({

        btn: {
            width: 30,
            height: 30,
            marginRight: 5
        },
        color: {
            color: theme.palette.primary.main
        }       
    }));

    const classes = useStyles();

    const { btn, color } = classes;   

    const { userId } = useSelector(state => state.authReducer);

    const { favoritesSqueleton } = useSelector(state => state.favoritesReducer);

    const { t } = useTranslation();

    const dispatch = useDispatch(); 

    const favoriteExists = itemExists(favoritesSqueleton, postId, userId)


    const action = (id) => {
        !favoriteExists ? dispatch(createFavorite(id)) : dispatch(deleteFavorite(id))
    }

   // console.log(favoriteExists) 
  
    return (
        <>
            <Tooltip title={!favoriteExists ? t("AddFavorites") : t("RemoveFavorites")}>
                <IconButton className={!favoriteExists ? btn : `${btn} ${color}` }  onClick={() => action(postId)}>
                    <StarTwoToneIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default FavoriteBtn;
