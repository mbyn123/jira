import React from 'react';
import './App.css';
// import { PanelList } from 'screens/panelList'
import {LoginScreen} from 'screens/login'
function App() {
  return (
    <div className="App">
      {/* <PanelList></PanelList> */}
      <LoginScreen></LoginScreen>
    </div>
  );
}

export default App;
