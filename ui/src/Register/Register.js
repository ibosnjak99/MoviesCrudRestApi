import { useState } from 'react';
import { variables } from '../Variables';
import classes from "./Register.module.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Register() {

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
      fetch(variables.API_URL + 'users/register', {
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
        console.log(result);
        cookies.set("id", result.id, { path: '/' });
        cookies.set("username", result.username, { path: '/' });
        cookies.set("role", result.role, { path: '/' });

        if (result.role !== undefined) {
          navigate("/movies");
        }
        else {
          window.location.reload();
        }
      },(error)=>{
          console.log(error);
      })

    console.log(username);
    e.preventDefault();
  if (username === '' || password === '') {
      console.log('err');
    } else {
      console.log('success');
  }
};

return (
  <div className={classes.registerContainer}>
  <div>
    <h3>User Registration</h3>
  </div>
  <br/>
  <br/>
  
	<form>
		<label className="label">Name</label>
		<input onChange={handleName} className="input"
		value={username} type="text" />

		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />

		<button onClick={handleSubmit} className={classes.submitBtn} type="submit">
		  Submit
		</button>

    <p>Already have an account? <a href="/">Login</a></p>

	</form>
	</div>
);
}
