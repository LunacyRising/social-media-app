import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../actions/modalsActions/drawer"

const useTranslate = () => {

    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    const changeLang = (language) => { 
        i18n.changeLanguage(language);
        dispatch(closeDrawer())
      }
    

    return { changeLang }
}

export default useTranslate