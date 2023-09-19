import React from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";

import "./authentication.styles.scss";
import { useState } from "react";

const Authentication = () => {
  const [authType, setAuthType] = useState('sign-in')

  return (
    <div className="authentication-container">
      {authType === 'sign-in' ? <SignInForm setValue={setAuthType} /> : <SignUpForm setValue={setAuthType} />}
    </div>
  );
};

export default Authentication;
