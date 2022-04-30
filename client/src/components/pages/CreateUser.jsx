import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function CreateUser() {
  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  // Skapa användare
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("/user", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (result.ok) {
      result = await result.json();
      setpassword("");
      setuserName("");
      navigate("/Login");
      return alert("Användare skapad");
    }
    return alert(
      "Användarnamnet finns redan, vänligen välj ett annat användarnamn"
    );
  };

  return (
    <div className="login-container">
      <div className="row d-flex justify-content-center flex-column align-items-center">
        <div className="login-form">
          <form action="" id="loginform">
            <div className="form-group">
              <h1>Skapa användare</h1>
              <label>Användarnamn</label>
              <input
                type="text"
                className="form-control"
                id="userNameInput"
                name="userNameInput"
                aria-describedby="userNameHelp"
                placeholder="Ange användarnamn"
                value={username}
                onChange={(e) => setuserName(e.target.value)}
              />
              <small
                id="userNameHelp"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="form-group">
              <label>Lösenord</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Ange lösenord"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <small
                id="passworderror"
                className="text-danger form-text"
              ></small>
            </div>
            <div className="login-buttons">
              <button
                type="submit"
                onClick={handleOnSubmit}
                className="btn btn-primary"
              >
                Skapa användare
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
