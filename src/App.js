import logo from './logo.svg';
import './App.css';

import { Routes ,Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './Pages/Home';
import LongestIncSubseq from './Pages/LongestIncSubseq';

import './CSS/Global.css';

function App() {
  return (
    <div>
      <div className = "row header">
        <p>VISUALISER</p>
        <p id="tagline">Bringing complex algorithms to life</p>
      </div>
      <div className = "page-container">
        <Router>
          <Routes>
            <Route path="/" element={<LongestIncSubseq/>} />
            <Route path="/longest-inc" element={<LongestIncSubseq/>} />
          </Routes>
      </Router>
      </div>
    </div>
    
  );
}

export default App;
