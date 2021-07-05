import './App.css';
import { Authenticatied } from 'authenticatied'
import { Unauthenticatied } from 'unauthenticatied'
import { useAuth } from 'context/auth-context'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {
        user ? <Authenticatied /> : <Unauthenticatied />
      }
    </div>
  );
}

export default App;
