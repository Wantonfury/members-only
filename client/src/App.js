import './styles/App.css';
import ServerContext from "./contexts/ServerContext";
import UserContext from './contexts/UserContext';
import { useState } from "react";
import Header from './components/Header';
import Footer from "./components/Footer";
import PostList from './components/PostList';

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    username: '',
    member: false,
    admin: false
  });
  
  return (
    <ServerContext.Provider value={process.env.REACT_APP_SERVER || "http://localhost:3000"}>
      <UserContext.Provider value={{user, setUser}}>
        
        <div className="App">
          <Header />
          <PostList />
          <Footer />
        </div>
        
      </UserContext.Provider>
    </ServerContext.Provider>
  );
}

export default App;
