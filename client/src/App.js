import './styles/App.css';
import ServerContext from "./contexts/ServerContext";
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <ServerContext.Provider value={process.env.REACT_APP_SERVER || "http://localhost:3000"}>
      <div className="App">
        <SignUpForm />
      </div>
    </ServerContext.Provider>
  );
}

export default App;
