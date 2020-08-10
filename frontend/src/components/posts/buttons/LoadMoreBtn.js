import React  from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core";
import GavelTwoToneIcon from '@material-ui/icons/GavelTwoTone';
import dots from "../../../utils/images/dots.svg";

const LoadMoreBtn = ({ loadMore, moreCommentsLoading }) => {

    const useStyles = makeStyles(() => ({
      
      container: {
        margin: "auto"
      },  
      btn: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 11
      },
      spanBtn: {
        marginRight: 8
      }
    })); 
    
    const classes = useStyles();

    const { container, btn, spanBtn } = classes;

    const { t } = useTranslation();

    return (

        <Box className={container}>
            { moreCommentsLoading ? <img src={dots} alt="dots"/>: 
            <Button className={btn} onClick={() => loadMore()}>
                <span className={spanBtn}>{t("LoadMoreComments")}</span> 
                <GavelTwoToneIcon/>
            </Button>}
        </Box>
    );
};

export default LoadMoreBtn;
