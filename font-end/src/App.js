import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Course from "./pages/Course";
import Learning from "./pages/Learning";
import Test from "./Test";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:path" element={<Course />} />
        <Route path="/learn/:course_id/*" element={<Learning />} />
        <Route path="/test" element={<Test/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
