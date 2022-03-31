import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Course from "./pages/Course/Course";
import Learning from "./pages/Learning";
import Test from "./Test";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:path" element={<Course />} />
        <Route path="/learn/:course_id/*" element={<Learning />} />
        <Route path="/test" element={<Test/>} />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path = "/signup" element = {user ? <Navigate to="/"/> : <Signup/>} />
      </Routes>
    </Router>
  );
}

export default App;
