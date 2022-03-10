import logo from './logo.svg';
import './App.css';

import { Routes ,Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './Pages/Home';
import LongestIncSubseq from './Pages/LongestIncSubseq';

import './CSS/Global.css';

function App() {
  return (
    <div className = "page-container">
      <h1>Visualiser</h1>
      <p>Bringing complex algorithms to life</p>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/longest-inc" element={<LongestIncSubseq/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
