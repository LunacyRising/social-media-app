import React from "react";
import Recaptcha from "react-recaptcha";
import { useDispatch } from "react-redux";
import { verifyCaptchaAction } from "../../actions/authActions/verifyCaptchaAction";

const Captcha = () => {
  const dispatch = useDispatch();
  const captchaDispatch = () => dispatch(verifyCaptchaAction());

  const captchaLoaded = () => {
    console.log("captchaLoaded");
  };
  const verifyCallback = async response => {
    const test = await response;
    test && captchaDispatch();
  };
  return (
    <div className="captcha">
      <Recaptcha
        sitekey="6LewnM0UAAAAABVb0aqhDQbSah_dcD9NpbyXBxVV"
        render="explicit"
        onloadCallback={captchaLoaded}
        verifyCallback={verifyCallback}
      />
    </div>
  );
};

export default Captcha;
