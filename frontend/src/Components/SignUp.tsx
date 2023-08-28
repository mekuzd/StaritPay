import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import { Store } from "../Provider/Store";
import httpClient from "../Config/httpClient";
import { ApiError } from "../Types/ApiError";
import { getError } from "../utils";

const SignUp = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/todos";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { loading, userInfo } = state;

  const SignUpUserInfo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      dispatch({ type: "LOADING" });
      const result = await httpClient.post("/api/user/", {
        name,
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: result.data });
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      navigate(redirect);
      dispatch({ type: "STOP_LOADING" });
    } catch (error) {
      dispatch({ type: "STOP_LOADING" });
      toast.error(getError(error as ApiError));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <Container className="small-container">
        <h1 className="my-4">Sign Up</h1>
        <Form onSubmit={SignUpUserInfo}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              required
              className="form"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="form"
            />
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form"
              />
            </Form.Group>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" className="w-100">
              {loading ? <div className="spinner-border "></div> : "Sign Up"}
            </Button>
          </div>
          <div className="mb-3">
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default SignUp;
