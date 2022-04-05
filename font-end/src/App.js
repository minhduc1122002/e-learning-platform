import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Course from "./pages/Course/Course";
import Learning from "./pages/Learn/Learning";
import Test from "./Test";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import Profile from "./pages/Profile/Profile"
import { useSelector, useDispatch } from "react-redux";

function App() {
    const user = useSelector((state) => state.auth.user);
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:path" element={<Course />} />
          <Route path="/learn/:course_id/*" element={user ? <Learning/> : <Navigate to="/login"/>} />
          <Route path="/test" element={<Test/>} />
          <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
          <Route path = "/signup" element = {user ? <Navigate to="/"/> : <Signup/>} />
          <Route path = "/profile" element = {<Profile />} />
        </Routes>
      </Router>
    );
}

export default App;