import '../styles/Button.css';
import '../styles/Modal.css';
import { useState, useContext } from "react";
import ServerContext from '../contexts/ServerContext';
import UserContext from '../contexts/UserContext';
import axios from "axios";
import '../styles/Form.css';

const LoginForm = () => {
  const SERVER = useContext(ServerContext);
  const { setUser } = useContext(UserContext);
  const [loginError, setLoginError] = useState();
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER}/users/login`, loginData, {
      headers: {
        ContentType: "multipart/form-data"
      },
      withCredentials: true
    })
    .catch(err => setLoginError(err.response?.data))
    .then(res => res.data)
    .then(res => {
      setUser({
        username: res.username,
        loggedIn: true,
        member: res.member,
        admin: res.admin
      });
      
      document.querySelector('#modal-root .btn-close').click();
    })
    .catch(err => console.log(err));
  }
  
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }
  
  return (
    <form action="" method="POST" className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" placeholder="Username" pattern="[A-Za-z0-9]{3,}" title="Username must  be at least 3 characters." onChange={handleChange} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" pattern="[A-Za-z0-9]{8,}" title="Password must  be at least 8 characters." onChange={handleChange} required />
      </div>
      
      <button type="submit" className="button button-wide">Log In</button>
      
      {loginError ? <p className="form-text-error">{loginError.msg}</p> : <></>}
    </form>
  );
}

export default LoginForm;