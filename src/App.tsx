import './App.css';
import { Authenticatied } from 'authenticatied'
import { Unauthenticatied } from 'unauthenticatied'
import { useAuth } from 'context/auth-context'
import { ErrorBoundary } from 'components/errorBoundary';
import { FullPageError } from 'components/lib';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbacakRender={FullPageError}>
        {user ? <Authenticatied /> : <Unauthenticatied />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
