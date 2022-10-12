import { useState } from "react";
import { variables } from "../Variables";
import classes from "./Login.module.css";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  let cookies = new Cookies();

  // Handling the form submission
  const handleSubmit = (e) => {
    console.log("Klik");
    fetch(variables.API_URL + "users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          cookies.set("id", result.id, { path: "/" });
          cookies.set("username", result.username, { path: "/" });
          cookies.set("role", result.role, { path: "/" });

          if (result.role !== undefined) {
            navigate("/movies");
          } else {
            navigate("/");
          }
        },
        (error) => {
          console.log(error);
        }
      );

    e.preventDefault();
    if (username === "" || password === "") {
      console.log("err");
    } else {
      console.log("success");
    }
  };

  return (
    <div className={classes.loginContainer}>
      <h3>LOGIN</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.username}>
          <input
            value={username}
            type="text"
            placeholder="Username"
            onChange={handleName}
          />
        </div>
        <div className={classes.password}>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
        </div>
        <div className={classes.moreOptions}>
          <div className={classes.checkBox}>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <a href="#">Forgot?</a>
        </div>
        <div className={classes.toRegisterLink}>
          <Link to="/register">Don't have an account ?</Link>
        </div>
        <button type="submit" className={classes.submitBtn}>
          Login
        </button>
      </form>
    </div>
  );
}
