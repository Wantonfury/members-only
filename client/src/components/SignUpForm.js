import '../styles/Form.css';
import '../styles/Modal.css';
import '../styles/Button.css';
import { useState, useContext } from "react";
import ServerContext from '../contexts/ServerContext';
import axios from "axios";

const SignUpForm = () => {
  const SERVER = useContext(ServerContext);
  const [signupError, setSignupError] = useState();
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER}/users/signup`, userData, {
      headers: {
        ContentType: "multipart/form-data"
      }
    })
    .catch(err => setSignupError(err.response?.data))
    .then(res => res ? document.querySelector('#modal-root .btn-close').click() : null)
    .catch(err => console.log(err));
  }
  
  const handleInput = (e) => {
    const input = e.target;
    if (input.value !== userData.password) input.setCustomValidity("Passwords do not match.");
    else  input.setCustomValidity("");
  }
  
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <form action="" method="POST" onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="Username" pattern="[A-Za-z0-9]{3,}" title="Username must be at least 3 characters." onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" pattern="[A-Za-z0-9]{8,}" title="Password must be at least 8 characters." onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="password-confirm">Confirm password</label>
        <input type="password" name="password-confirm" placeholder="Password" onInput={handleInput} required />
      </div>
      
      <button type="submit" className="button button-wide">Sign Up</button>
      
      {signupError ? <p className="form-text-error">{signupError.msg}</p> : <></>}
    </form>
  );
}

export default SignUpForm;