import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./NotFound.css"; 

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ marginTop: "100px" }}
    >
      <FontAwesomeIcon icon={faBan} className="custom-icon" />
      <h4 className="custom-heading m-3">
        Page not found
      </h4>
      <button
        type="button"
        className="custom-btn"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
