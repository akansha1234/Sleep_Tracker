import React, { useState } from "react";
import { auth } from "../Config/firebase";
const Login = ({ setNewUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const logIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        // displayName:u.user.displayName,
        // photoURL:u.user.photoUrl
        //console.log(u);
      })
      .catch((error) => alert("Please register first!!"));
  };
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        if (u.additionalUserInfo.isNewUser) {
          setNewUser(true);
        } else {
          setNewUser(false);
        }
        u.user.updateProfile({
          displayName: name
        });
        //console.log(u);
      })
      .catch((error) =>
        alert(
          "Please fill all the fields correctly, password should be atleast 6 characters"
        )
      );
  };
  return (
    <div className="login-page">
      <h1> Login </h1>
      <form className="form">
        {/* <label>Name</label> */}
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
        />
        {/* <label>Email</label> */}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        {/* <label>Password</label> */}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        {hasAccount ? (
          <>
            {" "}
            <button type="submit" onClick={logIn} className="login-button">
              Sign in
            </button>
            <p className="login-desc">
              Don't have an account?{" "}
              <span onClick={() => setHasAccount(false)} className="register">
                Register here
              </span>
              .
            </p>{" "}
          </>
        ) : (
          <>
            {" "}
            <button type="submit" onClick={signUp} className="login-button">
              Register
            </button>
            <p className="login-desc">
              {" "}
              Already have an account?{" "}
              <span onClick={() => setHasAccount(true)} className="register">
                {" "}
                Sign in
              </span>{" "}
            </p>{" "}
          </>
        )}
      </form>
    </div>
  );
};
export default Login;
