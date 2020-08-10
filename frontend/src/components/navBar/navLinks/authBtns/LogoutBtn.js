import React from "react";
import { useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logoutAction } from "../../../../actions/authActions/logoutAction";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";
import { NavBtn } from "../../../../styledComponents/MyBtn";


const LogoutBtn = () => {

  const { t } = useTranslation();

  const history = useHistory(); 

  const dispatch = useDispatch()

  const logoutDispatch = () => { 
    dispatch(logoutAction());
    dispatch(closeDrawer());
    history.push("/logingOut");
  }

  return (
          <>
            <NavBtn onClick={() => logoutDispatch()}> 
                {t("Logout")}
            </NavBtn>
          </>
      )
  }
export default LogoutBtn