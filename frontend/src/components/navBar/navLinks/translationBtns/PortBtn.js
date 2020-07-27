import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavBtn } from "../../../../styledComponents/MyBtn";
import brazil from "../../../../../src/utils/images/brazil.png";
import useTranslate from "../../useTranslate";


const LoginBtn = () => {


  const useStyles = makeStyles(() => ({ 
    
    span: {
        width: 25,
        height: 25
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
                <NavBtn className={noMargin} onClick={() => changeLang("pt")}>
                    <img className={span} src={brazil} width={25} height={25} alt="brazil"/>
                </NavBtn>
            </>
        )
    }
export default LoginBtn
