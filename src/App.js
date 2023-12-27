import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import POSPage from './pages/POSPage';
import LandingPage from './pages/LandingPage';
import TestPage from './TestPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pos" element={<POSPage />} />
        <Route path="/land" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
