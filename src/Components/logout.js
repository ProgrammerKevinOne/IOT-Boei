import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button class="log" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Uitloggen
    </button>
  );
};

export default LogoutButton;