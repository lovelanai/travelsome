import { Link } from "react-router-dom";
import "./NotLoggedIn.css";

export default function NotLoggedIn() {
  return (
    <div style={{ display: "flex" }} className="login-container">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h1 className="notloggedin">Logga in för att skriva en recension</h1>
        <div className="form-group login-buttons">
          <Link to="/SignOrLog">
            <button className="btn btn-primary tologin">Till inloggning</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
