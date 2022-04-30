import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const LoginHandler = async (e) => {
    e.preventDefault();

    let result = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      result = await result.json();
      setPassword("");
      setUsername("");
      login();
      navigate("/MyProfile");
      return alert("Du är inloggad");
    } else {
      return alert(
        "Du är redan inloggad eller angivit fel användarnamn / lösenord"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="row d-flex justify-content-center flex-column align-items-center">
        <div className="login-form">
          <form id="loginform">
            <div className="form-group">
              <h1>Logga in</h1>
              <label>Användarnamn</label>
              <input
                type="text"
                className="form-control"
                id="userNameInput"
                name="userNameInput"
                aria-describedby="userNameHelp"
                placeholder="Ange användarnamn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <small
                id="userNameHelp"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="form-group">
              <label>Lösenord</label>
              <input
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Ange lösenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <small
                id="passworderror"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="login-buttons">
              <button
                onClick={LoginHandler}
                type="submit"
                className="btn btn-primary"
              >
                Logga in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
