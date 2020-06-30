import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {loginModalOpen} from "../../../../actions/modalsActions/login";
import { NavBtn } from "../../../../styledComponents/MyBtn";

const LoginBtn = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch()


    return (
            <>
                <NavBtn onClick={() => dispatch(loginModalOpen())}>
                {t("Login")} 
                </NavBtn>
            </>
        )
    }
export default LoginBtn
