import '../styles/Form.css';
import '../styles/Modal.css';
import '../styles/Button.css';
import { useState, useContext } from "react";
import ServerContext from '../contexts/ServerContext';
import axios from "axios";
import BtnClose from './BtnClose';

const SignUpForm = () => {
  const SERVER = useContext(ServerContext);
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
  
  const modalClose = (e) => {
    const modalContainer = document.querySelector('#signup');
    const btnClose = document.querySelector('#signup .btn-close');
    
    if (e.target === modalContainer || e.target === btnClose) modalContainer.style.display = 'none';
  }
  
  return (
    <div id="signup" className="modal-container" onClick={modalClose}>
      <form action="" method="POST" onSubmit={handleSubmit} className="modal form">
        <BtnClose onClick={modalClose} />
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" pattern="[A-Za-z0-9]{3,}" title="Username must  be at least 3 characters." onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" pattern="[A-Za-z0-9]{8,}" title="Password must  be at least 8 characters." onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password-confirm">Confirm password</label>
          <input type="password" name="password-confirm" placeholder="Password" onInput={handleInput} required />
        </div>
        
        <button type="submit" className="button button-wide">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;