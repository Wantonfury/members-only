import './styles/App.css';
import ServerContext from "./contexts/ServerContext";
import Header from './components/Header';
import Footer from "./components/Footer";
import PostList from './components/PostList';
import { ModalProvider } from './contexts/ModalContext';
import UserContext from './contexts/UserContext';
import { useState, useEffect } from "react";
import axios from "axios";

const defaultUser = {
  username: '',
  loggedIn: false,
  member: false,
  admin: false
}

const SERVER = process.env.REACT_APP_SERVER || "http://localhost:3001";

function App() {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get(`${SERVER}/users/relog`, { withCredentials: true })
      .then(res => res.data)
      .then(res => setUser({
        username: res.username,
        loggedIn: res.loggedIn,
        member: res.member,
        admin: res.admin
      }))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <ServerContext.Provider value={SERVER}>
      <UserContext.Provider value={{ user, setUser }}>
        <ModalProvider>
          <div className="App">
            <Header loading={loading} />
            <PostList />
            <Footer />
          </div>
        </ModalProvider>
      </UserContext.Provider>
    </ServerContext.Provider>
  );
}

export default App;
