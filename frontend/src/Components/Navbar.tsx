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
    <Navbar bg={"dark"} variant={"dark"} expand="lg">
      <Nav>
        {userInfo ? (
          <NavDropdown title={"welcome " + userInfo.email} className="mx-3">
            <button
              className="dropdown-item btn btn-outline-dark"
              onClick={signoutHandler}
            >
              Sign Out
            </button>
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
