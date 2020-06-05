import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, CircularProgress } from "@material-ui/core";
import GavelTwoToneIcon from '@material-ui/icons/GavelTwoTone';
import { fetchPosts } from "../../../actions/postsActions/fetchPostsAction";


const LoadMoreBtn = () => {

    const useStyles = makeStyles(() => ({
      
      container: {
        paddingBottom: 20
      },  
      btn: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      spanBtn: {
        marginRight: 8
      },
      disabled: {
        pointerEvents: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }
    })); 
    
    const classes = useStyles();

    const { container, btn, spanBtn, disabled } = classes;

    const { t } = useTranslation();

    const { loadingMorePosts } = useSelector(state => state.postReducer);

    const { query } = useSelector(state => state.postReducer);

    const dispatch = useDispatch()

    return (

        <Box className={container}>
            { loadingMorePosts ? <CircularProgress size={50}/>: 
            <Button className={loadingMorePosts ? disabled : btn} onClick={() => dispatch(fetchPosts(query))}>
                <span className={spanBtn}>{t("LoadMore")}</span>
                <GavelTwoToneIcon/>
            </Button>}
        </Box>
    );
};

export default LoadMoreBtn;
