import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { registerModalOpen } from "../../../../actions/modalsActions/register";
import { NavBtn } from "../../../../styledComponents/MyBtn";

const RegisterBtn = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch()


    return (
            <>
                <NavBtn onClick={() => dispatch(registerModalOpen())}>
                    {t("Register")}
                </NavBtn>
            </>
        )
    }
export default RegisterBtn
