import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Store } from "../Provider/Store";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    window.location.href = "/signin";
  };

  return (
    <Navbar bg={"light"} variant={"light"} expand="lg">
      <Nav>
        {userInfo ? (
          <NavDropdown title={"welcome " + userInfo.email}>
            <Link
              className="dropdown-item"
              to={"#signout"}
              onClick={signoutHandler}
            >
              Sign Out
            </Link>
          </NavDropdown>
        ) : (
          <Link className="nav-link" to={"/signin"}>
            signIn
          </Link>
        )}
      </Nav>
    </Navbar>
  );
};
export default NavbarComp;
