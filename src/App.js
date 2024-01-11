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
import LogoutPage from './pages/LogoutPage';
import StudentPage from './pages/StudentPage';
import AssessPage from './pages/AssessPage';
import ReportPage from './pages/ReportPage';
import ExportPage from './pages/ExportPage';
import UserPage from './pages/UserPage';
import AnalysisPage from './pages/AnalysisPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pos" element={<POSPage />} />
        <Route path="/land" element={<LandingPage />} />
        <Route path="" element={<StudentPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/assessment" element={<AssessPage />} />
        <Route path="/report/:stdID" element={<ReportPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/usersetup" element={<UserPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
