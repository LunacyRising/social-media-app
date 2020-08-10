import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import spanishicon from "../../../../../src/utils/images/spanishicon.svg";
import useTranslate from "../../useTranslate";
import { NavBtn } from "../../../../styledComponents/MyBtn";

const LoginBtn = () => {


  const useStyles = makeStyles(() => ({

    noMargin: {
        marginRight: 0
    }
  }));
  const classes = useStyles();

  const { noMargin } = classes;

  const { changeLang } = useTranslate()

    return (
            <>
                <NavBtn className={noMargin} onClick={() => changeLang("es")}>
                    <img src={spanishicon} width={25} height={25} alt="icon"/>
                </NavBtn>
            </>
        )
    }
export default LoginBtn
