import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import StudentPage from './pages/StudentPage';
import AssessPage from './pages/AssessPage';
import ReportPage from './pages/ReportPage';
import ExportPage from './pages/ExportPage';
import UserPage from './pages/UserPage';
import AnalysisPage from './pages/AnalysisPage';
import SearchPage from './pages/SearchPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="" element={<StudentPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/assessment" element={<AssessPage />} />
        <Route path="/report/:stdID" element={<ReportPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/usersetup" element={<UserPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
