import React, { useState, useEffect } from "react";
import "./styles.css";
import Home from "./Components/Home";
import Entry from "./Components/Entry";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from "./Config/firebase";
import Login from "./Components/Login";
export default function App() {
  const [user, setUser] = useState("");
  const [newUser, setNewUser] = useState(false);
  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        //console.log(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authListener();
  }, []);
  return (
    <div className="app">
      <Router>
        <Switch>
          {!user ? (
            <Route path="/">
              <Login setNewUser={setNewUser} />
            </Route>
          ) : (
            <Route exact path="/">
              <Home user={user} />
            </Route>
          )}
          <Route path="/entry">
            <Entry user={user} newUser={newUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
