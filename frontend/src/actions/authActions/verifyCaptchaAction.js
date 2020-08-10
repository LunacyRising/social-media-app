import { VERIFY_CAPTCHA_SUCCESS } from "../types";

export const verifyCaptchaAction = () => {
  return {
    type: VERIFY_CAPTCHA_SUCCESS
  };
};
