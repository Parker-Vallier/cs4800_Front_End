import React, { useState } from "react";
import ReactDOM from "react-dom";

import CommonSection from "../components/ui/Common-section/CommonSection";

import "../styles/Login.css";

const LOGIN_KEY = 'nftApps.username'

function Login() {

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    var { uname, pass } = document.forms[0];


    const userData = database.find((user) => user.username === uname.value);


    if (userData) {
      if (userData.password !== pass.value) {

        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        localStorage.setItem(LOGIN_KEY, uname.value)
      }
    } else {

      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <center>
      <div className="form">
        <form className="login-form-two" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="username" >Username </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label className="password" >Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </center>
  );

  return (
    <>
      <CommonSection title={"Login"} />
      <center>
        <div className="app">
          <div className="login-form">
            {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
          </div>
        </div>
      </center>
    </>
  );
}
export default Login;

const rootElement = document.getElementById("root");
ReactDOM.render(<Login />, rootElement);