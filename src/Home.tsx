import LogoLarge from "./assets/images/Temp-logo-large.svg";
import { Link } from "react-router-dom";
import "./components.css";
import "./home.css";

export default function Home() {
  return (
    <div className="container-home">
      <div className="head-home">
        <img id="logo" src={LogoLarge} alt="" />
        <div className="btn-container">
          <Link to="/login">
            <button type="button" className="btn-2">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button type="button" className="btn-2">
              Create an account
            </button>
          </Link>
        </div>
      </div>
      <div className="bodyofpage">
        <div className="para-container">
          <h1>
            Welcome to truebond, a place where likeminded people meet for a
            lifetime bond
          </h1>
        </div>
      </div>
    </div>
  );
}
