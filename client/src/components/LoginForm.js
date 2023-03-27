import '../styles/Button.css';
import '../styles/Modal.css';
import { useState, useContext } from "react";
import ServerContext from '../contexts/ServerContext';
import axios from "axios";
import BtnClose from './BtnClose';

const LoginForm = () => {
  const SERVER = useContext(ServerContext);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER}/users/login`, loginData, {
      headers: {
        ContentType: "multipart/form-data"
      }
    })
    .then(res => console.log(res)) // TODO: successful login
    .catch(err => console.log(err));
  }
  
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: [e.target.value]
    });
  }
  
  const modalClose = (e) => {
    const modalContainer = document.querySelector('#login');
    const btnClose = document.querySelector('#login .btn-close');
    
    if (e.target === modalContainer || e.target === btnClose) modalContainer.style.display = 'none';
  }
  
  return (
    <div id="login" className="modal-container" onClick={modalClose}>
      <form action="" method="POST" className="modal form" onSubmit={handleSubmit}>
        <BtnClose onClick={modalClose} />
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" pattern="[A-Za-z0-9]{3,}" title="Username must  be at least 3 characters." onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" pattern="[A-Za-z0-9]{8,}" title="Password must  be at least 8 characters." onChange={handleChange} required />
        </div>
        
        <button type="submit" className="button button-wide">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;