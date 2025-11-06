import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // If user needs to be authenticated but is not logged in → go to login
    if (authentication && !authStatus) {
      navigate("/login");
    }
    // If user should NOT be authenticated (like login/signup pages) but is logged in → go home
    else if (!authentication && authStatus) {
      navigate("/");
    }

    setLoading(false);
  }, [authStatus, authentication, navigate]);

  return loading ? <h2>Loading...</h2> : <>{children}</>;
}
