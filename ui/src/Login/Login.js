import { useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = (props) => {

  const [usernameValue, setUsernameValue] = useState();
  const [passwordValue, setPasswordValue] = useState();

  const loginHandler = (e) => {
    e.preventDefault();

    console.log(usernameValue);
    console.log(passwordValue);

    setUsernameValue("");
    setPasswordValue("");
  };

  const navigate = useNavigate();

  let cookies = new Cookies();

  const handleSubmit = () => {
    cookies.set("username", usernameValue, { path: '/' });
    cookies.set("password", passwordValue, { path: '/' });
    console.log(cookies);

    navigate("/movies");
  };

  return (
    <div className={classes.loginContainer}>
      <h3>LOGIN</h3>
      <form onSubmit={loginHandler}>
        <div className={classes.username}>
          <input
            value={usernameValue}
            type="text"
            placeholder="Username"
            onChange={(e) => setUsernameValue(e.target.value)}
          />
        </div>
        <div className={classes.password}>
          <input
            value={passwordValue}
            type="password"
            placeholder="Password"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </div>
        <br/>
        <div className={classes.toRegisterLink}>
          <p>Don't have an account ?</p>
          <Link to="/register">Register</Link>
        </div>
        <button onClick={() => handleSubmit()} type="submit" className={classes.submitBtn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
