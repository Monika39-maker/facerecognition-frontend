import { React, useState, useContext, useRef } from "react";
import "../style.css";
import "tachyons";
import { UserContext } from "../Helper/Contexts";

export default function SignInForm({ handleRouteChange, noOfEntries }) {
  const userEmail = useRef(null);
  const userPassword = useRef(null);

  const [loggingFailMessage, setLoggingFailMessage] = useState("");
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  function handleSignIn(e) {
    e.preventDefault();
    fetch("http://localhost:8000/signIn", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail.current.value,
        password: userPassword.current.value,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((user) => {
        if (user.length == 0) {
          setLoggingFailMessage("Sorry wrong credentials. Please try again");
          console.log(loggingFailMessage);
        } else {
          setLoggedInUser(user[0]);

          handleRouteChange("index");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <article className="pa4 black-80 sign-in-card">
      <h3>{loggingFailMessage.length > 0 ? loggingFailMessage : ""}</h3>
      <form onSubmit={handleSignIn}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="email">
              Email address
            </label>
            <input
              className="pa2 input-reset ba bg-transparent w-100 measure"
              type="email"
              name="email"
              id="email"
              ref={userEmail}
            />
          </div>
          <div className="mt3">
            <label className="db fw4 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent"
              type="password"
              name="password"
              id="password"
              ref={userPassword}
            />
          </div>
        </fieldset>
        <div className="mt3" onClick={handleSignIn}>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            value="Sign In"
          />
        </div>
      </form>
      <form>
        <p>Not Registered yet?</p>
        <div className="mt3">
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 submit-button"
            type="submit"
            value="Register"
            onClick={() => handleRouteChange("register")}
          />
        </div>
      </form>
    </article>
  );
}
