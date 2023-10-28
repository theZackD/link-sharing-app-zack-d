import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [error, setError] = useState<string>("");

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLoggout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Oops ! Failed to logout ! Please try again :/");
    }
  }

  return (
    <div>
      <p>You are logged in</p>
      <p>
        <strong>Email Account:</strong> {currentUser.email}
      </p>
      <p> {error} </p>
      <button onClick={handleLoggout} className="btn-1">
        Log Out
      </button>
    </div>
  );
}
