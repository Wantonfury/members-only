import '../styles/SignUpForm.css';
import { useState, useContext } from "react";
import ServerContext from '../contexts/ServerContext';
import axios from "axios";

const SignUpForm = () => {
  const SERVER = useContext(ServerContext);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`${SERVER}/users/create`, loginData, {
      headers: {
        ContentType: "multipart/form-data"
      }
    })
    .catch(err => console.log(err));
  }
  
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: [e.target.value]
    });
  }
  
  return (
    <form action="" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="username">Username: </label>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      
      <label htmlFor="password">Password: </label>
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;