import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import englishicon from "../../../../../src/utils/images/englishicon.svg";
import useTranslate from "../../useTranslate";
import { NavBtn } from "../../../../styledComponents/MyBtn";

const LoginBtn = () => {


  const useStyles = makeStyles(() => ({

    span: {
        width: 25,
        height: 25,
        backgroundImage: `url(${englishicon})`
      },
    noMargin: {
        marginRight: 0
    }
  }));
  const classes = useStyles();

  const { span, noMargin } = classes;

  const { changeLang } = useTranslate()

    return (
            <>
                <NavBtn className={noMargin} onClick={() => changeLang("en")}> 
                    <span className={span}/>
                </NavBtn>
            </>
        )
    }
export default LoginBtn
