import { useState } from 'react';
import { variables } from '../Variables';
import classes from "./Login.module.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {

const [username, setName] = useState('');
const [password, setPassword] = useState('');

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
      fetch(variables.API_URL + 'users/login', {
          method:'POST',
          headers: {
              'Accept':'application/json',
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              username: username,
              password: password,
          })
      })
      .then(res=>res.json())
      .then((result)=>{
        cookies.set("id", result.id, { path: '/' });
        cookies.set("username", result.username, { path: '/' });
        cookies.set("role", result.role, { path: '/' });

        if (result.role !== undefined) {
          navigate("/movies");
        }
        else {
          navigate("/");
        }

      },(error)=>{
          console.log(error);
      })

    e.preventDefault();
  if (username === '' || password === '') {
      console.log('err');
    } else {
      console.log('success');
  }
};

return (
  <div className="form">
  <div>
    <h1>User Login</h1>
  </div>

	<form>
    <div className={classes.username}>
      <label className="label">Name</label>
      <input onChange={handleName} className="input"
      value={username} type="text" />
    </div>

    <div className={classes.password}>
      <label className="label">Password</label>
      <input onChange={handlePassword} className="input"
      value={password} type="password" />
    </div>

    <div className={classes.toRegisterLink}>
      <a href="/register">Don't have an account ? Register</a>
    </div>

		<button onClick={handleSubmit} className="btn" type="submit">
		  Submit
		</button>
	</form>
	</div>
);
}
