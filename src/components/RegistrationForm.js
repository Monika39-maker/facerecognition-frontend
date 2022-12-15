import { React, useState, useRef } from "react";
import "../style.css";
import "tachyons";

export default function RegistrationForm({ handleRouteChange }) {
  const userName = useRef(null);
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  function handleRegistration(e) {
    e.preventDefault();
    fetch("https://facerecognition-backend.onrender.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName.current.value,
        email: userEmail.current.value,
        password: userPassword.current.value,
        entries: 1,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        handleRouteChange("signin");
      })
      .catch((err) => console.log(err));
  }
  return (
    <article className="pa4 black-80 sign-in-card">
      <form action="sign-up_submit" method="get">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="ph0 mh0 fw6 clip">Register</legend>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="fulname">
              Full Name
            </label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 measure"
              type="text"
              name="fullname"
              id="fullname"
              ref={userName}
              // onChange={handleRegistrationUserName}
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="email-address">
              Email address
            </label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 measure"
              type="email"
              name="email-address"
              id="email-address"
              ref={userEmail}
              // onChange={handleRegistrationUserEmail}
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="Password1">
              Password
            </label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 measure"
              type="password"
              name="password"
              id="password"
              ref={userPassword}
            />
          </div>
        </fieldset>

        <div className="mt3" onClick={handleRegistration}>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 submit-button"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </article>
  );
}
