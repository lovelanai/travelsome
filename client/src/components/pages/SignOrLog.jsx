import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function SignOrLog() {
  return (
    <div className="login-container" style={{ display: "flex" }}>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h1>Skapa konto / Logga in</h1>
        <p>För att skriva recensioner krävs ett konto</p>
        <div className="form-group login-buttons">
          <Link to="/CreateUser">
            <button className="btn btn-primary">Skapa användare</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary">Logga in</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
